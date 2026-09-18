# PropertyIQ — Scope and Repository Guide

## 1. Project Overview

**PropertyIQ** is a Next.js and TypeScript web application that presents property intelligence through a dashboard, property detail pages, legal-document views, and an interactive AI assistant.

The application is designed to help users review structured property records, compare listing information with legal records, identify documented mismatches, and ask questions about a selected property.

---

## 2. In Scope

The following capabilities are currently within the scope of the repository.

### 2.1 Property Discovery Dashboard

The application provides a dashboard for browsing available properties.

Supported functionality includes:

- Displaying property cards in a responsive grid.
- Showing property names, prices, addresses, images, and badges.
- Filtering properties by dashboard tags.
- Sorting properties by price:
  - Featured/default order.
  - Lowest to highest.
  - Highest to lowest.
- Searching by:
  - Property name.
  - Address.
  - Property ID.
  - Asset type.
  - Dashboard badge.
- Resetting active search, filter, and sorting state.
- Displaying an empty state when no property matches the current query.

Main implementation:

- `propertyiq/app/page.tsx`
- `propertyiq/components/PropertyCard.tsx`
- `propertyiq/components/TopBar.tsx`
- `propertyiq/components/SearchContext.tsx`

---

### 2.2 Property Detail Pages

Users can open a property-specific page using a dynamic property ID route.

The property detail view includes:

- Property name, price, and address.
- Property image gallery.
- Listing specifications.
- Asset type.
- Gross leasable area.
- Zoning code.
- Year constructed.
- Flood-risk zone.
- Verification confidence score.
- Verification items and source tags.
- Document mismatch indicators.
- A comprehensive property description.
- Navigation to legal documents.
- Access to the AI assistant.

Main implementation:

- `propertyiq/app/property/[id]/page.tsx`
- `propertyiq/app/property/[id]/layout.tsx`
- `propertyiq/components/PropertyDetailView.tsx`
- `propertyiq/data/properties.ts`

---

### 2.3 Legal Document Viewer

The repository includes a simulated three-page legal document viewer for each property.

Supported functionality includes:

- Viewing all three document pages.
- Viewing individual pages.
- Zooming in and out.
- Resetting zoom.
- Printing the document.
- Highlighting a detected site-area mismatch.
- Displaying title ownership information.
- Displaying cadastral plan information.
- Displaying site-area comparisons.
- Displaying mortgages, liens, easements, and other encumbrances.
- Displaying zoning-related notes.
- Showing an extraction summary sidebar.
- Showing an AI discrepancy insight when a mismatch exists.
- Returning to the property overview.

Main implementation:

- `propertyiq/app/property/[id]/documents/page.tsx`
- `propertyiq/components/LegalDocumentView.tsx`

---

### 2.4 Property Assistant Chat

Users can ask questions about a specific property through the assistant drawer.

The chat interface supports:

- Opening and closing the assistant.
- Sending natural-language questions.
- Displaying user and assistant messages.
- Showing loading indicators.
- Rendering basic bold Markdown formatting.
- Displaying suggested follow-up questions.
- Displaying source tags for answers.
- Asking for a property summary.
- Handling unavailable or failed responses.

Main implementation:

- `propertyiq/components/ChatPanel.tsx`
- `propertyiq/components/PropertyDetailView.tsx`
- `propertyiq/app/api/chat/route.ts`

---

### 2.5 Local Property Question Answering

The application contains a local keyword-based question-answering system.

The local search engine:

- Normalizes user queries.
- Removes common stop words.
- Scores keyword matches.
- Matches questions against each property's `qaBank`.
- Returns a predefined answer when the confidence is high enough.
- Provides source labels.
- Provides suggested follow-up questions.
- Handles greetings, summaries, prices, areas, ownership, and fallback questions.

Main implementation:

- `propertyiq/lib/search-engine.ts`
- `propertyiq/data/properties.ts`

---

### 2.6 Optional Groq-Powered Analysis

For complex or unmatched questions, the chat API can call the Groq API.

The Groq integration:

