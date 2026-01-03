
import { createClient } from '@supabase/supabase-js';

// Fallbacks prevent the 'supabaseUrl is required' crash during module load.
// The App will handle the resulting fetch errors and fall back to mock data.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
