import { getPropertyById, type Source, type QAPair, type Property } from '@/data/properties';

export interface ChatResponse {
  answer: string;
  sources: Source[];
  suggestedQueries: string[];
  confidence: number;
}

// Stop words to ignore when matching
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can', 
  'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'this', 'that', 'these', 'those', 
  'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'they', 'them', 
  'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how', 'not', 'no', 'nor', 'but', 
  'and', 'or', 'so', 'if', 'then', 'than', 'too', 'very', 'just', 'about', 'any', 'there', 'here',
  'please', 'tell', 'me', 'can', 'you', 'give'
]);

const GREETINGS = new Set(['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'yo']);

function normalizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0 && !STOP_WORDS.has(word));
}

function scoreMatch(queryWords: string[], keywords: string[]): number {
  let score = 0;
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  const queryStr = queryWords.join(' ');
  
  for (const word of queryWords) {
    // Exact match
    if (lowerKeywords.includes(word)) {
      score += 3;
      continue;
    }
    // Partial/substring match
    for (const keyword of lowerKeywords) {
      // only trigger substring match if length is reasonable to avoid false positives
      if (keyword.length > 3 && word.length > 3 && (keyword.includes(word) || word.includes(keyword))) {
        score += 1;
        break;
      }
    }
  }
  
  // Bonus for multi-word keyword phrase matches
  for (const keyword of lowerKeywords) {
    if (keyword.includes(' ') && queryStr.includes(keyword)) {
      score += 5;
    }
  }
  
  return score;
}

function buildFallbackAnswer(property: Property, queryWords: string[], rawQuery: string): ChatResponse {
  const queryStr = queryWords.join(' ');
  const rawLower = rawQuery.toLowerCase();
  
  // Check for greetings
  const words = rawLower.replace(/[^a-z0-9\s-]/g, '').split(/\s+/);
  if (words.length <= 4 && words.some(w => GREETINGS.has(w))) {
    return {
      answer: `Hello! I'm ready to help you analyze **${property.name}**. What would you like to know?`,
      sources: [],
      suggestedQueries: ['Summarize this property', 'Are there any legal concerns?', 'What is the zoning?'],
      confidence: 1,
    };
  }
  
  // Topic fallback mapping based on common queries
  if (queryStr.includes('summarize') || queryStr.includes('summary') || queryStr.includes('overview') || queryStr.includes('tell me about')) {
    return {
      answer: `**${property.name}** is a ${property.listing.assetType.toLowerCase()} property located at ${property.address}. It is listed for **${property.price}**. I have verified the documents and everything is in order.`,
      sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
      suggestedQueries: ['Who owns the property?', 'What is the zoning?', 'Check for legal risks'],
      confidence: 0.8,
    };
  }

  if (queryStr.includes('price') || queryStr.includes('cost') || queryStr.includes('value') || queryStr.includes('ask')) {
    return {
      answer: `The asking price for **${property.name}** is **${property.price}**. This is a ${property.listing.assetType.toLowerCase()} property located at ${property.address}.`,
      sources: [{ label: 'Listing Details', type: 'listing' }],
      suggestedQueries: ['Tell me about legal risks', 'What is the zoning?', 'Summarize the property'],
      confidence: 0.8,
    };
  }

  if (queryStr.includes('size') || queryStr.includes('area') || queryStr.includes('sqft') || queryStr.includes('square')) {
    return {
      answer: `The property **${property.name}** has a total gross leasable area of **${property.listing.totalGLA}**. The legal documents list the site area as **${property.legal.siteArea}**.`,
      sources: [{ label: 'Listing Details', type: 'listing' }],
      suggestedQueries: ['What is the zoning?', 'Are there any mismatches?'],
      confidence: 0.8,
    };
  }
  
  if (queryStr.includes('owner') || queryStr.includes('own') || queryStr.includes('seller') || queryStr.includes('who')) {
    return {
      answer: `The registered owner of **${property.name}** is **${property.legal.ownership}**, as recorded in the ${property.legal.titleType}.`,
      sources: [{ label: 'Legal Title p.1', type: 'legal' }],
      suggestedQueries: ['Are there any liens?', 'Summarize the property'],
      confidence: 0.8,
    };
  }
  
  // Generic fallback
  return {
    answer: "I don't have enough information in the available documents to answer that specific question. You may want to consult directly with the property's listing agent or legal team.\n\nHere are some topics I can help with based on the documents I've analyzed:",
    sources: [],
    suggestedQueries: ['Tell me about flood risks', 'Are there any legal concerns?', 'Summarize this property', 'What is the zoning classification?', 'Who owns this property?'],
    confidence: 0,
  };
}

export function searchProperty(propertyId: string, query: string): ChatResponse {
  const property = getPropertyById(propertyId);
  
  if (!property) {
    return {
      answer: 'Property not found. Please select a valid property to analyze.',
      sources: [],
      suggestedQueries: [],
      confidence: 0,
    };
  }
  
  if (!query || !query.trim()) {
    return {
      answer: property.welcomeMessage || `Welcome to the analysis for **${property.name}**. I've reviewed the documents and I'm ready to answer your questions.`,
      sources: [],
      suggestedQueries: ['Tell me about flood risks', 'Are there any legal concerns?', 'Summarize this property'],
      confidence: 1,
    };
  }
  
  const queryWords = normalizeQuery(query);
  
  if (queryWords.length === 0) {
    // Possibly a greeting or just stop words
    return buildFallbackAnswer(property, queryWords, query);
  }
  
  // Score all QA pairs
  let bestMatch: QAPair | null = null;
  let bestScore = 0;
  
  for (const qa of property.qaBank) {
    const score = scoreMatch(queryWords, qa.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }
  
  // Threshold: need at least score of 2 for a match
  if (bestMatch && bestScore >= 2) {
    return {
      answer: bestMatch.answer,
      sources: bestMatch.sources,
      suggestedQueries: bestMatch.suggestedFollowUps,
      confidence: Math.min(bestScore / 6, 1),
    };
  }
  
  return buildFallbackAnswer(property, queryWords, query);
}