- Builds a structured property dossier.
- Includes listing, legal, locality, and mismatch information.
- Sends the dossier to an OpenAI-compatible Groq endpoint.
- Uses a strict grounding prompt.
- Requests JSON-only output.
- Sanitizes returned source types.
- Limits suggested follow-up questions.
- Uses a timeout to prevent long-running requests.
- Falls back to local search if the Groq request fails.

Main implementation:

- `propertyiq/lib/groq-assistant.ts`
- `propertyiq/app/api/chat/route.ts`

Required environment variable:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Optional environment variable:

```env
GROQ_MODEL=your_preferred_groq_model
```

---

### 2.7 Responsive Application Shell

The application uses a shared shell around the dashboard and property-specific pages.

The shell provides:

- A persistent sidebar.
- A top navigation bar.
- Global search state.
- Navigation between overview and document pages.
- Property-aware navigation when viewing a property.
- Responsive content areas with scrollable main panels.

Main implementation:

- `propertyiq/components/AppShell.tsx`
- `propertyiq/components/Sidebar.tsx`
- `propertyiq/components/TopBar.tsx`
- `propertyiq/components/SearchContext.tsx`

---

### 2.8 Styling and Visual Design

The application uses:

- Tailwind CSS.
- Custom CSS variables.
- Geist and Geist Mono fonts.
- Emerald green verification accents.
- Red mismatch indicators.
- Amber document and warning indicators.
- Custom chat scrollbar styling.
- Typing-dot animation.
- Responsive layouts.

Main implementation:

- `propertyiq/app/globals.css`
- `propertyiq/postcss.config.mjs`
- `propertyiq/app/layout.tsx`

---

## 3. Out of Scope

The following capabilities are described conceptually in the project documentation or implied by the product vision, but they are not fully implemented in the current repository.

### 3.1 Production Property Database

The application does not currently use a persistent database.

Property records are stored in:

```text
propertyiq/data/properties.ts
```

There is no visible implementation for:

- PostgreSQL.
- MongoDB.
- MySQL.
- Prisma.
- Drizzle ORM.
- Database migrations.
- User-created property records.
- Persistent edits to property data.

---

### 3.2 Real Document Upload and Ingestion

The repository does not currently implement document upload or document processing.

There is no visible support for:

- Uploading PDFs.
- Uploading deeds or title documents.
- OCR.
- PDF text extraction.
- Document parsing.
- Document classification.
- Automatic document indexing.
- Document version management.
- File storage integration.

The legal-document page is rendered from structured property fixture data and generated UI content.

---

### 3.3 Real Retrieval-Augmented Generation Pipeline

Although the README mentions RAG, embeddings, and a vector database, the current code does not contain a complete production RAG pipeline.

There is no visible implementation for:

- Creating embeddings.
- Storing embeddings.
- Vector similarity search.
- Chunking uploaded documents.
- Retrieval from a vector store.
- Metadata filtering in a vector database.
- Re-ranking retrieved document passages.
- Citation offsets linked to source-document pages.

The current assistant uses:

1. Local keyword and QA-bank matching.
2. A generated property dossier sent to Groq when local matching is insufficient.

Relevant files:

- `propertyiq/lib/search-engine.ts`
- `propertyiq/lib/groq-assistant.ts`

---

### 3.4 External Legal or Municipal Record Verification

The application displays legal and locality information, but it does not currently fetch live information from official sources.

There is no visible integration with:

- Land registries.
- County recorder systems.
- Municipal zoning APIs.
- Flood-map APIs.
- School district APIs.
- Crime-data APIs.
- Property tax systems.
- Insurance providers.
- Real-estate listing providers.

The displayed records are defined in the local TypeScript dataset.

---

### 3.5 Real Legal Advice

PropertyIQ should not be treated as a legal-advice system.

The current implementation does not provide:

- Attorney review.
- Legal opinions.
- Binding title opinions.
- Contract drafting.
- Automated legal compliance certification.
- Jurisdiction-aware legal interpretation.
- Professional liability coverage.
- Escalation to a licensed attorney.

The assistant itself displays a warning that AI analysis may require human verification.

---

### 3.6 Authentication and Authorization

The repository does not currently implement user accounts or access control.

There is no visible support for:

