"use server"

import { createSupabaseAdmin, supabase } from "@/utils/supabaseClient";
import { unstable_noStore } from "next/cache";

export interface Account {
	email: string,
	password: string,
	name: string,
	role: "user" | "admin",
	status: "active" | "resigned",
	confirm: string
}


export async function createMember(data: Account) {
	const supabase = await createSupabaseAdmin()
	const checkEmail = await supabase.from('member').select("*").eq('email', data.email)
	if (checkEmail.data?.length !== 0) {
		return JSON.stringify({ data: null, error: { message: "This email address has already been registered!" } })
	}
	else {
		// create account
		const createResult = await supabase.auth.admin.createUser({
			email: data.email,
			password: data.password,
			email_confirm: true,
			user_metadata: {
				'role': data.role,
			}
		})
		if (createResult.error?.message) {
			return JSON.stringify({ data: null, error: { message: createResult.error?.message } })
		}
		else {
			await supabase.from("member").update({ name: data.name }).eq('id', createResult.data.user?.id)
			if (createResult.data.user?.user_metadata.role === 'admin') {
				const permissionResult = await supabase.from("permission").update({ role: 'admin' }).eq('member_id', createResult.data.user?.id)
				if (permissionResult.error?.message) {
					return JSON.stringify(permissionResult)
				}
				else { return JSON.stringify({ data: createResult.data.user, error: null }) }
			}
		}
	}
}


export async function readMembers() {
	unstable_noStore()
	const supabase = await createSupabaseAdmin()
	return await supabase.from("permission").select("*,member(*)")
}



export async function updateMemberById(id: string) {

}

export async function deleteMemberById(id: string) {
	const supabase = await createSupabaseAdmin()
	try {
		const deleteResult = await supabase.auth.admin.deleteUser(id)
		return JSON.stringify({ data: { status: 200, mesage: "Deleted" }, error: null })
	} catch (error: any) {
		return JSON.stringify({ errors: error.message })
	}

}