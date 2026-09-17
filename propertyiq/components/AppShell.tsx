"use client";
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { SearchProvider } from './SearchContext';

export default function AppShell({ children, propertyId }: { children: React.ReactNode; propertyId?: string }) {
  return (
    <SearchProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar propertyId={propertyId} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