- Sign-up.
- Login.
- Password reset.
- OAuth.
- Role-based access control.
- Organization workspaces.
- Property-level permissions.
- Admin dashboards.
- Audit logs.
- User session persistence.

The user avatar, settings button, notifications button, and help button are currently UI elements with simple alert behavior.

---

### 3.7 Persistent Chat History

Chat messages are maintained in React component state.

The current implementation does not persist conversations to:

- A database.
- Browser storage.
- A user account.
- A server-side session.
- An exportable conversation history.

Refreshing or leaving the page can remove the current chat state.

---

### 3.8 Real Notifications and Settings

The notification and settings controls are placeholders.

Current behavior includes alert messages such as:

- No new notifications.
- Settings information.
- Help and documentation instructions.

There is no backend notification system or settings management flow.

---

### 3.9 Production-Grade Document Security

The repository does not currently implement document security controls such as:

- Encryption at rest.
- Encryption key management.
- Access logging.
- Watermarking.
- Download restrictions.
- Permission-controlled sharing.
- Redaction.
- PII detection.
- Secure document deletion.
- Compliance controls for sensitive legal documents.

---

### 3.10 Automated Testing

The repository contains a lint script but no visible test suite.

There are no configured tests for:

- Component behavior.
- Search ranking.
- Chat API responses.
- Groq response parsing.
- Mismatch detection.
- Route behavior.
- Accessibility.
- End-to-end user flows.

Available validation command:

```bash
npm run lint
```

---

### 3.11 Python Backend

The README mentions Python as part of the technology stack, but the inspected application is implemented as a Next.js and TypeScript project.

No Python backend or Python source directory is currently present in the application implementation.

---

## 4. Repository Structure

The repository contains a top-level `propertyiq` Next.js application.

```text
PropertyIQ/
├── README.md
└── propertyiq/
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts
    │   ├── property/
    │   │   └── [id]/
    │   │       ├── documents/
    │   │       │   └── page.tsx
    │   │       ├── layout.tsx
    │   │       └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── AppShell.tsx
    │   ├── ChatPanel.tsx
    │   ├── LegalDocumentView.tsx
    │   ├── PropertyCard.tsx
    │   ├── PropertyDetailView.tsx
    │   ├── SearchContext.tsx
    │   ├── Sidebar.tsx
    │   └── TopBar.tsx
    ├── data/
    │   └── properties.ts
    ├── lib/
    │   ├── groq-assistant.ts
    │   └── search-engine.ts
    ├── public/
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── .gitignore
    ├── AGENTS.md
    ├── CLAUDE.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

---

## 5. Main Files and How They Help

### 5.1 Application Routes

| File | Responsibility |
|---|---|
| `propertyiq/app/page.tsx` | Renders the discovery dashboard. Loads all properties, applies search/filter/sort logic, and renders `PropertyCard` components. |
| `propertyiq/app/layout.tsx` | Defines the root HTML layout, metadata, global fonts, and global CSS loading. |
| `propertyiq/app/property/[id]/page.tsx` | Loads one property by ID and renders its detail view. Calls `notFound()` when the ID is invalid. |
| `propertyiq/app/property/[id]/layout.tsx` | Wraps property-specific pages with `AppShell` and passes the current property ID to navigation components. |
| `propertyiq/app/property/[id]/documents/page.tsx` | Loads a property and renders its legal-document viewer. |
| `propertyiq/app/api/chat/route.ts` | Exposes the `POST /api/chat` endpoint and orchestrates local search, Groq fallback, and final fallback responses. |

---

### 5.2 Shared UI Components

| File | Responsibility |
|---|---|
| `propertyiq/components/AppShell.tsx` | Provides the overall layout with sidebar, top bar, search provider, and scrollable content area. |
| `propertyiq/components/Sidebar.tsx` | Provides application branding, overview navigation, document navigation, new-analysis navigation, and help UI. |
| `propertyiq/components/TopBar.tsx` | Provides global search, autocomplete suggestions, keyboard navigation, property routing, and placeholder notification/settings controls. |
| `propertyiq/components/SearchContext.tsx` | Stores the global search query and exposes it through `useSearch()`. |
| `propertyiq/components/PropertyCard.tsx` | Displays a property preview with image, price, address, verification badge, and category badges. |
| `propertyiq/components/PropertyDetailView.tsx` | Displays the property overview, gallery, listing specs, verification status, analysis text, and assistant drawer. |
| `propertyiq/components/ChatPanel.tsx` | Provides the assistant conversation interface, sends chat requests, shows sources, and displays suggested queries. |
| `propertyiq/components/LegalDocumentView.tsx` | Renders the three-page legal-document interface, mismatch highlighting, zoom controls, printing, extraction summary, and discrepancy insight. |

---

### 5.3 Data and Domain Models

| File | Responsibility |
|---|---|
| `propertyiq/data/properties.ts` | Defines the `Property` domain model and stores the sample property records. Also exports `getAllProperties()` and `getPropertyById()`. |

Important domain types defined in this file include:

- `Property`
- `ListingData`
- `LegalData`
- `LocalityData`
- `Mismatch`
- `VerificationItem`
- `VerifiedStatus`
- `Source`
- `QAPair`
- `DashboardBadge`

The `Property` object combines:

```text
Identity
├── ID
├── name
├── address
├── price
└── property type

