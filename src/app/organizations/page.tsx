import Link from 'next/link';
import { ExternalLink, Calendar } from 'lucide-react';
import { getOrganizations } from '@/lib/db';

export const metadata = {
  title: 'Organizations - CDA Theater Alliance',
  description: 'Directory of arts organizations in the CDA Theater Alliance.',
};

export default async function OrganizationsPage() {
  const organizations = await getOrganizations();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Member Organizations</h1>
      <p className="text-stone-400 mb-8">
        Explore the arts organizations that make up the CDA Theater Alliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-6 bg-stone-900/50 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-stone-100 mb-2">{org.name}</h2>
            <p className="text-stone-400 mb-4">{org.description}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={org.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Website</span>
              </a>
              {org.showsUrl && org.showsUrl !== org.websiteUrl && (
                <Link
                  href={org.showsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 border border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-500 rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Upcoming Shows</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}