import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Prioritize verified badge on top of the image
  const sortedBadges = [...(property.dashboardBadges || [])].sort((a, b) => {
    if (a.type === 'success' && b.type !== 'success') return -1;
    if (b.type === 'success' && a.type !== 'success') return 1;
    return 0;
  });

  const firstBadge = sortedBadges[0];
  const remainingBadges = sortedBadges.slice(1);

  const badgeColorMap: Record<string, string> = {
    success: "bg-emerald-600 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-slate-900/80 text-white backdrop-blur-xs",
  };

  return (
    <Link 
      href={`/property/${property.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      <div className="relative h-48 w-full bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.listing.images[0]?.url}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {firstBadge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 ${badgeColorMap[firstBadge.type] || "bg-gray-700 text-white"}`}>
            {firstBadge.type === 'success' && <ShieldCheck className="w-3.5 h-3.5" />}
            <span>{firstBadge.label}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-emerald-700 transition-colors">{property.name}</h3>
          <span className="font-mono font-bold text-gray-900 shrink-0 ml-2 text-base">{property.price}</span>
        </div>
        <div className="flex items-start gap-1.5 mt-1.5 text-gray-500">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
          <p className="text-sm line-clamp-1">{property.address}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1.5">
          {remainingBadges.map((badge, idx) => {
            const isSuccess = badge.type === 'success';
            const isInfo = badge.type === 'info';
            return (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                  isSuccess
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                    : isInfo
                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
