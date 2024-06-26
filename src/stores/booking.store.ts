import { appStore } from "@/stores";
import { destroy, getParent, types, flow, getRoot } from "mobx-state-tree";
import { toJS, values } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabaseClient";
import { notification } from "antd";

const Booking = types
	.model("Booking", {
		id: types.identifier,
		user_id: types.optional(types.string, ""),
		room_id: types.optional(types.string, ""),
		from: types.optional(types.string, ""),
		to: types.optional(types.string, ""),
		total_price: types.optional(types.number, 0),
	})
	.views((self: any) => {
		const root: any = getRoot(self);
		return {
			get room() {
				return values(root.room.items).find(
					(room: any) => room.id === self.room_id
				);
			},
		};
	})
	.actions((self: any) => {
		const parent: any = getParent(self, 2);
		return {
			delete() {
				parent.delete(self);
			},
		};
	});

export const BookingStore = types
	.model("BookingStore", {
		items: types.optional(types.array(Booking), []),
	})
	.views((self: any) => {
		return {
			get itemsSorted() {
				return values(self.items);
			},
		};
	})
	.actions((self: any) => {
		return {
			create: flow(function* (items: {
				room_id: string;
				from: string;
				to: string;
				total_price: number;
			}) {
				try {
					const id = uuidv4();
					yield supabase.from("booking").insert({
						id,
						from: items.from,
						to: items.to,
						room_id: items.room_id,
						total_price: items.total_price,
					});
					yield self.fetchData();
						notification.success({ message: "Booking thành công!" });
				} catch (error) {
					notification.error({ message: "Booking không thành công!" });
				}
			}),
			fetchData: flow(function* () {
				try {
					const { data } = yield supabase.from("booking").select("*");
					self.items = data;
				} catch (error) {
					console.log(error);
				}
			}),
			delete: flow(function* (item: any) {
				yield supabase.from("booking").delete().eq("id", item.id);
				destroy(item);
			}),
		};
	});

export const bookingStore: any = BookingStore.create({});
