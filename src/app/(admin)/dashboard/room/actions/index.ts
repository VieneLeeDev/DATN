import { RoomStore } from '@/stores/room.store';
import { supabase } from '@/utils/supabaseClient';
export async function createRoom(data: any) {
	const resultCreate = await supabase.from('room').insert(data)
	if (resultCreate.error?.message) {
		return { data: null, error: { message: 'This Room Id is already exist!' } }
	}
	return { data: resultCreate.data, error: null }
}

export async function updateRoom(data: any) {
	const nativeRoom = await supabase.from('room').select().eq('id', data.id).single();
	if (nativeRoom.data) {
		let { id, ...updateInfo } = data
		const resulteUpdateRoom = await supabase.from('room').update(updateInfo).eq('id', data.id)
		if (resulteUpdateRoom.error?.message) {
			return { data: null, error: { message: resulteUpdateRoom.error?.message } }
		}
		return { status: resulteUpdateRoom.status, message: "Update succesfull!" }
	}
	else {
		const resulteUpdateRoom = await supabase.from('room').update(data).eq('id', data.id)
		if (resulteUpdateRoom.error?.message) {
			return { data: null, error: { message: resulteUpdateRoom.error?.message } }
		}
		return { status: resulteUpdateRoom.status, message: "Update succesfull!" }
	}
}

export async function deleteRoom(id: string) {
	const resultDelete = await supabase.from('room').delete().eq('id', id)
	if (resultDelete.error?.message) {
		return { data: null, error: { message: resultDelete.error?.message } }
	}
	return { data: { message: "Deleted succesfull!" }, error: null }
}

export async function readRoom() {
	const resultReadRoom = await supabase.from('room').select("*")
	if (resultReadRoom.error?.message) {
		return { data: null, error: { massage: resultReadRoom.error?.message } }
	}
	return { data: resultReadRoom.data, error: null }
}