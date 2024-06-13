import { createClient } from "@supabase/supabase-js";


const supUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabase = createClient(supUrl, anonKey);