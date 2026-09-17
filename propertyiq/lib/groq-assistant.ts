import { Property, Source } from "@/data/properties";
import { ChatResponse } from "@/lib/search-engine";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

/**
 * Builds a structured, complete property dossier to inject as the ground truth context for the LLM.
 */
export function buildPropertyDossier(property: Property): string {
  const encumbrancesList = property.legal.encumbrances.length > 0
    ? property.legal.encumbrances.map((e, idx) => 
        `  ${idx + 1}. ${e.type} held by ${e.holder} (Registered: ${e.registeredDate})`
      ).join("\n")
    : "  None recorded on title; clean from third-party institutional liens.";

  const mismatchesList = property.mismatches.length > 0
    ? property.mismatches.map((m, idx) =>
        `  ${idx + 1}. FIELD: "${m.field}" (Severity: ${m.severity.toUpperCase()})\n     - Listing Record: "${m.source2.value}" (Source: ${m.source2.label})\n     - Legal Deed Record: "${m.source1.value}" (Source: ${m.source1.label})\n     - Note: ${m.description}`
      ).join("\n")
    : "  No documented discrepancies detected between listing and title deeds.";

  const upcomingDevelopments = property.locality.upcomingDevelopments.length > 0
    ? property.locality.upcomingDevelopments.map(d => `  - ${d}`).join("\n")
    : "  No major municipal developments documented in immediate parcel perimeter.";

  const environmentalNotes = property.locality.environmentalNotes.length > 0
    ? property.locality.environmentalNotes.map(n => `  - ${n}`).join("\n")
    : "  No adverse environmental conditions recorded in municipal environmental audit.";

  return `================================================================================
PROPERTY INTELLIGENCE DOSSIER (CONFIDENTIAL & GROUND TRUTH)
================================================================================
IDENTIFICATION:
- Property ID: ${property.id}
- Property Name: ${property.name}
- Official Municipal Address: ${property.address}
- Asking Valuation / Price: ${property.price} (Numeric: $${property.priceNumeric?.toLocaleString() || 'N/A'})
- Asset Classification: ${property.type} (${property.listing.assetType})

LISTING SPECIFICATIONS:
- Total Gross Leasable Area (GLA): ${property.listing.totalGLA}
- Municipal Zoning Code: ${property.listing.zoning}
- Year Constructed: ${property.listing.yearBuilt}
- Flood Hazard Zone: ${property.listing.floodZone}
- Listing Marketing Summary: ${property.listing.description.slice(0, 500)}...

LEGAL TITLE DEED & CONVEYANCE:
- Registered Legal Owner: ${property.legal.ownership}
- Legal Instrument Title Type: ${property.legal.titleType}
- Cadastral Plan Number: ${property.legal.planNumber}
- Certified Lot / Parcel Description: ${property.legal.lotDescription}
- Officially Certified Site Area: ${property.legal.siteArea}
- Title Verified Status: ${property.legal.titleVerified ? 'Yes (Verified against Land Registry)' : 'Pending'}
- Registered Encumbrances & Memorials:
${encumbrancesList}

LOCALITY, NEIGHBORHOOD & ENVIRONMENTAL REPORT:
- Neighborhood: ${property.locality.neighborhood}
- School District: ${property.locality.schoolDistrict}
- Crime Rate Assessment: ${property.locality.crimeRate}
- Flood Zone Ingress / Details: ${property.locality.floodZoneDetail}
- Walkability Score: ${property.locality.walkScore}/100
- Public Transit Score: ${property.locality.transitScore}/100
- Upcoming Municipal Developments:
${upcomingDevelopments}
- Environmental Audits & Soil Condition:
${environmentalNotes}

DOCUMENT DISCREPANCIES & CROSS-VERIFICATION RISKS:
${mismatchesList}
================================================================================`;
}

const STRICT_SYSTEM_PROMPT = `You are PropertyIQ Assistant, an elite AI legal and real estate document analysis engine.

YOUR CORE MANDATE:
Provide strictly grounded, factual, accurate, and trustworthy answers about the specific property being analyzed.

CRITICAL INSTRUCTIONS & ANTI-HALLUCINATION PROTOCOL:
1. STRICT DOCUMENT GROUNDING: Answer ONLY and STRICTLY based on the provided Property Dossier below. Every fact, figure, name, and date you mention MUST come directly from this dossier.
2. STRICT ZERO-HALLUCINATION RULE: If a fact, metric, person, or detail is NOT explicitly mentioned or cannot be concluded with absolute certainty from the provided dossier, you MUST state clearly:
   "Based on the available property records and legal documentation, there is no documented information regarding [topic]. Please consult the listing broker, title insurer, or municipal registrar for verification."
   NEVER speculate, assume, estimate, or invent facts, numbers, dates, zoning codes, square footages, tenant names, legal liabilities, or flood hazards.
3. CONCISE & PROFESSIONAL: Answer directly and professionally in 2 to 4 sentences or a concise bulleted breakdown. Highlight key names, figures, zoning codes, and dollar amounts in **bold** (e.g., **$45M**, **Zone X**, **500 sqm**).
4. HIGHLIGHT KNOWN DISCREPANCIES: If the user asks about a topic with a known discrepancy between documents (e.g. Site Area or Zoning), explicitly present BOTH the listing advertised claim and the legally registered deed figure to safeguard the buyer.
5. DOCUMENT CITATIONS: Attribute facts to one or more of these source types: "legal", "listing", "locality", or "insurance".
6. RELEVANT FOLLOW-UPS: Provide 2 or 3 relevant suggested follow-up queries grounded in the actual property details.

OUTPUT FORMAT:
You MUST respond with a valid JSON object only (no markdown code blocks, no other text):
{
  "answer": "Your formatted markdown answer string",
  "sources": [
    { "label": "Document Source Name", "type": "legal" | "listing" | "locality" | "insurance" }
  ],
  "suggestedQueries": ["Query 1", "Query 2", "Query 3"]
}
`;

export async function askGroqAssistant(
  property: Property,
  userQuery: string
): Promise<ChatResponse | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("askGroqAssistant: No GROQ_API_KEY configured.");
    return null;
  }

  const dossier = buildPropertyDossier(property);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9 second timeout

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: "system", content: STRICT_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Here is the verified Property Dossier for ${property.name} (${property.id}):\n\n${dossier}\n\nUSER QUESTION:\n${userQuery}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.05, // Low temperature for deterministic, factual precision
        max_tokens: 450,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Groq API responded with status ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) return null;

    const parsed = JSON.parse(rawContent);

    // Validate and sanitize sources
    const validTypes = new Set(["legal", "listing", "locality", "insurance"]);
    const sanitizedSources: Source[] = Array.isArray(parsed.sources)
      ? parsed.sources.map((s: any) => ({
          label: String(s.label || "Property Records"),
          type: validTypes.has(s.type) ? s.type : "listing",
        }))
      : [{ label: "Property Intelligence Records", type: "listing" }];

    const suggestedQueries: string[] = Array.isArray(parsed.suggestedQueries) && parsed.suggestedQueries.length > 0
      ? parsed.suggestedQueries.map((q: any) => String(q))
      : [
          "What are the recorded legal encumbrances?",
          "Check for zoning or site area mismatches",
          "What is the flood risk assessment?"
        ];

    return {
      answer: parsed.answer || "Information could not be extracted from the property records.",
      sources: sanitizedSources,
      suggestedQueries: suggestedQueries.slice(0, 3),
      confidence: 0.95,
    };
  } catch (error) {
    console.error("Error invoking Groq Assistant:", error);
    return null;
  }
}
