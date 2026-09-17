"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, HelpCircle, Plus } from "lucide-react";

interface SidebarProps {
  propertyId?: string;
}

export default function Sidebar({ propertyId }: SidebarProps) {
  const pathname = usePathname();

  const overviewLink = propertyId ? `/property/${propertyId}` : "/";
  const documentsLink = propertyId ? `/property/${propertyId}/documents` : "#";

  const isOverviewActive = propertyId
    ? pathname === `/property/${propertyId}`
    : pathname === "/";
  const isDocumentsActive = !!propertyId && pathname === documentsLink;

  return (
    <div className="w-60 bg-[#1a2332] h-full flex flex-col text-slate-400 shrink-0">
      {/* Branding */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
            PI
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">Proton Integrity</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Analysis Engine</div>
          </div>
        </div>
        <Link
          href="/"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-sm shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          New Analysis
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 flex flex-col gap-0.5 px-2">
        <Link
          href={overviewLink}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isOverviewActive
              ? "bg-slate-800/80 text-emerald-400"
              : "hover:bg-slate-800/50 hover:text-slate-200"
          }`}
        >
          {isOverviewActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-400" />
          )}
          <LayoutGrid className="w-5 h-5" />
          Overview
        </Link>
        <Link
          href={documentsLink}
          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            !propertyId
              ? "opacity-40 cursor-not-allowed"
              : isDocumentsActive
              ? "bg-slate-800/80 text-emerald-400"
              : "hover:bg-slate-800/50 hover:text-slate-200"
          }`}
          onClick={(e) => !propertyId && e.preventDefault()}
        >
          {isDocumentsActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-400" />
          )}
          <FileText className="w-5 h-5" />
          Documents
        </Link>
      </div>

      {/* Help */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          type="button"
          onClick={() => alert("PropertyIQ Help & Documentation\n\n- Click on any property card to view intelligence analysis\n- Ask the PropertyIQ Assistant questions in natural language\n- View the Documents tab to verify original legal sources & discrepancies")}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors w-full text-left"
        >
          <HelpCircle className="w-5 h-5" />
          Help
        </button>
      </div>
    </div>
  );
}