Listing information
├── asset type
├── area
├── zoning
├── construction year
├── flood zone
├── description
└── images

Legal information
├── ownership
├── title type
├── lot description
├── site area
├── plan number
├── encumbrances
└── title verification

Locality information
├── neighborhood
├── school district
├── crime rate
├── flood details
├── upcoming developments
├── environmental notes
├── walk score
└── transit score

Assistant and verification information
├── mismatches
├── verification status
├── QA bank
├── dashboard badges
└── welcome message
```

---

### 5.4 Assistant and Search Logic

| File | Responsibility |
|---|---|
| `propertyiq/lib/search-engine.ts` | Implements local query normalization, stop-word removal, keyword scoring, QA-bank matching, fallback answers, confidence calculation, and source selection. |
| `propertyiq/lib/groq-assistant.ts` | Builds a property dossier, calls the Groq OpenAI-compatible API, enforces grounded response instructions, parses JSON, validates sources, and returns assistant output. |

The chat request flow is:

```text
ChatPanel
   │
   │ POST /api/chat
   ▼
app/api/chat/route.ts
   │
   ├── Validate property ID
   ├── Return welcome message for empty queries
   ├── Try local QA-bank search
   │       └── Return immediately for high-confidence matches
   ├── Try Groq assistant for complex queries
   │       └── Build dossier and call Groq API
   └── Return local fallback response if necessary
```

---

### 5.5 Styling and Build Configuration

| File | Responsibility |
|---|---|
| `propertyiq/app/globals.css` | Loads Tailwind CSS, defines theme variables, sets global colors/fonts, and adds chat-specific scrollbar and typing animations. |
| `propertyiq/next.config.ts` | Allows remote images from `images.unsplash.com` and `picsum.photos`. |
| `propertyiq/postcss.config.mjs` | Configures Tailwind CSS through `@tailwindcss/postcss`. |
| `propertyiq/tsconfig.json` | Enables strict TypeScript checking, Next.js support, JSX transformation, path aliases, and no-emit compilation. |
| `propertyiq/eslint.config.mjs` | Configures Next.js Core Web Vitals and TypeScript ESLint rules. |
| `propertyiq/package.json` | Defines development, build, start, and lint scripts along with project dependencies. |
| `propertyiq/package-lock.json` | Locks the npm dependency tree for reproducible installations. |

---

### 5.6 Static Assets

| File or Directory | Responsibility |
|---|---|
| `propertyiq/public/` | Stores static assets served directly by Next.js. |
| `propertyiq/public/file.svg` | Default file icon asset. |
| `propertyiq/public/globe.svg` | Default globe icon asset. |
| `propertyiq/public/next.svg` | Next.js starter asset. |
| `propertyiq/public/vercel.svg` | Vercel starter asset. |
| `propertyiq/public/window.svg` | Default window icon asset. |

The property gallery images are not stored locally. They use remote URLs configured in `data/properties.ts` and permitted by `next.config.ts`.

---

## 6. Runtime Flow

### 6.1 Dashboard Flow

```text
User visits /
   │
   ▼
