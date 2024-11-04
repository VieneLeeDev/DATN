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

export interface ICounterRole {
	admin: number,
	user: number,
}
export interface Database {
	public: {
		Tables: {
			posts: {
				Row: {
					created_at: string
					description: string | null
					id: string
					name: string
					object_id: string
					post_by: string
				}
				Insert: {
					created_at?: string
					description?: string | null
					id?: string
					name: string
					object_id: string
					post_by: string
				}
				Update: {
					created_at?: string
					description?: string | null
					id?: string
					name?: string
					object_id?: string
					post_by?: string
				}
				Relationships: [
					{
						foreignKeyName: "posts_object_id_fkey"
						columns: ["object_id"]
						isOneToOne: false
						referencedRelation: "objects"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "posts_post_by_fkey"
						columns: ["post_by"]
						isOneToOne: false
						referencedRelation: "profiles"
						referencedColumns: ["id"]
					}
				]
			}
			profiles: {
				Row: {
					created_at: string
					display_name: string | null
					email: string
					id: string
					image_url: string | null
				}
				Insert: {
					created_at?: string
					display_name?: string | null
					email: string
					id: string
					image_url?: string | null
				}
				Update: {
					created_at?: string
					display_name?: string | null
					email?: string
					id?: string
					image_url?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "users"
						referencedColumns: ["id"]
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export interface RoomDto{
	imgUrl?: string,
	slogan?: string,
	description?: string,
	size?: number,
	bedType?: string,
	capacity?: string,
	bathRoom?:string,
}