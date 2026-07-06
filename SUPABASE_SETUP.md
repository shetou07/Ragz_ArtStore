# Supabase Setup for Ragz_ArtStore

This project expects a Supabase project with the following items configured:

1. `art-assets` storage bucket
2. `artists` table
3. `artworks` table
4. optional RLS policy for anonymous inserts (if using `VITE_SUPABASE_ANON_KEY`)

## 1. Create the Storage Bucket

In the Supabase dashboard:
- Go to Storage
- Create a bucket named `art-assets`
- Set it to public if you want `getPublicUrl()` to work without signed URLs

## 2. Create the `artists` table

Run this SQL in the Supabase SQL editor:

```sql
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  biography text,
  statement text,
  avatarUrl text,
  featured boolean default false,
  born text,
  education text,
  representation text
);
```

## 3. Create the `artworks` table

Run this SQL in the Supabase SQL editor:

```sql
create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  artistId uuid not null,
  price numeric,
  category text,
  image_url text,
  description text,
  medium text,
  dimensions text,
  year text,
  status text,
  dateAdded timestamptz default now()
);
```

## 4. Supabase policies

The app currently uses the anon client key for reads and writes, so you need Row Level Security policies on both tables.

### Enable RLS and allow anonymous read access

```sql
alter table public.artists enable row level security;
create policy "Allow anonymous select on artists"
  on public.artists
  for select
  using (true);

alter table public.artworks enable row level security;
create policy "Allow anonymous select on artworks"
  on public.artworks
  for select
  using (true);
```
s
### Basic anonymous insert policy for `artworks`

```sql
create policy "Allow anonymous insert on artworks"
  on public.artworks
  for insert
  with check (true);
```

> Note: This is the simplest route for the current browser-based admin flow, but it is not ideal for production.

### Safer authenticated insert policy

If you later add Supabase Auth and want more security, use:

```sql
create policy "Allow authenticated insert"
  on public.artworks
  for insert
  with check (auth.uid() is not null);
```

Then your client must sign in and use the authenticated session instead of anon access.

## 5. Optional sample data

You can seed the `artists` table with example rows so the admin upload form has artists to choose from.

```sql
insert into public.artists (name, location, biography, statement, avatarUrl) values
('Elena Vora', 'Kigali, Rwanda', 'Contemporary painter blending modern and traditional forms.', 'My work explores memory through color and texture.', 'https://example.com/avatar1.jpg'),
('Samir Mutesa', 'Musanze, Rwanda', 'Photographer chronicling everyday life in Rwanda.', 'Light and shadow are my tools for storytelling.', 'https://example.com/avatar2.jpg');
```

## 6. Verify the connection

After creating the tables, the app should be able to fetch and display data in the gallery.
If you still see errors, check the browser console and the Supabase SQL editor for policy denial or missing columns.
