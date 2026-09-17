export interface PropertyImage {
  url: string;
  alt: string;
}

export interface ListingData {
  assetType: string;
  totalGLA: string;
  zoning: string;
  yearBuilt: number;
  floodZone: string;
  description: string;
  images: PropertyImage[];
}

export interface Encumbrance {
  type: string;
  holder: string;
  registeredDate: string;
}

export interface LegalData {
  ownership: string;
  titleType: string;
  lotDescription: string;
  siteArea: string;
  planNumber: string;
  encumbrances: Encumbrance[];
  titleVerified: boolean;
}

export interface LocalityData {
  neighborhood: string;
  schoolDistrict: string;
  crimeRate: string;
  floodZoneDetail: string;
  upcomingDevelopments: string[];
  environmentalNotes: string[];
  walkScore: number;
  transitScore: number;
}

export interface Mismatch {
  id: string;
  field: string;
  description: string;
  source1: { label: string; value: string };
  source2: { label: string; value: string };
  severity: 'high' | 'medium' | 'low';
}

export interface VerificationItem {
  label: string;
  status: 'verified' | 'mismatch' | 'unconfirmed';
  sourceTag: string;
  detail?: string;
}

export interface VerifiedStatus {
  confidenceScore: number;
  items: VerificationItem[];
}

export interface Source {
  label: string;
  type: 'legal' | 'locality' | 'listing' | 'insurance';
  page?: string;
}

export interface QAPair {
  keywords: string[];
  question: string;
  answer: string;
  sources: Source[];
  suggestedFollowUps: string[];
}

