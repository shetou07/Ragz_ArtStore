
import { createClient } from '@supabase/supabase-js';

// Fallbacks prevent the 'supabaseUrl is required' crash during module load.
// The App will handle the resulting fetch errors and fall back to mock data.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);