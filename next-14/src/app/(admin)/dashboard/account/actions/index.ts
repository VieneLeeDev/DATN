"use server"

import { createSupabaseAdmin, supabase } from "@/utils/supabaseClient";
import { result } from "lodash";
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



export async function updateMemberById(id: string, data: any) {
	const supabase = await createSupabaseAdmin()
	const userUpdate: any = await supabase.from('member').select("*").eq('id', id)
	const resultUpdateAdvance = await supabase.from('permission').update({ role: data.role, status: data.status }).eq('member_id', id)
	if (data.confirm) {
		const resultResetPassword = await supabase.auth.admin.updateUserById(id, {
			password: data.confirm
		})
	}
	if (userUpdate.data.email === data.email) {
		const resultUpdateMember = await supabase.from('member').update({ name: data.name }).eq('id', id)
		if (resultUpdateMember.error?.message) {
			return { data: null, error: { mesage: resultUpdateMember.error?.message } }
		}
		else {
			return { data: { status: 200, mesage: "Update successfull!" }, error: null }
		}
	}
	else {
		const resultUpdateMember = await supabase.from('member').update({ name: data.name, email: data.email }).eq('id', id)
		if (resultUpdateMember.error?.message) {
			return { data: null, error: { mesage: resultUpdateMember.error?.message } }
		}
		else {
			return { data: { status: 200, mesage: "Update successfull!" }, error: null }
		}
	}
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