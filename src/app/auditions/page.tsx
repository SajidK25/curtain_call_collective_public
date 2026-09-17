import { getAuditions, getOrganizations } from '@/lib/db';
import { AuditionsClient } from '@/components/features/AuditionsClient';

export const metadata = {
  title: 'Auditions - CDA Theater Alliance',
  description: 'Find upcoming audition opportunities for local theater productions.',
};

export default async function AuditionsPage() {
  const [auditions, organizations] = await Promise.all([
    getAuditions(),
    getOrganizations(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Upcoming Auditions</h1>
      <p className="text-stone-400 mb-8">
        Find audition opportunities for local theater productions.
      </p>
      <AuditionsClient auditions={auditions} organizations={organizations} />
    </div>
  );
}