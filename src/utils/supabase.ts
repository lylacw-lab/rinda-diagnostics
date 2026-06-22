import { createClient } from "@supabase/supabase-js";

// Safely pull the cloud environment keys we will configure in Phase 4
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Rinda Diagnostics Warning: Supabase environment variables are missing. Local mock catalog data will be used until cloud keys are loaded."
  );
}

// Initialize the database channel client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
