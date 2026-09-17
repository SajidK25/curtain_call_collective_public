'use client';

import { useState, useMemo } from 'react';
import { MapPin, Clock, ExternalLink, FileText } from 'lucide-react';
import type { Audition, Organization } from '@/lib/types';

interface AuditionsClientProps {
  auditions: Audition[];
  organizations: Organization[];
}

export function AuditionsClient({ auditions, organizations }: AuditionsClientProps) {
  const [selectedOrg, setSelectedOrg] = useState<string>('all');

  const filteredAuditions = useMemo(() => {
    if (selectedOrg === 'all') return auditions;
    return auditions.filter((a) => a.organizationId === selectedOrg);
  }, [auditions, selectedOrg]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
          className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Organizations</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {filteredAuditions.length === 0 ? (
        <p className="text-center text-stone-400 py-12">No upcoming auditions found.</p>
      ) : (
        <div className="space-y-4">
          {filteredAuditions.map((audition) => (
            <div
              key={audition.id}
              className="flex flex-col md:flex-row md:items-start gap-4 p-6 bg-stone-900/50 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex-shrink-0 text-center p-4 bg-amber-900/20 rounded-lg min-w-[100px]">
                <div className="text-amber-500 text-lg font-bold">
                  {audition.date}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-stone-100">{audition.showTitle}</h3>
                <p className="text-amber-500 text-sm mt-1">{audition.organizationName}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                    {audition.role}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-stone-400">
                  {audition.time !== 'TBD' && (
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{audition.time}</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{audition.location}</span>
                  </span>
                </div>
                {audition.requirements && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-stone-400">
                    <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{audition.requirements}</span>
                  </div>
                )}
              </div>

              <a
                href={audition.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg transition-colors self-start"
              >
                <span>Register</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}