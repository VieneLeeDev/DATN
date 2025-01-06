"use server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";


export async function createSupabaseServerClient() {
	// const cookieStore = cookies();

	// return createServerClient(
	// 	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	// 	process.env.NEXT_PUBLIC_SUPABASE_KEY!,
	// 	{
	// 		cookies: {
	// 			get(name: string) {
	// 				return cookieStore.get(name)?.value;
	// 			},
	// 			set(name: string, value: string, options: CookieOptions) {
	// 				cookieStore.set({ name, value, ...options });
	// 			},
	// 			remove(name: string, options: CookieOptions) {
	// 				cookieStore.set({ name, value: "", ...options });
	// 			},
	// 		},
	// 	}
	// );
}


export async function createSupbaseServerClientReadOnly() {
	const cookieStore = cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		}
	);
}

export async function readUserSession() {
	const supabase = await createSupbaseServerClientReadOnly();

	return supabase.auth.getSession();
}