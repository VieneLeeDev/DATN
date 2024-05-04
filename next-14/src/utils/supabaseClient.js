import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabaseRole = process.env.SERVICE_ROLE
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function createSupabaseAdmin() {
	return createClient(supabaseUrl,supabaseKey, supabaseRole, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	})
}