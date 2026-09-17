import Link from 'next/link';
import { Theater, Calendar, Users, Building, ShoppingBag } from 'lucide-react';
import { getEvents, getOrganizations } from '@/lib/db';

export default async function HomePage() {
  const [events, organizations] = await Promise.all([
    getEvents(),
    getOrganizations(),
  ]);

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Theater className="h-20 w-20 text-amber-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-100 mb-6">
            The CDA Theater Alliance
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
            A consortium of arts organizations in North Idaho, uniting theater groups, 
            performers, and creative professionals to celebrate and support the local arts scene.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-stone-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-100 mb-10 text-center">
            Our Member Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {organizations.map((org) => (
              <Link
                key={org.id}
                href={org.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-stone-800/50 rounded-lg border border-stone-700 hover:border-amber-500/50 hover:bg-stone-800 transition-all group"
              >
                <h3 className="text-lg font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
                  {org.name}
                </h3>
                <p className="mt-2 text-sm text-stone-400 line-clamp-2">
                  {org.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-100 mb-10 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 bg-stone-900/50 rounded-lg border border-stone-800"
              >
                <div className="text-amber-500 text-sm font-medium mb-2">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-1">
                  {event.title}
                </h3>
                <p className="text-stone-400 text-sm mb-2">{event.organizationName}</p>
                <p className="text-stone-500 text-sm">
                  {event.time} • {event.location}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-stone-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-100 mb-10 text-center">
            Explore Our Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/events"
              className="flex items-start space-x-4 p-6 bg-stone-800/50 rounded-lg border border-stone-700 hover:border-amber-500/50 transition-all group"
            >
              <Calendar className="h-10 w-10 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-lg font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
                  Events
                </h3>
                <p className="text-stone-400 text-sm mt-1">
                  Browse upcoming shows and performances
                </p>
              </div>
            </Link>
            <Link
              href="/spaces"
              className="flex items-start space-x-4 p-6 bg-stone-800/50 rounded-lg border border-stone-700 hover:border-amber-500/50 transition-all group"
            >
              <Building className="h-10 w-10 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-lg font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
                  Spaces
                </h3>
                <p className="text-stone-400 text-sm mt-1">
                  Find rehearsal and performance venues
                </p>
              </div>
            </Link>
            <Link
              href="/directory"
              className="flex items-start space-x-4 p-6 bg-stone-800/50 rounded-lg border border-stone-700 hover:border-amber-500/50 transition-all group"
            >
              <Users className="h-10 w-10 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-lg font-semibold text-stone-100 group-hover:text-amber-500 transition-colors">
                  Directory
                </h3>
                <p className="text-stone-400 text-sm mt-1">
                  Connect with local arts professionals
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-stone-100 mb-4">
            Rentals Coming Soon
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto mb-6">
            We&apos;re building a resource for renting costumes, props, and sets from our member organizations.
            Check back soon!
          </p>
          <Link
            href="/rentals"
            className="inline-block px-6 py-3 border border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-500 font-medium rounded-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}