app/page.tsx
   │
   ├── getAllProperties()
   ├── Reads global search query
   ├── Applies tag filtering
   ├── Applies price sorting
   └── Renders PropertyCard components
```

### 6.2 Property Overview Flow

```text
User selects a property card
   │
   ▼
/property/[id]
   │
   ▼
app/property/[id]/page.tsx
   │
   ├── Reads dynamic property ID
   ├── Calls getPropertyById()
   ├── Returns 404 for unknown IDs
   └── Renders PropertyDetailView
```

### 6.3 Legal Document Flow

```text
User selects "View Legal Docs"
   │
   ▼
/property/[id]/documents
   │
   ▼
documents/page.tsx
   │
   └── Renders LegalDocumentView
          ├── Uses legal property fields
          ├── Identifies mismatches
          ├── Renders three document pages
          └── Displays extraction summary
```

### 6.4 Assistant Flow

```text
User asks a question
   │
   ▼
ChatPanel.tsx
   │
   ▼
POST /api/chat
   │
   ├── Local keyword search
   ├── High-confidence QA response
   ├── Groq dossier-based response
   └── Local fallback response
```

---

## 7. Current Technical Stack

### Frontend

- Next.js `16.3.3`
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- `lucide-react` icons

### Backend

- Next.js App Router route handlers.
- TypeScript.
- No separate Express server is currently present.

### AI Integration

- Optional Groq API integration.
- OpenAI-compatible chat-completions endpoint.
- Structured property dossier generation.
- JSON response parsing.
- Local keyword-based fallback engine.

### Data Layer

- In-memory TypeScript property fixtures.
- No production persistence layer currently configured.

### Development Tools

- ESLint `9`.
- Next.js ESLint configuration.
- TypeScript strict mode.
- npm scripts for development, build, start, and lint.

---

## 8. How to Run the Project

The Next.js application is located in the `propertyiq` directory.

```bash
cd propertyiq
npm install
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

To create a production build:

```bash
npm run build
npm run start
```

To run lint checks:

```bash
npm run lint
```

For Groq-powered responses, create a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Optional model configuration:

```env
GROQ_MODEL=your_preferred_groq_model
```

Without `GROQ_API_KEY`, the application can still use the local QA-bank and fallback search behavior.

---

## 9. Important Implementation Limitations

The current application should be understood as a functional prototype or demonstration system rather than a production property-verification platform.

Important limitations include:

1. Property information is hard-coded in `data/properties.ts`.
2. Legal documents are generated UI representations rather than uploaded source documents.
3. Mismatch records are predefined rather than automatically calculated from uploaded files.
4. The local assistant uses keyword matching and predefined answers.
5. Groq responses depend on an optional external API key.
6. No persistent database is configured.
7. No user authentication is configured.
8. No real-time municipal, legal, insurance, or locality data is fetched.
9. No automated test suite is present.
10. AI output must be reviewed by a qualified human before making legal or financial decisions.

---

## 10. Recommended Future Scope

Potential future enhancements include:

- Add a persistent database for property records.
- Introduce user authentication and organization workspaces.
- Add secure document upload and storage.
- Implement PDF parsing and OCR.
- Build document chunking and embeddings.
- Add a vector database for true RAG retrieval.
- Link citations to exact document pages and passages.
- Replace fixture data with official record integrations.
- Add automated discrepancy detection.
- Add document versioning and audit logs.
- Add automated unit, integration, and end-to-end tests.
- Implement real notification and settings systems.
- Add role-based access control.
- Add secure redaction and personally identifiable information protection.
- Add observability, API rate limiting, and production error handling.

---

## 11. Summary

PropertyIQ currently delivers a polished property-intelligence prototype with:

- A searchable and filterable property dashboard.
- Dynamic property detail pages.
- Verification and mismatch presentation.
- A simulated legal-document viewer.
- A local property-question-answering engine.
- Optional Groq-powered assistant responses.
- A reusable Next.js application shell.

Its current architecture is centered around static TypeScript property data, client-side UI components, Next.js App Router pages, and a hybrid local/API chat workflow. The major future work is moving from prototype data and simulated documents toward secure, persistent, externally verified property intelligence.
