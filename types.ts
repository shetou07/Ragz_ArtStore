
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  category: 'Paintings' | 'Photography' | 'Digital' | 'Sculpture' | 'All Art';
  image_url: string; // Standardized to match Supabase column naming
  description: string;
  medium: string;
  dimensions: string;
  year: string;
  status: 'Available' | 'Sold' | 'Reserved' | 'Pending Review';
  dateAdded: string;
}

export interface Artist {
  id: string;
  name: string;
  location: string;
  biography: string;
  statement: string;
  avatarUrl: string;
  featured?: boolean;
  born?: string;
  education?: string;
  representation?: string;
}

export type ViewType = 'Gallery' | 'Detail' | 'Artist' | 'Contact' | 'AdminLogin' | 'AdminDashboard' | 'AdminUpload';