export interface DashboardBadge {
  label: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

export interface Property {
  id: string;
  name: string;
  address: string;
  price: string;
  priceNumeric: number;
  type: string;
  listing: ListingData;
  legal: LegalData;
  locality: LocalityData;
  mismatches: Mismatch[];
  verifiedStatus: VerifiedStatus;
  qaBank: QAPair[];
  dashboardBadges: DashboardBadge[];
  welcomeMessage: string;
}

const properties: Property[] = [
  {
    id: 'PR-9932',
    name: 'The Apex Tower',
    address: '100 Financial District Blvd, NY',
    price: '$45M',
    priceNumeric: 45000000,
    type: 'Commercial Office',
    listing: {
      assetType: 'Commercial Office',
      totalGLA: '45,000 sq ft',
      zoning: 'C-3',
      yearBuilt: 2018,
      floodZone: 'Zone X',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nThe Apex Tower stands as an iconic commercial office landmark commanding the skyline of the Financial District in New York. Engineered with a high-strength reinforced cast-in-place concrete core and heavy structural steel framing, the building provides superior seismic resilience, load-bearing longevity, and expansive column-free floor plates designed for flexible modern workspace planning. The exterior building envelope incorporates an advanced unitized curtain wall system engineered with multi-layered acoustic laminated glazing and high-efficiency low-emissivity thermal coatings. This high-performance façade ensures optimal daylight harvesting while dramatically reducing ambient street noise and regulating solar heat gain across all exposures. Mechanical infrastructure features dual-feed utility electrical connectivity, automatic transfer generator backups, and centralized variable-refrigerant-flow climate systems with multi-stage MERV-13 air filtration. Subterranean foundation walls are shielded by engineered waterproofing membranes, pressure-relief drainage gravel beds, and high-capacity sump pumps, ensuring long-term structural integrity against subterranean moisture and localized hydrostatic pressure.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nBeyond the dramatic double-height lobby finished in honed Italian marble, the interior spaces deliver an executive standard of refined functionality and holistic occupant wellness. The expansive floor plans feature generous 13-foot finished ceilings, floor-to-ceiling perimeter fenestration, and custom acoustic ceiling installations that preserve whisper-quiet workspaces across every department. Vertical circulation is orchestrated by high-speed destination-dispatch elevators finished in hand-stitched leather panels and architectural bronze accents, reducing inter-floor transit times to seconds. Tenant amenities include a dedicated wellness pavilion equipped with commercial-grade cardiovascular equipment, private yoga studios, cedar saunas, and spa-inspired shower facilities. An executive conference center and private sky lounge provide access to a landscaped open-air terrace with panoramic metropolitan vistas. Smart-building automation networks enable seamless digital control over zoned climate, motorized shading, and multi-factor biometric access protocols. On-site administrative operations include 24/7 concierge security, dedicated package handling, and proactive facility engineering.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nPositioned in the Financial District, The Apex Tower commands an irreplaceable location at the vibrant intersection of global commerce, transit, and luxury hospitality. The property boasts perfect transit and walkability metrics, located within immediate walking distance of major subway lines, regional rail hubs, and ferry terminals. The surrounding neighborhood is characterized by Michelin-starred culinary venues, world-class retail, cultural performing arts centers, and scenic waterfront parks. From an underwriting perspective, the asset presents compelling investment fundamentals driven by historically low vacancy rates and restrictive zoning protections that limit new commercial developments in the immediate vicinity. Supported by creditworthy anchor tenancies, clear title documentation, and sustainable operating efficiencies, The Apex Tower delivers defensive cash-flow generation and strong long-term capital appreciation for institutional investors seeking generational core assets.',
      images: [
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', alt: 'The Apex Tower Main View' },
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', alt: 'The Apex Tower Gallery 1' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', alt: 'The Apex Tower Gallery 2' }
      ]
    },
    legal: {
      ownership: 'Apex Realty Corp',
      titleType: 'Certificate of Title',
      lotDescription: 'Lot 45, Block 12, Plan 987654. A total area of 500 square meters in the city.',
      siteArea: '500 sqm',
      planNumber: '987654',
      encumbrances: [
        { type: 'Mortgage', holder: 'First National Bank', registeredDate: '12 Jan 2018' }
      ],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Financial District',
      schoolDistrict: 'Metro Central District',
      crimeRate: 'Low',
      floodZoneDetail: 'Minimal flood risk. Safe from major flooding.',
      upcomingDevelopments: [
        'New train line arriving in 2025'
      ],
      environmentalNotes: [
        'Clean soil reports from 2020'
      ],
      walkScore: 95,
      transitScore: 98
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Building Size', status: 'verified', sourceTag: 'TITLE DEED' },
        { label: 'Zoning', status: 'verified', sourceTag: 'CITY RECORDS' },
        { label: 'Ownership', status: 'verified', sourceTag: 'LEGAL TITLE' }
      ]
    },
    dashboardBadges: [
      { label: 'All Verified', type: 'success' },
      { label: 'Prime Location', type: 'info' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for The Apex Tower. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for The Apex Tower. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns the property?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns the property?',
        answer: 'The property is owned by **Apex Realty Corp**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$45M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns the property?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **C-3**, which is for commercial use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns the property?', 'Is it in a flood zone?']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone X**, which means it has a very low risk of flooding.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns the property?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are no major legal risks. There is one **mortgage with First National Bank** from 2018, which is normal for a building of this size.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns the property?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'The Apex Tower is a **$45M high-quality office building** in the Financial District. It is fully verified, has no legal issues, and is in a very safe area with great transit.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns the property?', 'What is the zoning?', 'Is it in a flood zone?']
      }
    ]
  },
  {
    id: 'PR-4521',
    name: 'Westside Logistics Hub',
    address: '450 Industrial Parkway, Newark, NJ',
    price: '$2.5M',
    priceNumeric: 2500000,
    type: 'Industrial Warehouse',
    listing: {
      assetType: 'Industrial Warehouse',
      totalGLA: '120,000 sq ft',
      zoning: 'I-2',
      yearBuilt: 1995,
      floodZone: 'Zone B',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nThe Westside Logistics Hub represents an industrial distribution facility engineered to meet high-volume modern supply chain and logistics demands in Newark, New Jersey. Constructed with heavy tilt-up reinforced concrete panels, structural steel girders, and an engineered slab designed to support substantial floor loadings, the structure delivers exceptional durability and operational longevity. The building envelope features insulated metal panels, thermal double-pane clerestory windows, and a reflective TPO cool roof that reduces cooling energy demands during warmer operational cycles. Exterior infrastructure includes twelve dock-high loading bays equipped with hydraulic levelers, heavy-duty weather seals, and drive-in ramps for oversized vehicles. Building systems include an upgraded ESFR fire suppression network, high-output industrial LED illumination, and heavy three-phase electrical utility capacity. Concrete aprons and heavy-duty truck courts are engineered for continuous commercial vehicle circulation, staging, and trailer parking.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nInternally, the facility provides 120,000 square feet of highly functional industrial space highlighted by clear interior ceiling heights of 28 feet. The clear-span column spacing maximizes volumetric storage efficiency and accommodates high-density racking configurations alongside automated pallet conveyor networks. The front elevation houses a modernized two-story administrative office suite featuring private managerial offices, collaborative dispatch spaces, a conference boardroom, and climate-controlled employee break facilities. Operational systems include programmable warehouse air circulation, multi-zone security monitoring with closed-circuit cameras, and keyless access points across all exterior entries. Ample on-site surface parking accommodates commercial tractor-trailers, delivery fleet vehicles, and employee shifts. Dedicated battery-charging bays, maintenance workshops, and secure outdoor storage yards provide complete infrastructure support for continuous daily fleet operations. The building is outfitted with modern telecommunications and data cabling infrastructure to facilitate automated inventory barcode scanning and warehouse management software integration. Staff facilities include modern locker rooms, private shower suites, and a dedicated safety training hall designed to support continuous round-the-clock shift rotations.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nStrategically situated in the Newark Industrial Corridor, the property offers immediate logistical connectivity with direct ingress to Interstate 78, the New Jersey Turnpike, and Port Newark-Elizabeth Marine Terminal. Newark Liberty International Airport is situated just minutes away, facilitating rapid regional and international air freight dispatch. The surrounding submarket serves as the primary distribution nexus for the greater New York metropolitan market, characterized by persistent industrial tenant demand and finite available industrial land parcels. While environmental reports identify ongoing remediation monitoring that prospective buyers must account for, the property provides substantial cash-flow stability and strong logistical utility. Given its strategic port-adjacent positioning, heavy utility infrastructure, and regional highway connectivity, the asset holds sustained industrial investment appeal. Recent municipal infrastructure grants have funded widening of local feeder routes, substantially improving turning radii and easing transit times for heavy commercial multi-axle freight vehicles accessing the nearby interstate system.',
      images: [
        { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', alt: 'Warehouse Main' },
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', alt: 'Warehouse Dock' },
        { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', alt: 'Warehouse Interior' }
      ]
    },
    legal: {
      ownership: 'GreenField Industries LLC',
      titleType: 'Warranty Deed',
      lotDescription: 'Block 7, Lot 22, Industrial Zone B.',
      siteArea: '2.8 acres',
      planNumber: '22-IND-7',
      encumbrances: [
        { type: 'Utility Access', holder: 'NJ Transit', registeredDate: '10 Aug 2008' }
      ],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Industrial Corridor',
      schoolDistrict: 'Newark Public Schools',
      crimeRate: 'Moderate',
      floodZoneDetail: 'Moderate risk. Some nearby areas had water issues in 2011.',
      upcomingDevelopments: [
        'Airport expansion nearby'
      ],
      environmentalNotes: [
        'Clean soil reports'
      ],
      walkScore: 42,
      transitScore: 55
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Building Size', status: 'verified', sourceTag: 'SURVEY' },
        { label: 'Ownership', status: 'verified', sourceTag: 'DEED' }
      ]
    },
    dashboardBadges: [
      { label: 'Verified', type: 'success' },
      { label: 'Logistics Hub', type: 'info' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Westside Logistics Hub. Everything is in order. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Westside Logistics Hub. Everything is in order. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **GreenField Industries LLC**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$2.5M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **I-2**, which is for industrial use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'It is in **Zone B**, which means there is a moderate risk of flooding.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are no major legal risks. There is only a **Utility Access easement for NJ Transit** from 2008.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'The Westside Logistics Hub is a **$2.5M industrial warehouse** in Newark. It is verified, has good highway access, and is in a moderate-risk flood zone.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  },
  {
    id: 'PR-7810',
    name: 'Oasis Residences',
    address: '77 Suburbia Lane, Greenwich, CT',
    price: '$8.2M',
    priceNumeric: 8200000,
    type: 'Residential Condo Complex',
    listing: {
      assetType: 'Residential Condo Complex',
      totalGLA: '85,000 sq ft',
      zoning: 'R-2',
      yearBuilt: 2020,
      floodZone: 'Zone C',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nOasis Residences represents a modern residential condominium community nestled within the tranquil suburban enclaves of Greenwich, Connecticut. Designed to current environmental building standards with LEED Silver certification, the development comprises three boutique residential pavilions constructed from reinforced concrete and structural timber framing. The exterior architecture combines natural quarried fieldstone, durable composite fiber-cement siding, and private cedar-accented balconies. Architectural double-hung low-E windows and multi-layered sound-attenuating wall assemblies insulate each residence against outside noise while optimizing energy efficiency throughout changing seasons. Each residential building is equipped with central hydronic heating, energy recovery ventilation, and underground stormwater retention systems that preserve the surrounding natural ecosystem. The property features manicured grounds, permeable paver pathways, professional landscape lighting, and native conservation plantings. The building exterior incorporates high-grade architectural standing seam copper accents and custom bronze downspouts engineered for superior durability under New England coastal winters. Sound transmission class (STC) ratings between adjoining residences exceed luxury residential construction benchmarks.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nThe development comprises 48 luxury condominium residences showcasing contemporary open-concept floor plans with nine-foot ceilings and wide-plank white oak flooring. Custom kitchens are appointed with quartz waterfall countertops, soft-close walnut cabinetry, and integrated stainless-steel appliances. Residents enjoy exclusive access to resort-caliber community amenities, including a heated outdoor swimming pool with private cabanas, an expansive sun deck, a fitness center, and a clubhouse lounge with a fireplace and catering kitchen. The property also features a landscaped interior courtyard, private dog park, and dedicated storage units for every homeowner. Secure subterranean garage parking provides reserved parking stalls with electric vehicle charging stations. Keyless fob entry, 24/7 perimeter surveillance, and professional property management ensure total privacy and effortless residential living. Individual residences are fitted with Lutron Caseta smart lighting controls, radiant-heated primary bathroom flooring, and private full-size laundry closets with ventless condensation dryers. A secured resident package room with temperature-controlled grocery lockers facilitates seamless daily deliveries.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nSituated on Suburbia Lane in Greenwich, the property occupies a prestigious residential setting renowned for scenic natural surroundings, safety, and suburban tranquility. The location offers convenient access to Greenwich Avenue shopping, coastal parks, private yacht clubs, and top-ranked Greenwich Public Schools. Commuters benefit from proximity to the Metro-North commuter rail station, providing a comfortable 45-minute transit into Midtown Manhattan. The Greenwich residential market consistently ranks among the most stable and coveted real estate markets in the country, maintaining resilient property valuations across economic cycles. With strong local homeowner demand, minimal future residential construction density permitted, and pristine community amenities, Oasis Residences represents a compelling acquisition for luxury residential investors seeking capital preservation. Historical price trend analyses within the Greenwich township consistently illustrate above-average equity preservation, making the asset particularly attractive for high-net-worth buyers seeking dependable family wealth protection.',
      images: [
        { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', alt: 'Oasis Residences Main' },
        { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', alt: 'Oasis Residences Pool' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', alt: 'Oasis Residences Courtyard' }
      ]
    },
    legal: {
      ownership: 'Oasis Development Group',
      titleType: 'Certificate of Title',
      lotDescription: 'Lot 15, Block 3, Residential Zone R-2.',
      siteArea: '4.2 acres',
      planNumber: '15-RES-3',
      encumbrances: [],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Greenwich Suburban',
      schoolDistrict: 'Greenwich Public Schools',
      crimeRate: 'Very Low',
      floodZoneDetail: 'Very low risk. No history of flooding.',
      upcomingDevelopments: [
        'New park nearby in 2025'
      ],
      environmentalNotes: [
        'Safe air and soil quality'
      ],
      walkScore: 68,
      transitScore: 72
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Title', status: 'verified', sourceTag: 'DEED' },
        { label: 'School District', status: 'verified', sourceTag: 'SCHOOL BOARD' }
      ]
    },
    dashboardBadges: [
      { label: 'Perfect Title', type: 'success' },
      { label: 'Luxury', type: 'info' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Oasis Residences. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Oasis Residences. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **Oasis Development Group**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$8.2M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **R-2**, which is for residential use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone C**, which means there is very low risk of flooding.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are **no legal risks or encumbrances** on this property. The title is perfectly clear.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'Oasis Residences is an **$8.2M luxury condo complex** in Greenwich. It is fully verified, has a perfect title, and is located in a very safe neighborhood.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  },
  {
    id: 'PR-1122',
    name: 'Azure Waterfront Villas',
    address: '200 Ocean Drive, Miami, FL',
    price: '$12M',
    priceNumeric: 12000000,
    type: 'Luxury Residential',
    listing: {
      assetType: 'Residential Villas',
      totalGLA: '25,000 sq ft',
      zoning: 'R-1',
      yearBuilt: 2022,
      floodZone: 'Zone X',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nAzure Waterfront Villas is an ultra-luxury coastal residential enclave commanding direct deepwater frontage in Miami, Florida. Built to meet stringent hurricane-resistant building codes, the estate features post-tensioned reinforced concrete foundations, pilings anchored directly into coastal bedrock, and solid concrete masonry construction. The exterior façade balances crisp stucco elevations with warm Brazilian teak accents and expansive walls of impact-resistant floor-to-ceiling glass. The glazing incorporates solar-reflective tinting and specialized acoustic interlayers to withstand tropical coastal weather while framing unobstructed panoramic ocean views. State-of-the-art exterior engineering includes reinforced seawall barriers, private deep-water yacht docking with heavy-duty shore power pedestals, and marine-grade stainless-steel hardware throughout. Modern rooftop solar arrays and integrated battery storage provide clean auxiliary energy and continuous emergency backup power. Deep foundation pilings are reinforced with cathodic corrosion protection to guard against subterranean saltwater intrusion. High-capacity commercial dehumidification systems ensure an optimal, climate-stabilized indoor environment year-round.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nThe interior architecture presents an open-concept coastal aesthetic highlighted by soaring double-height ceilings, honed limestone flooring, and dramatic architectural water features. The expansive living pavilion opens seamlessly to outdoor terraces via motorized pocketing glass doors, creating effortless indoor-outdoor flow. The chef\'s kitchen features custom imported Italian millwork, marble islands, and professional appliances, complemented by a discreet butler\'s pantry. Luxury amenities include an infinity-edge heated pool overlooking the bay, an outdoor summer kitchen with alfresco dining cabanas, a private home cinema, and a climate-controlled sommelier wine cellar. The primary bedroom wing offers a private waterfront terrace, bespoke dressing rooms, and a spa-inspired bath with a freestanding soaking tub. Smart automation orchestrates lighting, climate, security, and multi-zone audio with touchscreen convenience. The upper-level primary retreat features custom Italian walnut millwork, dual showroom walk-in closets with biometric locking vaults, and an outdoor hot tub overlooking Biscayne Bay. Smart motorized louvers provide private shaded sanctuary across all outdoor living zones.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nOccupying an irreplaceable waterfront parcel along Ocean Boulevard, Azure Waterfront Villas represents the pinnacle of South Florida coastal living. The property is minutes from the luxury shopping and dining of Bal Harbour, the vibrant cultural scene of South Beach, and international airports for global travel. Waterfront parcels with private yacht docking capacity remain exceedingly scarce throughout the region, creating powerful structural supply constraints that drive sustained long-term capital appreciation. Given the estate\'s verified title status, modern coastal engineering, and prestigious coastal address, the property represents an exceptional trophy asset offering unmatched luxury living and long-term capital appreciation for discerning international buyers seeking prime coastal real estate. Private deepwater slips capable of accommodating mega-yachts with direct unrestricted ocean access without fixed bridges represent an exceptionally rare commodity that ensures sustained long-term equity appreciation.',
      images: [
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', alt: 'Azure Main' },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', alt: 'Azure Villa' },
        { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', alt: 'Azure Beach' }
      ]
    },
    legal: {
      ownership: 'Blue Wave Holdings',
      titleType: 'Warranty Deed',
      lotDescription: 'Lot 10, Waterfront Zone, Miami.',
      siteArea: '2 acres',
      planNumber: 'WF-10-MIAMI',
      encumbrances: [],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Beachfront District',
      schoolDistrict: 'Miami Coast Schools',
      crimeRate: 'Low',
      floodZoneDetail: 'Low risk due to new sea walls.',
      upcomingDevelopments: [
        'New yacht club nearby'
      ],
      environmentalNotes: [
        'Protected shoreline'
      ],
      walkScore: 80,
      transitScore: 60
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Title', status: 'verified', sourceTag: 'DEED' },
        { label: 'Area', status: 'verified', sourceTag: 'SURVEY' }
      ]
    },
    dashboardBadges: [
      { label: 'Waterfront', type: 'info' },
      { label: 'Verified', type: 'success' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Azure Waterfront Villas. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Azure Waterfront Villas. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **Blue Wave Holdings**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$12M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **R-1**, which is for single-family residential use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone X**, which means it has a very low risk of flooding.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are **no legal risks or encumbrances** on this property. The title is perfectly clear.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'Azure Waterfront Villas is a **$12M luxury residential property** in Miami. It is fully verified, beachfront, and has no legal risks.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  },
  {
    id: 'PR-3344',
    name: 'Summit Retail Plaza',
    address: '500 Shopping Way, Austin, TX',
    price: '$18M',
    priceNumeric: 18000000,
    type: 'Retail Commercial',
    listing: {
      assetType: 'Retail Plaza',
      totalGLA: '60,000 sq ft',
      zoning: 'C-1',
      yearBuilt: 2015,
      floodZone: 'Zone X',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nSummit Retail Plaza is a contemporary open-air lifestyle commercial center located along the high-growth corridor of Austin, Texas. Constructed with durable tilt-wall concrete and structural steel frame systems, the plaza combines modern architectural lines with native Texas limestone accents and cedar canopies. The façade features expansive retail display storefronts fitted with energy-efficient insulated glass and programmable architectural LED accent lighting that enhances tenant visibility during evening hours. The roof structure utilizes reflective thermal membranes paired with high-efficiency rooftop package units, lowering overall tenant utility expenses. Site engineering includes expansive asphalt parking lots with over four hundred designated customer spaces, dedicated service delivery lanes behind each retail wing, and drought-tolerant xeriscape landscaping with automated drip irrigation. Extensive site civil engineering incorporates underground stormwater detention vaults and advanced oil-water separators complying with strict Texas Commission on Environmental Quality regulations. Commercial trash compactors and recycling facilities are fully enclosed behind matching architectural masonry walls.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nThe center is configured across multiple retail wings offering adaptable tenant spaces ranging from boutique specialty shops to large national anchor premises. Interior layouts feature clear ceiling heights of 18 feet, reinforced polished concrete slab flooring, and rear loading access doors for inventory intake. The center boasts an open-air central pedestrian promenade with shaded dining patios, decorative fountains, outdoor fire pits, and public Wi-Fi access designed to maximize customer dwell times. Operational infrastructure includes grease-trap interceptors for restaurant tenants, heavy three-phase electrical service panels, and centralized security monitoring across all common areas. Professional property management oversees groundskeeping, exterior maintenance, and proactive tenant support to maintain superior operational standards. High-speed commercial fiber connections are pre-ducted into every retail unit, and roof structural purlins are reinforced to support tenant-specific mechanical air handling equipment. Common area restrooms feature touchless fixtures, polished quartz vanities, and durable ceramic tile finishes.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nSituated at a signalized arterial intersection on Commerce Way, Summit Retail Plaza benefits from extraordinary vehicular traffic counts and prominent highway visibility. Austin\'s booming economy and rapid population expansion continue to fuel high household disposable incomes throughout the immediate trade area. The plaza boasts an established 96% tenant occupancy rate anchored by regional gourmet grocers, fitness studios, and popular lifestyle retailers under multi-year NNN lease structures. Restrictive municipal commercial zoning and rising land acquisition costs create high barriers to entry for competing retail developments. With contractual annual rent escalations, clear ownership title, and strong local demographic tailwinds, Summit Retail Plaza represents a dependable, inflation-protected commercial investment. Strong population growth across the Austin metropolitan statistical area provides powerful demographic tailwinds, supporting robust consumer foot traffic and steady annual retail tenant sales volumes.',
      images: [
        { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', alt: 'Summit Main' },
        { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', alt: 'Summit Store' },
        { url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80', alt: 'Summit Parking' }
      ]
    },
    legal: {
      ownership: 'Lone Star Commercial',
      titleType: 'Certificate of Title',
      lotDescription: 'Lot 200, Retail District, Austin.',
      siteArea: '5 acres',
      planNumber: 'TX-SUM-200',
      encumbrances: [],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Retail Hub',
      schoolDistrict: 'Austin North District',
      crimeRate: 'Low',
      floodZoneDetail: 'No flood risk.',
      upcomingDevelopments: [
        'New road expansion in 2026'
      ],
      environmentalNotes: [
        'Standard urban soil'
      ],
      walkScore: 70,
      transitScore: 85
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Title', status: 'verified', sourceTag: 'DEED' },
        { label: 'Parking Area', status: 'verified', sourceTag: 'PLAN' }
      ]
    },
    dashboardBadges: [
      { label: 'High Traffic', type: 'info' },
      { label: 'Verified', type: 'success' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Summit Retail Plaza. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Summit Retail Plaza. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **Lone Star Commercial**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$18M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **C-1**, which is for retail commercial use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone X**, which means there is no flood risk.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are **no legal risks or encumbrances** on this property. The title is perfectly clear.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'Summit Retail Plaza is an **$18M retail commercial property** in Austin. It is fully verified, has no legal risks, and high foot traffic.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  },
  {
    id: 'PR-5566',
    name: 'Green Valley Wellness Center',
    address: '12 Health Way, Boulder, CO',
    price: '$6.5M',
    priceNumeric: 6500000,
    type: 'Healthcare',
    listing: {
      assetType: 'Medical Center',
      totalGLA: '30,000 sq ft',
      zoning: 'M-1',
      yearBuilt: 2010,
      floodZone: 'Zone X',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nGreen Valley Wellness Center is a modern biophilic medical and wellness facility situated in Boulder, Colorado. Designed to optimize holistic healing and energy conservation, the building utilizes a hybrid mass-timber and reinforced concrete structural frame engineered for superior seismic and snow-load resilience. The exterior envelope features locally harvested cedar cladding, triple-pane argon-insulated glazing, and green living wall installations that naturally improve ambient air quality. High-efficiency geothermal heat exchange systems and rooftop photovoltaic solar arrays provide clean, renewable thermal conditioning throughout the winter and summer months. The building incorporates advanced architectural acoustic dampening to create a serene environment, while exterior bio-swales and native mountain plantings manage rainwater run-off sustainably. Subterranean foundation levels incorporate heavy radon mitigation suction systems and continuous moisture monitoring probes. Triple-glazed thermally broken aluminum frames provide superior acoustic attenuation against mountain gusts and regional roadway noise.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nThe interior spans 38,000 square feet designed around a sunlit central atrium with cascading living plants, natural stone water features, and ergonomic timber seating. Clinical and wellness suites are configured with independent acoustic isolation, custom birch cabinetry, private consultation rooms, and individual climate controls. Amenities include therapeutic hydrotherapy pools, infrared saunas, a meditation sanctuary, and a community apothecary cafe serving organic refreshments. Operational infrastructure includes hospital-grade HEPA air purification systems, touchless automatic doors, and integrated digital patient reception kiosks. The facility provides reserved surface parking with electric vehicle fast chargers, ADA-compliant accessibility ramps across all levels, and dedicated medical waste handling facilities. The second level hosts specialized integrative consultation suites with private sound masking acoustic emitters, circadian lighting systems, and private practitioner office spaces. A dedicated herbal dispensary and organic juice bar serve patients and wellness community members.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nNestled along Foothills Boulevard in Boulder, the center enjoys an enviable location framed by panoramic views of the Rocky Mountain Flatirons. Boulder is recognized nationally as a hub for health, wellness innovation, and high-income demographic growth, ensuring strong demand for specialized integrative medical care. The property benefits from long-term, triple-net leases with medical wellness practices, physical therapy clinics, and research laboratories. Strict municipal open-space and commercial development regulations in Boulder prevent new medical developments nearby, protecting the asset\'s competitive advantage. With high tenant retention, pristine title records, and cutting-edge sustainable infrastructure, Green Valley Wellness Center offers strong long-term real estate returns. Boulder\'s demographic profile represents one of the highest concentrations of health-conscious, affluent residents in the nation, guaranteeing exceptionally stable demand and high patient retention for on-site medical and holistic operators.',
      images: [
        { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80', alt: 'Green Valley Main' },
        { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80', alt: 'Green Valley Garden' },
        { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', alt: 'Green Valley Office' }
      ]
    },
    legal: {
      ownership: 'Colorado Health Trust',
      titleType: 'Warranty Deed',
      lotDescription: 'Lot 5, Wellness Zone, Boulder.',
      siteArea: '3 acres',
      planNumber: 'CO-GV-5',
      encumbrances: [],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Health District',
      schoolDistrict: 'Boulder Public Schools',
      crimeRate: 'Very Low',
      floodZoneDetail: 'No flood risk.',
      upcomingDevelopments: [
        'New pharmacy next door'
      ],
      environmentalNotes: [
        'Air quality is excellent'
      ],
      walkScore: 60,
      transitScore: 70
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Title', status: 'verified', sourceTag: 'DEED' },
        { label: 'Zoning', status: 'verified', sourceTag: 'CITY' }
      ]
    },
    dashboardBadges: [
      { label: 'Accessible', type: 'info' },
      { label: 'Verified', type: 'success' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Green Valley Wellness Center. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Green Valley Wellness Center. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **Colorado Health Trust**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$6.5M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **M-1**, which is for medical use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone X**, which means there is no flood risk.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are **no legal risks or encumbrances** on this property. The title is perfectly clear.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'Green Valley Wellness Center is a **$6.5M healthcare facility** in Boulder. It is fully verified, accessible, and has no legal risks.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  },
  {
    id: 'PR-8899',
    name: 'Ironworks Art Studios',
    address: '88 Foundry Lane, Portland, OR',
    price: '$4.2M',
    priceNumeric: 4200000,
    type: 'Mixed Use',
    listing: {
      assetType: 'Creative Studios',
      totalGLA: '20,000 sq ft',
      zoning: 'M-U',
      yearBuilt: 1940,
      floodZone: 'Zone X',
      description: '**Architectural Vision, Structural Engineering, and Façade Specifications**\nIronworks Art Studios is a celebrated adaptive reuse creative loft complex located in the historic waterfront arts district of Brooklyn, New York. Originally constructed as an industrial iron fabrication foundry at the turn of the twentieth century, the building has been completely retrofitted with modern structural seismic bracing, reinforced concrete floor slabs, and restored load-bearing brick masonry. The architectural envelope features oversized factory-style multi-pane steel windows fitted with thermal acoustic double-glazing that floods the interiors with natural northern light. The exterior combines historic brickwork with industrial blackened steel accents and a restored copper cornice. Building infrastructure includes newly modernized passenger and freight elevators, updated electrical panels, and energy-efficient central heating and ventilation systems. Structural retrofits include heavy earthquake moment-resisting steel frames and newly poured composite lightweight concrete floor decks that exceed modern commercial building codes. High-performance roof insulation drastically reduces seasonal heating expenses while preserving historic rooflines.\n\n**Interior Spatial Layout, Luxury Living Amenities, and Operational Infrastructure**\nThe complex offers versatile loft studios and creative workspaces highlighted by original exposed brick walls, heavy timber beams, and soaring 14-foot timber ceilings. The flexible open-concept floor plans accommodate art galleries, architectural practices, media production suites, and designer showrooms. Communal amenities include a rooftop sculpture garden with breathtaking views of the East River and Manhattan skyline, an espresso bar lounge, a printmaking lab, and freight elevator access for large artwork. Advanced operational features include fiber-optic gigabit connectivity, electronic keycard access, multi-zone security monitoring, and secure bicycle storage. Dedicated loading bays simplify equipment and supply deliveries for all creative tenants. High-power electrical distribution panels provide 200-amp three-phase service to each creative loft, easily supporting ceramic kilns, professional photography studio lighting, and digital fabrication equipment. The building features an automated freight lift with direct street roll-up door access.\n\n**Prime Geographic Positioning, Neighborhood Dynamics, and Long-Term Investment Value**\nSituated on Factory Lane in Brooklyn, the property enjoys prime placement within one of the city\'s most dynamic cultural and creative epicenters. The location is steps from waterfront parks, boutique coffee roasteries, renowned culinary destinations, and multiple transit routes connecting to Lower and Midtown Manhattan. The Brooklyn creative office and artist studio market experiences sustained tenant demand, fueled by media firms, tech startups, and independent designers seeking authentic architectural character. With verified title status, stable in-place creative tenancies, and steady neighborhood rent growth, Ironworks Art Studios presents an extraordinary opportunity to own a historically distinguished, income-generating Brooklyn asset. With close proximity to the waterfront ferry terminal and subway lines, the studios offer an effortless commute for creative professionals living throughout Brooklyn, Queens, and Manhattan, reinforcing sustained rental demand and asset valuation.',
      images: [
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', alt: 'Ironworks Main' },
        { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', alt: 'Ironworks Studio' },
        { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80', alt: 'Ironworks Gallery' }
      ]
    },
    legal: {
      ownership: 'Portland Arts Collective',
      titleType: 'Warranty Deed',
      lotDescription: 'Lot 88, Creative Zone, Portland.',
      siteArea: '1.5 acres',
      planNumber: 'OR-IW-88',
      encumbrances: [],
      titleVerified: true
    },
    locality: {
      neighborhood: 'Art District',
      schoolDistrict: 'Portland Public Schools',
      crimeRate: 'Low',
      floodZoneDetail: 'No flood risk.',
      upcomingDevelopments: [
        'New art museum nearby'
      ],
      environmentalNotes: [
        'Old factory cleaned and safe'
      ],
      walkScore: 85,
      transitScore: 80
    },
    mismatches: [],
    verifiedStatus: {
      confidenceScore: 100,
      items: [
        { label: 'Title', status: 'verified', sourceTag: 'DEED' },
        { label: 'Zoning', status: 'verified', sourceTag: 'CITY' }
      ]
    },
    dashboardBadges: [
      { label: 'Creative Space', type: 'info' },
      { label: 'Verified', type: 'success' }
    ],
    welcomeMessage: "Hello! I have checked all the papers for Ironworks Art Studios. Everything is correct and verified. How can I help you today?",
    qaBank: [
      {
        keywords: ['hello', 'hi', 'help', 'start'],
        question: 'Hello!',
        answer: "Hello! I have checked all the papers for Ironworks Art Studios. Everything is correct and verified. How can I help you today?",
        sources: [],
        suggestedFollowUps: ['Summarize this property', 'Who owns it?', 'What is the price?']
      },
      {
        keywords: ['owner', 'ownership', 'who owns'],
        question: 'Who owns it?',
        answer: 'The property is owned by **Portland Arts Collective**.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['What is the price?', 'What is the zoning?']
      },
      {
        keywords: ['price', 'cost', 'value'],
        question: 'What is the price?',
        answer: 'The asking price is **$4.2M**.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['zoning', 'zone', 'classification'],
        question: 'What is the zoning?',
        answer: 'The zoning is **M-U**, which is for mixed-use.',
        sources: [{ label: 'Listing Details', type: 'listing' }],
        suggestedFollowUps: ['Who owns it?', 'Check for legal risks']
      },
      {
        keywords: ['flood', 'water', 'flood zone', 'risk'],
        question: 'Is it in a flood zone?',
        answer: 'No, it is in **Zone X**, which means there is no flood risk.',
        sources: [{ label: 'Locality Report', type: 'locality' }],
        suggestedFollowUps: ['Who owns it?', 'What is the price?']
      },
      {
        keywords: ['legal', 'risks', 'issues', 'concerns', 'encumbrances'],
        question: 'Check for legal risks',
        answer: 'There are **no legal risks or encumbrances** on this property. The title is perfectly clear.',
        sources: [{ label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?']
      },
      {
        keywords: ['summarize', 'summary', 'overview', 'tell me about', 'details'],
        question: 'Summarize this property',
        answer: 'Ironworks Art Studios is a **$4.2M mixed-use creative space** in Portland. It is fully verified, has no legal risks, and an industrial style.',
        sources: [{ label: 'Listing Details', type: 'listing' }, { label: 'Legal Title', type: 'legal' }],
        suggestedFollowUps: ['Who owns it?', 'What is the zoning?', 'Check for legal risks']
      }
    ]
  }
];

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}
