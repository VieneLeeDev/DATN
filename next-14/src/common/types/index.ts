export type Ipermission = {
	"id": string,
	"created_at": string,
	"role": "user" | "admin",
	"status": "active" | "regisned",
	"member_id": string,
	"member": {
		"id": string
		"name": string,
		"created_at": string
	}
}