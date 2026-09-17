import { Mail, Phone, Building } from 'lucide-react';
import { getMembers } from '@/lib/db';

export const metadata = {
  title: 'Directory - CDA Theater Alliance',
  description: 'Directory of members and arts professionals in the CDA Theater Alliance.',
};

export default async function DirectoryPage() {
  const members = await getMembers();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-stone-100 mb-4">Member Directory</h1>
      <p className="text-stone-400 mb-8">
        Connect with local arts professionals in the CDA Theater Alliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-6 bg-stone-900/50 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors"
          >
            <h2 className="text-xl font-semibold text-stone-100 mb-1">{member.name}</h2>
            <p className="text-amber-500 text-sm mb-3">{member.role}</p>
            
            {member.organization && (
              <div className="flex items-center space-x-2 text-stone-400 text-sm mb-3">
                <Building className="h-4 w-4" />
                <span>{member.organization}</span>
              </div>
            )}
            
            {member.bio && (
              <p className="text-stone-400 text-sm mb-4">{member.bio}</p>
            )}
            
            <div className="space-y-2 text-sm">
              {member.email && (
                <a 
                  href={`mailto:${member.email}`} 
                  className="flex items-center space-x-2 text-stone-300 hover:text-amber-500 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </a>
              )}
              {member.phone && (
                <div className="flex items-center space-x-2 text-stone-300">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}