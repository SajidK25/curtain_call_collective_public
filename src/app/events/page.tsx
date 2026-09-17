import { getEvents, getOrganizations } from '@/lib/db';
import { EventsClient } from '@/components/features/EventsClient';

export const metadata = {
  title: 'Events - CDA Theater Alliance',
  description: 'Browse upcoming theater performances and events from local arts organizations.',
};

export default async function EventsPage() {
  const [events, organizations] = await Promise.all([
    getEvents(),
    getOrganizations(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Upcoming Events</h1>
      <p className="text-stone-400 mb-8">
        Discover performances from all our member organizations.
      </p>
      <EventsClient events={events} organizations={organizations} />
    </div>
  );
}