"use server"

import { createSupabaseAdmin, supabase } from "@/utils/supabaseClient";
import { notification } from "antd";
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

	// create account
	const createResult = await supabase.auth.admin.createUser({
		email: data.email,
		password: data.password,
		email_confirm: true,
		user_metadata: {
			role: data.role
		}
	})
	if (createResult.error?.message) {
		return JSON.stringify(createResult)
	}
	else {
		const memberResult = await supabase.from("member").insert({ id: createResult.data.user?.id, name: data.name })
		if (memberResult.error?.message) {
			return JSON.stringify(memberResult)
		}
		else {
			const permissionResult = await supabase.from("permission").insert({ member_id: createResult.data.user?.id, role: data.role, status: data.status })
			if (permissionResult.error?.message) {
				return JSON.stringify(permissionResult)
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
		return JSON.stringify(deleteResult)
	} catch (error) {
		return JSON.stringify(error)
	}

}