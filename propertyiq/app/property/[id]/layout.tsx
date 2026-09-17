import AppShell from '@/components/AppShell';

export default async function PropertyLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AppShell propertyId={id}>{children}</AppShell>;
}
