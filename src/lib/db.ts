import type { Event, Organization, Space, Member, Rental, Audition } from './types';
import eventsData from './data/events.json';
import organizationsData from './data/organizations.json';
import spacesData from './data/spaces.json';
import membersData from './data/members.json';
import auditionsData from './data/auditions.json';

const events = eventsData as Event[];
const organizations = organizationsData as Organization[];
const spaces = spacesData as Space[];
const members = membersData as Member[];
const auditions = auditionsData as Audition[];

export async function getEvents(): Promise<Event[]> {
  return events;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  return events.find((e) => e.id === id);
}

export async function getEventsByOrganization(organizationId: string): Promise<Event[]> {
  return events.filter((e) => e.organizationId === organizationId);
}

export async function getOrganizations(): Promise<Organization[]> {
  return organizations;
}

export async function getOrganizationById(id: string): Promise<Organization | undefined> {
  return organizations.find((o) => o.id === id);
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | undefined> {
  return organizations.find((o) => o.slug === slug);
}

export async function getSpaces(): Promise<Space[]> {
  return spaces;
}

export async function getSpaceById(id: string): Promise<Space | undefined> {
  return spaces.find((s) => s.id === id);
}

export async function getMembers(): Promise<Member[]> {
  return members;
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  return members.find((m) => m.id === id);
}

export async function getRentals(): Promise<Rental[]> {
  return [];
}

export async function getAuditions(): Promise<Audition[]> {
  return auditions;
}

export async function getAuditionById(id: string): Promise<Audition | undefined> {
  return auditions.find((a) => a.id === id);
}

export async function getAuditionsByOrganization(organizationId: string): Promise<Audition[]> {
  return auditions.filter((a) => a.organizationId === organizationId);
}