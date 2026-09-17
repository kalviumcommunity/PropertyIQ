"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, User, X, MapPin, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { useSearch } from "./SearchContext";
import { getAllProperties, Property } from "@/data/properties";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allProperties = getAllProperties();

  // Autocomplete matching properties
  const matches = searchQuery.trim()
    ? allProperties.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.listing.assetType.toLowerCase().includes(q) ||
          p.dashboardBadges?.some((b) => b.label.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected index when matches change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!matches.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = selectedIndex >= 0 ? matches[selectedIndex] : matches[0];
      if (target) {
        setIsFocused(false);
        router.push("/property/" + target.id);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-30">
      <div className="flex items-center gap-8 flex-1">
        <Link href="/" className="font-bold text-xl text-gray-800 shrink-0 hover:opacity-90 transition-opacity">
          PropertyIQ <span className="text-emerald-500">AI</span>
        </Link>

        {/* Global Search Bar with Autocomplete */}
        <div className="max-w-xl w-full relative" ref={dropdownRef}>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-emerald-600" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsFocused(true);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-9 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:text-sm transition-all shadow-xs"
            placeholder="Search houses, mansions, penthouses, or ID..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-200/60 cursor-pointer transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete Dropdown List */}
          {isFocused && searchQuery.trim() && matches.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-98 duration-100 overflow-hidden">
              <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 flex items-center justify-between">
                <span>Matching Properties</span>
                <span className="text-[10px] text-gray-400 font-normal">
                  Click or press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-[9px]">Enter ↵</kbd>
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {matches.map((property, idx) => {
                  const isHighlighted = idx === selectedIndex;
                  return (
                    <Link
                      key={property.id}
                      href={`/property/${property.id}`}
                      onClick={() => setIsFocused(false)}
                      className={`px-3.5 py-2.5 transition-colors flex items-center justify-between cursor-pointer group ${
                        isHighlighted ? "bg-emerald-50" : "hover:bg-emerald-50/70"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={property.listing.images[0]?.url}
                          alt={property.name}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-gray-100 shadow-xs"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 truncate transition-colors">
                              {property.name}
                            </span>
                            <span className="px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded text-[10px] font-mono">
                              {property.id}
                            </span>
                            {property.dashboardBadges?.some(b => b.type === 'success') && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[10px] font-semibold">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
                            <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                            <span>{property.listing.assetType}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate">{property.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-3 flex items-center gap-2">
                        <div>
                          <div className="text-xs font-mono font-bold text-gray-900">{property.price}</div>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 justify-end group-hover:underline">
                            Open <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={() => alert("No new notifications")}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => alert("Settings - PropertyIQ AI v1.0")}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:ring-2 hover:ring-emerald-500 cursor-pointer transition-all">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
