import { searchProperty } from "@/lib/search-engine";
import { getPropertyById } from "@/data/properties";
import { askGroqAssistant } from "@/lib/groq-assistant";

export async function POST(request: Request) {
  try {
    const { propertyId, message } = await request.json();

    if (!propertyId) {
      return Response.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const trimmedQuery = (message || "").trim();

    // If query is empty, return welcome message immediately
    if (!trimmedQuery) {
      const defaultResponse = searchProperty(propertyId, "");
      return Response.json(defaultResponse);
    }

    // TIER 1: Check instant local keyword & pre-verified QA bank
    const localResult = searchProperty(propertyId, trimmedQuery);

    // If we have a high-confidence match (>= 0.75), serve it immediately
    if (localResult.confidence >= 0.75) {
      return Response.json(localResult);
    }

    // TIER 2: Call Groq LPU API with full property dossier for complex/unmatched queries
    const property = getPropertyById(propertyId);
    if (property) {
      try {
        const groqResult = await askGroqAssistant(property, trimmedQuery);
        if (groqResult) {
          return Response.json(groqResult);
        }
      } catch (err) {
        console.error("Groq fallback error:", err);
      }
    }

    // TIER 3: Clean local fallback if Groq is unavailable or query is unresolvable
    return Response.json(localResult);
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
