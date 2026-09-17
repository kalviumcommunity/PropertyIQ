"use client";

import { useState } from "react";
import { Property } from "@/data/properties";
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bot, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Building2, 
  ShieldCheck,
  Calendar,
  Waves,
  Maximize2
} from "lucide-react";
import ChatPanel from "@/components/ChatPanel";
import Link from "next/link";

interface PropertyDetailViewProps {
  property: Property;
}

export default function PropertyDetailView({ property }: PropertyDetailViewProps) {
  // Chatbot is CLOSED by default on entry
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const statusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />;
    if (status === 'mismatch') return <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />;
    return <HelpCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />;
  };

  // Format description into 3 distinct sections with bold titles
  const rawSections = property.listing.description
    .split(/\\n\\n|\n\n/)
    .filter(Boolean);

  const descriptionSections = rawSections.map((section, idx) => {
    const cleaned = section.replace(/^\\n+|\\n+$/g, "").trim();
    const match = cleaned.match(/^\*\*([^*]+)\*\*([\s\S]+)$/);
    if (match) {
      return {
        title: match[1].trim(),
        body: match[2].trim(),
      };
    }
    return {
      title: `Section ${idx + 1}`,
      body: cleaned,
    };
  });

  const totalWords = property.listing.description
    .replace(/\\n/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="relative min-h-full w-full bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto pb-28">
        {/* Breadcrumb / Top Row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">{property.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white text-gray-600 rounded-full font-mono text-xs border border-gray-200 shadow-xs font-semibold">
              ID: {property.id}
            </span>
            <Link
              href={`/property/${property.id}/documents`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Legal Docs</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Ask Assistant</span>
            </button>
          </div>
        </div>

        {/* Title and Address */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{property.name}</h1>
            <span className="font-mono text-2xl font-bold text-emerald-700">{property.price}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 mt-1.5">
            <MapPin className="w-4 h-4 shrink-0 text-emerald-600" />
            <p className="text-sm font-medium">{property.address}</p>
          </div>
        </div>

        {/* High-Resolution Verified House Photography Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 h-72 md:h-96 relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.listing.images[0]?.url}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-gray-900/80 backdrop-blur-xs text-white rounded-full text-xs font-semibold">
              Primary Exterior
            </div>
          </div>
          <div className="md:col-span-1 grid grid-rows-2 gap-4 h-72 md:h-96">
            <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.listing.images[1]?.url}
                alt="Property detail 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-gray-900/70 text-white rounded-md text-[11px] font-medium">
                Architecture
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.listing.images[2]?.url}
                alt="Property detail 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-gray-900/70 text-white rounded-md text-[11px] font-medium">
                Living Space
              </div>
            </div>
          </div>
        </div>

        {/* Listing Specs and Verified Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Listing Specs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Listing Specs</span>
              </h2>
              <span className="text-xs font-medium text-gray-400">Verified from Listing</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: 'Asset Type', value: property.listing.assetType },
                { label: 'Total GLA / Area', value: property.listing.totalGLA },
                { label: 'Zoning Code', value: property.listing.zoning, warn: property.mismatches.some(m => m.field.toLowerCase().includes('zoning')) },
                { label: 'Year Constructed', value: String(property.listing.yearBuilt) },
                { label: 'Flood Risk Zone', value: property.listing.floodZone },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-3 px-6 items-center hover:bg-gray-50/50 transition-colors">
                  <span className="text-gray-500 text-sm font-medium">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">{row.value}</span>
                    {row.warn && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                        <AlertTriangle className="w-3 h-3" /> Mismatch
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Data Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Data Status</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {property.verifiedStatus.confidenceScore}% CONFIDENCE
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              {property.verifiedStatus.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    item.status === 'mismatch'
                      ? 'bg-red-50/70 border border-red-200'
                      : 'hover:bg-gray-50/70 border border-transparent'
                  }`}
                >
                  {statusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`font-semibold text-sm ${item.status === 'mismatch' ? 'text-red-900' : 'text-gray-900'}`}>
                        {item.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        item.status === 'mismatch'
                          ? 'border-red-200 text-red-700 bg-red-100'
                          : item.status === 'verified'
                          ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                          : 'border-gray-200 text-gray-500 bg-gray-100'
                      }`}>
                        {item.sourceTag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comprehensive 1,000+ Word Property Description in 3 Formatted Sections */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-lg text-gray-900">Comprehensive Property Analysis</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                {totalWords.toLocaleString()} words
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                3 Detailed Sections
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8 divide-y divide-gray-100">
            {descriptionSections.map((section, idx) => (
              <div key={idx} className={idx > 0 ? "pt-8" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify pl-8 border-l-2 border-emerald-100/60 font-normal">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button to Open Assistant (Only when assistant is closed) */}
      {!isAssistantOpen && (
        <button
          type="button"
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-8 right-8 bg-gray-950 text-white rounded-full px-6 py-3.5 flex items-center gap-3 shadow-2xl hover:bg-emerald-700 transition-all hover:scale-105 z-30 cursor-pointer border border-emerald-500/30 group animate-in fade-in duration-200"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <Bot className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
          <span className="font-semibold text-sm tracking-wide">ASK PROPERTYIQ ASSISTANT</span>
        </button>
      )}

      {/* Slide-In Assistant Drawer (Only opens when user clicks the button) */}
      {isAssistantOpen && (
        <div className="fixed right-0 top-16 bottom-0 w-[420px] max-w-full bg-white shadow-2xl border-l border-gray-200 z-40 flex flex-col animate-in slide-in-from-right duration-200">
          <ChatPanel 
            propertyId={property.id} 
            onClose={() => setIsAssistantOpen(false)} 
          />
        </div>
      )}
    </div>
  );
}
