"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import PropertyCard from '@/components/PropertyCard';
import { useSearch } from '@/components/SearchContext';
import { getAllProperties } from '@/data/properties';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  X, 
  Search, 
  RotateCcw, 
  ArrowUpNarrowWide, 
  ArrowDownNarrowWide
} from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function DashboardPage() {
  const allProperties = useMemo(() => getAllProperties(), []);
  const { searchQuery, setSearchQuery } = useSearch();
  
  // State
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Dropdown states
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract all unique tags and count occurrences
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProperties.forEach((property) => {
      property.dashboardBadges?.forEach((badge) => {
        counts[badge.label] = (counts[badge.label] || 0) + 1;
      });
    });
    return counts;
  }, [allProperties]);

  // Prioritize "Verified" and "All Verified" at the beginning of the tags list
  const uniqueTags = useMemo(() => {
    const allTags = Object.keys(tagCounts);
    const priority = ['All Verified', 'Verified', 'Perfect Title'];
    const sorted = [
      ...priority.filter((tag) => allTags.includes(tag)),
      ...allTags.filter((tag) => !priority.includes(tag)).sort()
    ];
    return sorted;
  }, [tagCounts]);

  // Filter and Sort properties to display below
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...allProperties];

    // 1. Tag filter
    if (selectedTag !== 'all') {
      result = result.filter((property) =>
        property.dashboardBadges?.some((badge) => badge.label.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // 2. Search query filter from TopBar
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((property) =>
        property.name.toLowerCase().includes(q) ||
        property.address.toLowerCase().includes(q) ||
        property.id.toLowerCase().includes(q) ||
        property.type.toLowerCase().includes(q) ||
        property.listing.assetType.toLowerCase().includes(q) ||
        property.dashboardBadges?.some((b) => b.label.toLowerCase().includes(q))
      );
    }

    // 3. Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => (b.priceNumeric || 0) - (a.priceNumeric || 0));
    }

    return result;
  }, [allProperties, selectedTag, searchQuery, sortOption]);

  const getSortLabel = () => {
    switch (sortOption) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      default:
        return 'Sort';
    }
  };

  const handleResetFilters = () => {
    setSelectedTag('all');
    setSortOption('default');
    setSearchQuery('');
    setIsFilterOpen(false);
    setIsSortOpen(false);
  };

  const hasActiveFilters = selectedTag !== 'all' || sortOption !== 'default' || searchQuery.trim() !== '';

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header Section: Discovery Dashboard + Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Discovery Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">
              AI-verified property intelligence & risk assessment •{' '}
              <span className="font-semibold text-gray-700">{filteredAndSortedProperties.length}</span> of {allProperties.length} properties
            </p>
          </div>

          {/* Action Toolbar: Filter & Sort */}
          <div className="flex items-center gap-3">
            {/* Filter Dropdown Button */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsSortOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 border rounded-xl text-sm font-medium shadow-xs transition-all cursor-pointer ${
                  selectedTag !== 'all'
                    ? 'border-emerald-500 text-emerald-700 bg-emerald-50 ring-1 ring-emerald-500 font-semibold'
                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filter</span>
                {selectedTag !== 'all' && (
                  <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[11px] font-bold">
                    1
                  </span>
                )}
              </button>

              {/* Filter Dropdown Menu */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Filter by Tag / Status
                    </span>
                    {selectedTag !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedTag('all')}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTag('all');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                        selectedTag === 'all'
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>All Properties</span>
                      <span className="text-xs text-gray-400">({allProperties.length})</span>
                    </button>

                    {uniqueTags.map((tag) => {
                      const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
                      const isVerifiedType = tag.toLowerCase().includes('verified') || tag.toLowerCase().includes('title');
                      
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSelectedTag(tag);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-800 font-semibold'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isVerifiedType ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-blue-400" />
                            )}
                            <span>{tag}</span>
                          </div>
                          <span className="text-xs text-gray-400">({tagCounts[tag]})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown Button */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsFilterOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 border rounded-xl text-sm font-medium shadow-xs transition-all cursor-pointer ${
                  sortOption !== 'default'
                    ? 'border-emerald-500 text-emerald-700 bg-emerald-50 ring-1 ring-emerald-500 font-semibold'
                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <ArrowUpDown className="w-4 h-4 text-emerald-600" />
                <span>{getSortLabel()}</span>
              </button>

              {/* Sort Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                    Sort By Price
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSortOption('default');
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                      sortOption === 'default'
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>Featured (Default)</span>
                    {sortOption === 'default' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSortOption('price-asc');
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                      sortOption === 'price-asc'
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowUpNarrowWide className="w-4 h-4 text-emerald-600" />
                      <span>Lowest to Highest</span>
                    </div>
                    {sortOption === 'price-asc' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSortOption('price-desc');
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                      sortOption === 'price-desc'
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowDownNarrowWide className="w-4 h-4 text-emerald-600" />
                      <span>Highest to Lowest</span>
                    </div>
                    {sortOption === 'price-desc' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Reset All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                title="Reset all filters, search, and sorting"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Tag Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 pt-1 scrollbar-none text-sm">
          <button
            type="button"
            onClick={() => setSelectedTag('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
              selectedTag === 'all'
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({allProperties.length})
          </button>

          {uniqueTags.map((tag) => {
            const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
            const count = tagCounts[tag];
            const isVerified = tag.toLowerCase().includes('verified') || tag.toLowerCase().includes('title');

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isSelected ? 'all' : tag)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-1 ring-emerald-600 font-semibold'
                    : isVerified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/70'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isVerified && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                <span>{tag}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-emerald-700/60 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TopBar Search Active Feedback Banner */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5 mb-6 text-sm animate-in fade-in duration-100">
            <div className="flex items-center gap-2 text-emerald-900">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>
                Search results for <strong className="font-semibold text-emerald-950">&quot;{searchQuery}&quot;</strong>{' '}
                ({filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'} found)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Properties Grid Listed Below */}
        {filteredAndSortedProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No properties found</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any properties matching &quot;{searchQuery || selectedTag}&quot;.
              Try another search term or reset your filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
