'use client';

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Calendar as CalendarIcon, List, MapPin, Clock, ExternalLink } from 'lucide-react';
import type { Event, Organization } from '@/lib/types';

interface EventsClientProps {
  events: Event[];
  organizations: Organization[];
}

export function EventsClient({ events, organizations }: EventsClientProps) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => new Date(e.date) >= now)
      .filter((e) => selectedOrg === 'all' || e.organizationId === selectedOrg)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedOrg]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const startDayOffset = start.getDay();
    const offsetDays = Array(startDayOffset).fill(null);
    return [...offsetDays, ...days];
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    filteredEvents.forEach((event) => {
      const key = event.date;
      const existing = map.get(key) || [];
      map.set(key, [...existing, event]);
    });
    return map;
  }, [filteredEvents]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'list' ? 'bg-amber-600 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <List className="h-4 w-4" />
            <span>List</span>
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'calendar' ? 'bg-amber-600 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar</span>
          </button>
        </div>

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

      {view === 'list' ? (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-stone-400 py-12">No upcoming events found.</p>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-stone-900/50 rounded-lg border border-stone-800 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex-shrink-0 text-center p-4 bg-amber-900/20 rounded-lg min-w-[100px]">
                  <div className="text-amber-500 text-lg font-bold">
                    {format(new Date(event.date + 'T00:00:00'), 'MMM d')}
                  </div>
                  <div className="text-stone-400 text-sm">
                    {format(new Date(event.date + 'T00:00:00'), 'EEEE')}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-100">{event.title}</h3>
                  <p className="text-amber-500 text-sm mt-1">{event.organizationName}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-stone-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                </div>

                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium rounded-lg transition-colors self-start"
                >
                  <span>Tickets</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-stone-900/50 rounded-lg border border-stone-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-stone-800 rounded-lg transition-colors text-stone-300"
            >
              ←
            </button>
            <h3 className="text-xl font-semibold text-stone-100">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-stone-800 rounded-lg transition-colors text-stone-300"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-stone-500 py-2">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="min-h-[100px]" />;
              }
              const dayEvents = eventsByDate.get(format(day, 'yyyy-MM-dd')) || [];
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const today = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[100px] p-2 rounded-lg border ${
                    isCurrentMonth ? 'bg-stone-800/50' : 'bg-stone-900/30'
                  } ${today ? 'border-amber-500' : 'border-stone-700'}`}
                >
                  <div className={`text-sm font-medium mb-1 ${today ? 'text-amber-500' : 'text-stone-400'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs truncate text-stone-300 bg-stone-700/50 px-1 py-0.5 rounded"
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-stone-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}