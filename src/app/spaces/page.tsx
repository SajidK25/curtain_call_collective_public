import { MapPin, Phone, Mail, Globe, Users } from 'lucide-react';
import { getSpaces } from '@/lib/db';

export const metadata = {
  title: 'Spaces - CDA Theater Alliance',
  description: 'Directory of rehearsal and theater spaces in North Idaho.',
};

export default async function SpacesPage() {
  const spaces = await getSpaces();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Theater Spaces</h1>
      <p className="text-stone-400 mb-8">
        Find rehearsal and performance venues in the Coeur d&apos;Alene area.
      </p>

      <div className="space-y-6">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="flex flex-col md:flex-row gap-6 p-6 bg-stone-900/50 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-semibold text-stone-100">{space.name}</h2>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  space.type === 'theater' ? 'bg-amber-500/20 text-amber-500' :
                  space.type === 'rehearsal' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
                </span>
              </div>
              
              {space.description && (
                <p className="text-stone-400 mb-4">{space.description}</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2 text-stone-300">
                  <MapPin className="h-4 w-4 mt-1 text-amber-500 flex-shrink-0" />
                  <span>{space.address}, {space.city}, {space.state} {space.zip}</span>
                </div>
                
                {space.phone && (
                  <div className="flex items-center space-x-2 text-stone-300">
                    <Phone className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span>{space.phone}</span>
                  </div>
                )}
                
                {space.email && (
                  <div className="flex items-center space-x-2 text-stone-300">
                    <Mail className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <a href={`mailto:${space.email}`} className="hover:text-amber-500 transition-colors">
                      {space.email}
                    </a>
                  </div>
                )}
                
                {space.website && (
                  <div className="flex items-center space-x-2 text-stone-300">
                    <Globe className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <a href={space.website} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                      Visit Website
                    </a>
                  </div>
                )}
                
                {space.capacity && (
                  <div className="flex items-center space-x-2 text-stone-300">
                    <Users className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span>Capacity: {space.capacity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}