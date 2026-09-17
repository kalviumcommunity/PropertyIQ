"use client";

import { useState } from "react";
import { Property } from "@/data/properties";
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Bot, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  Award
} from "lucide-react";
import Link from "next/link";

interface LegalDocumentViewProps {
  property: Property;
}

export default function LegalDocumentView({ property }: LegalDocumentViewProps) {
  const [activePage, setActivePage] = useState<"all" | "1" | "2" | "3">("all");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Mismatch detection
  const siteAreaMismatch = property.mismatches.find(
    (m) => m.field.toLowerCase().includes("site") || m.field.toLowerCase().includes("area")
  );
  const zoningMismatch = property.mismatches.find(
    (m) => m.field.toLowerCase().includes("zoning")
  );

  const registeredMortgage = property.legal.encumbrances.find((e) =>
    e.type.toLowerCase().includes("mortgage")
  );
  const easements = property.legal.encumbrances.filter(
    (e) => !e.type.toLowerCase().includes("mortgage")
  );

  const instrumentNumber = `TIT-${property.id}-${property.legal.planNumber.replace(/[^a-zA-Z0-9]/g, '')}`;
  const recordingDate = registeredMortgage?.registeredDate || "12 Jan 2018";

  const handlePrint = () => {
    window.print();
  };

  const scrollToDiscrepancy = () => {
    setActivePage("all");
    setTimeout(() => {
      const el = document.getElementById("legal-site-area-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="flex h-full w-full bg-slate-100/80">
      {/* Main Document Reading Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 chat-scroll">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Top Control Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 text-base md:text-lg">{property.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Official Registry Deed
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Instrument #{instrumentNumber} • Recorded {recordingDate} • 3 Pages
                </p>
              </div>
            </div>

            {/* View & Page Selectors */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActivePage("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePage === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All 3 Pages
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage("1")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePage === "1" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Page 1
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage("2")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePage === "2" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Page 2
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage("3")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePage === "3" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Page 3
                </button>
              </div>

              {siteAreaMismatch && (
                <button
                  type="button"
                  onClick={scrollToDiscrepancy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Highlight Mismatch</span>
                </button>
              )}

              <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(prev + 10, 120))}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(prev - 10, 80))}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Print Legal Document"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Document Pages Container (Scalable via zoomLevel) */}
          <div 
            className="space-y-10 transition-transform origin-top pb-16"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >

            {/* ========================================================================= */}
            {/* PAGE 1 OF 3: CERTIFICATE OF TITLE & GRANT CONVEYANCE */}
            {/* ========================================================================= */}
            {(activePage === "all" || activePage === "1") && (
              <div className="bg-[#fffefc] rounded-2xl shadow-xl border border-slate-300 p-8 md:p-14 font-serif text-slate-800 relative overflow-hidden transition-all duration-200">
                {/* Security Paper Border Graphic */}
                <div className="absolute inset-3 border border-slate-300/80 pointer-events-none rounded-xl" />
                <div className="absolute inset-4 border-2 border-slate-200/60 pointer-events-none rounded-lg" />

                {/* Top Header Information & Official Recording Ink Stamp */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-slate-800 mb-8 relative">
                  {/* Left: Official Government Seal */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-4 border-amber-800/80 bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col items-center justify-center p-1 text-center shadow-xs shrink-0 select-none">
                      <Award className="w-7 h-7 text-amber-900 mb-0.5" />
                      <span className="text-[7px] font-sans font-extrabold uppercase tracking-widest text-amber-950">
                        OFFICIAL SEAL
                      </span>
                      <span className="text-[6px] font-sans font-bold text-amber-800">
                        LAND REGISTRY
                      </span>
                    </div>
                    <div>
                      <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-900">
                        MUNICIPAL LAND REGISTRY & DEEDS ARCHIVE
                      </h2>
                      <p className="font-sans text-xs text-slate-600">
                        Division of Land Titles, Conveyancing & Cadastral Records
                      </p>
                      <p className="font-sans text-[11px] font-mono text-slate-500 mt-1">
                        Cadastral Plan: <strong>{property.legal.planNumber}</strong> • Tax Map Parcel ID: <strong>{property.id}-PID</strong>
                      </p>
                    </div>
                  </div>

                  {/* Right: Official Recording Ink Stamp Box */}
                  <div className="border-2 border-dashed border-red-700/80 bg-red-50/40 p-3 rounded-lg rotate-[-1.5deg] font-sans select-none shadow-xs max-w-xs shrink-0">
                    <div className="text-[10px] font-black tracking-widest uppercase text-red-900 border-b border-red-300 pb-1 text-center">
                      FILED & RECORDED IN OFFICIAL RECORDS
                    </div>
                    <div className="text-[11px] font-mono space-y-0.5 text-red-900 mt-1.5">
                      <div className="flex justify-between">
                        <span className="text-red-700">DATE:</span>
                        <span className="font-bold">{recordingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">TIME:</span>
                        <span className="font-bold">09:42:18 EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">DOC NO:</span>
                        <span className="font-bold">#{instrumentNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">RECORDER:</span>
                        <span className="font-bold">Hon. Eleanor Vance</span>
                      </div>
                    </div>
                    {/* Simulated Barcode */}
                    <div className="mt-2 pt-1 border-t border-red-200 flex items-center justify-between gap-1">
                      <div className="h-5 flex-1 bg-[repeating-linear-gradient(90deg,#8b0000,#8b0000_2px,transparent_2px,transparent_4px,#8b0000_4px,#8b0000_5px,transparent_5px,transparent_7px)] opacity-80" />
                      <span className="font-mono text-[9px] text-red-900 font-bold">*{property.id}*</span>
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <div className="text-center my-8">
                  <span className="font-sans text-xs uppercase tracking-widest text-slate-500 font-semibold block mb-1">
                    CERTIFIED LAND TITLE INSTRUMENT
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-slate-900 uppercase underline decoration-double decoration-slate-400 underline-offset-8">
                    {property.legal.titleType.toUpperCase()}
                  </h2>
                  <p className="font-sans text-xs text-slate-500 mt-4 italic">
                    Recorded under the Statutory Land Registration and Conveyance Act
                  </p>
                </div>

                {/* Formal Legal Recital */}
                <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
                  <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-slate-900">
                    KNOW ALL PERSONS BY THESE PRESENTS that this day, the Land Titles Registry of the municipal district does hereby certify, declare, and affirm that <strong>{property.legal.ownership}</strong> (hereinafter designated as the &quot;Registered Owner&quot; or &quot;Grantee&quot;) is lawfully seized and possessed of an indefeasible estate in Fee Simple Absolute, in that certain valuable tract, piece, and parcel of real property situated, lying, and being within the designated judicial municipality, subject solely to the reservations, exceptions, encumbrances, and memorials duly recorded and endorsed upon the Registry Day Book.
                  </p>

                  <p>
                    TOGETHER WITH all and singular the buildings, improvements, tenements, hereditaments, rights, easements, privileges, and appurtenances thereunto belonging or in anywise appertaining, and the reversion and reversions, remainder and remainders, rents, issues, and profits thereof, TO HAVE AND TO HOLD the said premises unto the said Registered Owner, its legal successors and assigns forever, to its and their own proper use, benefit, and behoof.
                  </p>

                  {/* Section 1: Cadastral Metes & Bounds and Site Area Verification */}
                  <div 
                    id="legal-site-area-section" 
                    className={`p-6 my-6 rounded-xl border-2 transition-all ${
                      siteAreaMismatch 
                        ? "bg-red-50/50 border-red-300 ring-2 ring-red-400/30" 
                        : "bg-blue-50/50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[11px]">
                          1
                        </span>
                        <span>Section 1: Legal Parcel Description & Site Area</span>
                      </h3>
                      {siteAreaMismatch ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          Discrepancy Detected vs Listing
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Title Verified
                        </span>
                      )}
                    </div>

                    <p className="font-mono text-xs md:text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-lg border border-slate-200">
                      &quot;ALL that certain lot, parcel, or piece of land designated as <strong>{property.legal.lotDescription}</strong>, filed as Cadastral Plan No. <strong>{property.legal.planNumber}</strong>, comprising a certified site area of:
                      <br className="my-1" />
                      <span className={`inline-block font-extrabold text-base px-2 py-0.5 rounded my-1 border ${
                        siteAreaMismatch 
                          ? "bg-red-100 text-red-900 border-red-300" 
                          : "bg-emerald-100 text-emerald-900 border-emerald-300"
                      }`}>
                        {property.legal.siteArea}
                      </span>
                      {siteAreaMismatch && (
                        <span className="ml-2 text-xs font-sans text-red-700 font-semibold">
                          (Note: Listing advertises {siteAreaMismatch.source2.value})
                        </span>
                      )}
                      <br className="my-1" />
                      commencing at a monument pin marking the northwest corner of the municipal boundary, thence running North 84 degrees 12 minutes East along the recorded street line...&quot;
                    </p>
                  </div>

                  <p>
                    THE REGISTERED OWNER covenants that it is well seized of the premises as a good, sure, perfect, absolute, and indefeasible estate of inheritance in law, having full right and authority to hold and convey the same, subject only to statutory covenants and Schedule B memorials set forth on Page 2 hereof.
                  </p>
                </div>

                {/* Page 1 Footer */}
                <div className="mt-12 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">PAGE 1 OF 3</span>
                    <span>•</span>
                    <span>Instrument #{instrumentNumber}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span>Grantor Initial: [_______]</span>
                    <span>Grantee Initial: [_______]</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    DIGITAL FINGERPRINT: #SHA256-48e89c...201
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PAGE 2 OF 3: SCHEDULE B — MEMORIAL OF ENCUMBRANCES & COVENANTS */}
            {/* ========================================================================= */}
            {(activePage === "all" || activePage === "2") && (
              <div className="bg-[#fffefc] rounded-2xl shadow-xl border border-slate-300 p-8 md:p-14 font-serif text-slate-800 relative overflow-hidden transition-all duration-200">
                <div className="absolute inset-3 border border-slate-300/80 pointer-events-none rounded-xl" />
                <div className="absolute inset-4 border-2 border-slate-200/60 pointer-events-none rounded-lg" />

                {/* Running Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800 mb-8 font-sans text-xs text-slate-600">
                  <span className="font-extrabold uppercase tracking-wider text-slate-800">
                    MUNICIPAL LAND REGISTRY • SCHEDULE B
                  </span>
                  <span className="font-mono text-slate-500">
                    BOOK 4821 / PAGE 105 • INSTRUMENT #{instrumentNumber}
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-xl md:text-2xl font-bold tracking-wider text-slate-900 uppercase">
                    SCHEDULE B: MEMORIAL OF ENCUMBRANCES, LIENS &amp; COVENANTS
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-1 italic">
                    All matters affecting title registered in the Day Book as of the date of official certification
                  </p>
                </div>

                <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
                  <p>
                    THE ESTATE in Fee Simple certified on Page 1 of this Instrument is subject to the following memorials, encumbrances, easements, covenants, and municipal charges duly registered and endorsed upon the Register of Deeds:
                  </p>

                  {/* Subsection 2.1: Financial Mortgages */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center justify-between">
                      <span>2.1 Financial Mortgages &amp; Deeds of Trust</span>
                      <span className="text-[10px] font-mono text-slate-500">LIEN MEMORIAL CLASS A</span>
                    </h4>
                    {registeredMortgage ? (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 font-sans text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Instrument Type:</span>
                          <span className="font-bold text-slate-800">{registeredMortgage.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mortgagee / Beneficiary:</span>
                          <span className="font-bold text-slate-800">{registeredMortgage.holder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Registration Date:</span>
                          <span className="font-bold text-slate-800">{registeredMortgage.registeredDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Registry Memorial Status:</span>
                          <span className="font-bold text-amber-700 bg-amber-50 px-1.5 rounded">Active Subordinated Memorial</span>
                        </div>
                      </div>
                    ) : (
                      <p className="font-sans text-xs text-slate-600 italic bg-white p-3 rounded-lg border border-slate-200">
                        &quot;No active commercial mortgages or deeds of trust appear upon the Day Book of Titles. Title is unencumbered by third-party institutional mortgage debt.&quot;
                      </p>
                    )}
                  </div>

                  {/* Subsection 2.2: Municipal Utility Easements */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center justify-between">
                      <span>2.2 Recorded Easements &amp; Rights-of-Way</span>
                      <span className="text-[10px] font-mono text-slate-500">SERVITUDES &amp; ACCESS</span>
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 font-sans text-xs space-y-2">
                      {easements.length > 0 ? (
                        easements.map((e, idx) => (
                          <div key={idx} className="pb-2 border-b border-slate-100 last:border-b-0 last:pb-0">
                            <p className="font-semibold text-slate-800">
                              • {e.type} in favor of <strong>{e.holder}</strong> (Registered {e.registeredDate}).
                            </p>
                            <p className="text-slate-500 text-[11px] mt-0.5">
                              Grants ingress, egress, maintenance rights, and inspection privileges for subterranean and aerial municipal utility networks across dedicated perimeter easement strips.
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-600 italic">
                          Standard municipal utility easement reserved along the westerly five (5) feet of parcel boundary for electrical, telecommunications, and municipal water line service.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subsection 2.3: Restrictive Covenants & Zoning */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center justify-between">
                      <span>2.3 Restrictive Covenants &amp; Regulatory Land-Use</span>
                      <span className="text-[10px] font-mono text-slate-500">ZONING &amp; FLOOD DISCLOSURE</span>
                    </h4>
                    <p className="text-xs md:text-sm font-sans text-slate-700 bg-white p-4 rounded-lg border border-slate-200 leading-relaxed">
                      Subject to the municipal zoning regulations governing <strong>{property.listing.zoning}</strong> districts, including maximum permissible floor-to-area ratios (FAR), structural setback baselines, and commercial occupancy density. The parcel is further subject to the municipal flood management provisions designated under <strong>{property.listing.floodZone}</strong>.
                      {zoningMismatch && (
                        <span className="block mt-2 font-bold text-red-700 bg-red-50 p-2 rounded border border-red-200">
                          ⚠️ AUDITOR NOTE: Municipal locality report indicates zoning reclassification review currently pending with the zoning board of appeals.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Subsection 2.4: Reservation of Minerals */}
                  <p className="italic text-xs md:text-sm text-slate-600 border-l-4 border-slate-300 pl-4 py-1">
                    RESERVING UNTO THE CROWN AND STATE all mines, minerals, coal, oil, hydrocarbons, and geothermal energy resources, and the right to enter and extract the same in accordance with statutory reservations.
                  </p>
                </div>

                {/* Examiner Ink Stamp */}
                <div className="mt-8 flex justify-end">
                  <div className="border-2 border-slate-800 px-4 py-2 rounded font-sans rotate-[-2deg] select-none inline-block text-center">
                    <span className="text-[10px] font-extrabold uppercase text-slate-900 tracking-wider block">
                      AUDITED &amp; ENTERED INTO REGISTER
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 block">
                      EXAMINER OF TITLES: J. H. Miller, Esq.
                    </span>
                  </div>
                </div>

                {/* Page 2 Footer */}
                <div className="mt-10 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">PAGE 2 OF 3</span>
                    <span>•</span>
                    <span>Instrument #{instrumentNumber}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span>Grantor Initial: [_______]</span>
                    <span>Grantee Initial: [_______]</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    DIGITAL FINGERPRINT: #SHA256-48e89c...202
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PAGE 3 OF 3: SURVEYOR CERTIFICATION, EXECUTION & NOTARIAL JURAT */}
            {/* ========================================================================= */}
            {(activePage === "all" || activePage === "3") && (
              <div className="bg-[#fffefc] rounded-2xl shadow-xl border border-slate-300 p-8 md:p-14 font-serif text-slate-800 relative overflow-hidden transition-all duration-200">
                <div className="absolute inset-3 border border-slate-300/80 pointer-events-none rounded-xl" />
                <div className="absolute inset-4 border-2 border-slate-200/60 pointer-events-none rounded-lg" />

                {/* Running Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800 mb-8 font-sans text-xs text-slate-600">
                  <span className="font-extrabold uppercase tracking-wider text-slate-800">
                    MUNICIPAL LAND REGISTRY • SCHEDULE C
                  </span>
                  <span className="font-mono text-slate-500">
                    BOOK 4821 / PAGE 106 • INSTRUMENT #{instrumentNumber}
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-xl md:text-2xl font-bold tracking-wider text-slate-900 uppercase">
                    SCHEDULE C: SURVEYOR ATTESTATION, EXECUTION &amp; NOTARY JURAT
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-1 italic">
                    Formal execution, professional land surveyor certification, and acknowledgments
                  </p>
                </div>

                <div className="space-y-6 text-justify text-sm md:text-base leading-relaxed">
                  
                  {/* Subsection 3.1: Cadastral Surveyor's Certificate */}
                  <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/30 flex flex-col md:flex-row items-start gap-5">
                    {/* Surveyor Circular Blue Seal */}
                    <div className="w-20 h-20 rounded-full border-4 border-blue-900/80 bg-blue-100 flex flex-col items-center justify-center p-1 text-center shadow-xs shrink-0 select-none">
                      <ShieldCheck className="w-6 h-6 text-blue-900 mb-0.5" />
                      <span className="text-[6px] font-sans font-bold uppercase tracking-widest text-blue-950">
                        LICENSED SURVEYOR
                      </span>
                      <span className="text-[6px] font-sans text-blue-800">
                        NO. LS-44910
                      </span>
                    </div>

                    <div className="flex-1 text-xs md:text-sm font-sans text-slate-700 leading-relaxed">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-1">
                        Professional Cadastral Surveyor Attestation
                      </h4>
                      <p>
                        &quot;I hereby certify under penalty of statutory law that I am a Registered Professional Land Surveyor. I have personally surveyed and verified the boundary courses, corner monument pins, and perimeter dimensions of Cadastral Plan No. <strong>{property.legal.planNumber}</strong>, and certify that the physical site area equates precisely to <strong>{property.legal.siteArea}</strong>, more or less.&quot;
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Surveyed: October 2017</span>
                        <span>Certified Surveyor: Robert E. Thorne, P.L.S. #44910</span>
                      </div>
                    </div>
                  </div>

                  {/* Subsection 3.2: Formal Execution Signatures Block */}
                  <div className="mt-8 pt-4">
                    <p className="mb-6">
                      IN WITNESS WHEREOF, the Grantor, Registered Owner, and the Registrar of Titles have caused their hands and seals to be affixed to this instrument of title on the day and year first written above.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 font-sans">
                      {/* Signatory 1: Registered Owner */}
                      <div className="border border-slate-200 p-5 rounded-xl bg-white shadow-xs">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          REGISTERED OWNER / GRANTOR
                        </span>
                        <div className="font-bold text-slate-900 text-sm">{property.legal.ownership}</div>
                        {/* Authentic Handwritten Cursive Signature */}
                        <div className="my-3 py-2 border-b-2 border-slate-300 font-serif italic text-2xl text-blue-950 select-none tracking-wide">
                          Marcus Vance
                        </div>
                        <div className="text-xs text-slate-500">
                          By: Marcus Vance, Managing Trustee / Authorized Officer
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          Corporate Capacity Confirmed • Seal Affixed
                        </div>
                      </div>

                      {/* Signatory 2: Registrar of Titles */}
                      <div className="border border-slate-200 p-5 rounded-xl bg-white shadow-xs">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          GOVERNMENT REGISTRAR OF TITLES
                        </span>
                        <div className="font-bold text-slate-900 text-sm">Registry of Deeds Office</div>
                        {/* Authentic Handwritten Cursive Signature */}
                        <div className="my-3 py-2 border-b-2 border-slate-300 font-serif italic text-2xl text-red-950 select-none tracking-wide">
                          Eleanor Vance
                        </div>
                        <div className="text-xs text-slate-500">
                          Hon. Eleanor Vance, Registrar of Titles
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          Entered in Day Book Vol. 4821 Folio 104
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subsection 3.3: Notarial Jurat & Circular Embossed Notary Stamp */}
                  <div className="mt-8 p-6 rounded-xl border-2 border-amber-300/80 bg-amber-50/30 flex flex-col md:flex-row items-center gap-6">
                    {/* Official Circular Notary Stamp */}
                    <div className="w-24 h-24 rounded-full border-4 border-amber-900/90 bg-amber-100 flex flex-col items-center justify-center p-2 text-center shadow-sm shrink-0 select-none rotate-[-4deg]">
                      <div className="text-[7px] font-sans font-extrabold uppercase tracking-widest text-amber-950">
                        ★ NOTARY PUBLIC ★
                      </div>
                      <div className="w-8 h-[1px] bg-amber-900 my-0.5" />
                      <div className="text-[6px] font-sans font-bold text-amber-900 uppercase">
                        COMM. #NY-482910
                      </div>
                      <div className="text-[6px] font-sans text-amber-800">
                        EXP: OCT 14, 2028
                      </div>
                      <div className="text-[6px] font-sans font-extrabold text-amber-950 mt-0.5">
                        STATE OF RECORD
                      </div>
                    </div>

                    <div className="flex-1 font-sans text-xs text-slate-700 leading-relaxed space-y-1.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-amber-950">
                        OFFICIAL NOTARIAL JURAT &amp; ACKNOWLEDGMENT
                      </h4>
                      <p>
                        STATE OF RECORD, COUNTY OF METROPOLIS, ss: On this day, before me, Cynthia Brooks, a duly commissioned Notary Public, personally appeared the aforementioned signatories who proved to me on satisfactory evidence of identification to be the persons described in and who executed the foregoing legal instrument, and they acknowledged to me that they executed the same freely and voluntarily for the purposes therein expressed.
                      </p>
                      <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-slate-600">
                        <span>Notary Signature: <em className="font-serif text-sm font-bold text-blue-900">Cynthia Brooks</em></span>
                        <span>My Commission Expires: Oct 14, 2028</span>
                      </div>
                    </div>
                  </div>

                  {/* Red Certified True Copy Ribbon Badge */}
                  <div className="mt-6 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-red-700 bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider select-none shadow-xs">
                      <ShieldCheck className="w-4 h-4 text-red-700" />
                      <span>CERTIFIED TRUE &amp; CORRECT EXTRACT FROM THE REGISTER OF TITLES</span>
                    </div>
                  </div>
                </div>

                {/* Page 3 Footer */}
                <div className="mt-12 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">PAGE 3 OF 3</span>
                    <span>•</span>
                    <span>END OF OFFICIAL INSTRUMENT</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span>Registry Seal Affixed: [VERIFIED]</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    DIGITAL FINGERPRINT: #SHA256-48e89c...203
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Right Column - Extraction Summary & AI Mismatch Assistant */}
      <div className="w-80 shrink-0 border-l border-slate-200 bg-white h-full flex flex-col z-10 shadow-lg">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-lg">Extraction Summary</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Cross-referenced against official 3-page Title Deed</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Ownership */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Ownership</h3>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-sm">{property.legal.ownership}</div>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified • Page 1 of Deed</span>
              </div>
            </div>
          </div>

          {/* Site Area */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site Area Verification</h3>
            <div className={`bg-slate-50 border rounded-xl p-3.5 relative overflow-hidden shadow-2xs ${
              siteAreaMismatch ? "border-red-200 bg-red-50/40" : "border-slate-100"
            }`}>
              {siteAreaMismatch ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200 inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Mismatch
                    </span>
                    <button
                      type="button"
                      onClick={scrollToDiscrepancy}
                      className="text-[10px] text-red-700 hover:underline font-semibold cursor-pointer"
                    >
                      View on Page 1 →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-white p-2 rounded-lg border border-red-200">
                      <div className="text-[10px] font-semibold text-slate-500 mb-0.5">LEGAL DEED (P.1)</div>
                      <div className="font-extrabold text-emerald-700 text-base">{siteAreaMismatch.source1.value}</div>
                      <span className="text-[9px] text-emerald-600 font-medium">Cadastral Survey</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-red-200">
                      <div className="text-[10px] font-semibold text-slate-500 mb-0.5">LISTING SPECS</div>
                      <div className="font-extrabold text-red-700 text-base">{siteAreaMismatch.source2.value}</div>
                      <span className="text-[9px] text-red-600 font-medium">Unverified Claim</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-slate-900 text-base">{property.legal.siteArea}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-700 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Exact Match with Cadastral Survey</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Encumbrances */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Encumbrances &amp; Liens</h3>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-800">
                {property.legal.encumbrances.length} Registered Memorial(s)
              </div>
              <div className="text-[11px] text-slate-600 space-y-1">
                {property.legal.encumbrances.map((e, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-200/60 pb-1 last:border-b-0 last:pb-0">
                    <span className="font-medium text-slate-700 truncate">{e.type}</span>
                    <span className="font-mono text-[10px] text-slate-500">{e.registeredDate}</span>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 font-medium pt-1">
                Verified from Schedule B (Page 2)
              </div>
            </div>
          </div>

          {/* Quick Property Navigation */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href={`/property/${property.id}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <span>Return to Property Overview</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* AI Suggestion Card */}
        {siteAreaMismatch && (
          <div className="p-4 m-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs">
            <div className="flex items-start gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-xs text-emerald-950 block">AI Discrepancy Insight</span>
                <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                  The Cadastral Survey on Page 1 certifies <strong>{siteAreaMismatch.source1.value}</strong>, but the marketing listing advertises <strong>{siteAreaMismatch.source2.value}</strong>.
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => {
                alert(`Drafting inquiry to listing agent regarding ${property.name} site area mismatch: Title Deed certifies ${siteAreaMismatch.source1.value} vs Listing ${siteAreaMismatch.source2.value}.`);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5 px-3 text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
            >
              Draft Inquiry to Listing Agent
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
