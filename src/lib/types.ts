export interface Organization {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  showsUrl?: string;
  logoUrl?: string;
  description?: string;
}

export interface Event {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  date: string; // ISO date string
  time: string;
  location: string;
  address: string;
  ticketUrl: string;
}

export interface Space {
  id: string;
  name: string;
  type: 'rehearsal' | 'theater' | 'both';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;
  website?: string;
  capacity?: number;
  description?: string;
  hourlyRate?: number;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  organization?: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
}

export interface Rental {
  id: string;
  category: 'costume' | 'prop' | 'set';
  name: string;
  description?: string;
  available: boolean;
  organizationId?: string;
  imageUrl?: string;
  dailyRate?: number;
}

export interface Audition {
  id: string;
  organizationId: string;
  organizationName: string;
  showTitle: string;
  role: string;
  date: string;
  time: string;
  location: string;
  address: string;
  requirements?: string;
  registrationUrl: string;
}