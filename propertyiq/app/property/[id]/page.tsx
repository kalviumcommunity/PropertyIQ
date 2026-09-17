import { notFound } from "next/navigation";
import { getPropertyById } from "@/data/properties";
import PropertyDetailView from "@/components/PropertyDetailView";

export default async function PropertyOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailView property={property} />;
}
