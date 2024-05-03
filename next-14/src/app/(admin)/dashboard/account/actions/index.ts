import { createSupabaseAdmin } from "@/utils/supabaseClient";

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

export async function updateMemberById(id: string) {

}

export async function deleteMemberById(id: string) { }
export async function readMembers() { }