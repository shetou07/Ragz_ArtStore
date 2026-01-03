
import { Artwork, Artist } from './types';

export const ARTISTS: Artist[] = [
  {
    id: 'aline-keza',
    name: 'Aline Keza',
    location: 'Kigali, Rwanda',
    biography: "Born in Musanze in 1994, Aline is a pioneer in modernizing Imigongo patterns. She merges traditional Rwandan geometric aesthetics with contemporary abstract expressionism. Her work has been exhibited at the Kigali Cultural Village and internationally in Brussels.",
    statement: "My work is a dialogue between the hills of my childhood and the digital pulse of modern Kigali. I use the geometry of our ancestors to map the future of our people.",
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200',
    born: '1994, Musanze',
    education: 'University of Rwanda, Creative Arts',
    representation: 'Inema Arts Center',
    featured: true
  },
  {
    id: 'jean-habimana',
    name: 'Jean Habimana',
    location: 'Rubavu, Rwanda',
    biography: 'A landscape photographer focused on the mist-covered peaks of the Virunga Mountains and the serene life along Lake Kivu.',
    statement: 'Capturing the thousand shades of green in our hills.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  }
];

export const ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Imigongo Rhythms',
    artist: 'Aline Keza',
    artistId: 'aline-keza',
    price: 650000,
    category: 'Paintings',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    description: 'A contemporary take on traditional Imigongo patterns, using acrylics to create depth and texture.',
    medium: 'Acrylic on Canvas',
    dimensions: '100 x 100 cm',
    year: '2023',
    status: 'Available',
    dateAdded: 'Oct 24, 2023'
  },
  {
    id: '2',
    title: 'Mist Over Bisoke',
    artist: 'Jean Habimana',
    artistId: 'jean-habimana',
    price: 320000,
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800',
    description: 'Early morning light hitting the crater lake of Mount Bisoke.',
    medium: 'Digital Photography',
    dimensions: '60 x 90 cm',
    year: '2022',
    status: 'Available',
    dateAdded: 'Oct 23, 2023'
  },
  {
    id: '3',
    title: 'Kigali Heights',
    artist: 'Divine Uwase',
    artistId: 'divine-uwase',
    price: 450000,
    category: 'Digital',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    description: 'A digital illustration showcasing the vibrant night life and architecture of Kimihurura.',
    medium: 'Digital Illustration',
    dimensions: '50 x 50 cm',
    year: '2023',
    status: 'Available',
    dateAdded: 'Oct 22, 2023'
  },
  {
    id: '4',
    title: 'Inyambo Elegance',
    artist: 'Innocent Ganza',
    artistId: 'innocent-ganza',
    price: 1200000,
    category: 'Sculpture',
    imageUrl: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=800',
    description: 'A bronze sculpture celebrating the majestic horns and grace of the traditional Inyambo cattle.',
    medium: 'Polished Bronze',
    dimensions: '40 x 60 x 20 cm',
    year: '2023',
    status: 'Available',
    dateAdded: 'Oct 21, 2023'
  }
];
