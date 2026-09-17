import { notFound } from "next/navigation";
import { getPropertyById } from "@/data/properties";
import LegalDocumentView from "@/components/LegalDocumentView";

export default async function DocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <LegalDocumentView property={property} />;
}
