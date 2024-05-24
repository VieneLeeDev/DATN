import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabaseRole = process.env.SERVICE_ROLE
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function createSupabaseAdmin() {
	return createClient(supabaseUrl, supabaseRole, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	})
}

export function supabaseBrowser() {
	return createBrowserClient (
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
}