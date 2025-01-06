import { appStore } from "@/stores";
import { destroy, getParent, types, flow, getRoot } from "mobx-state-tree";
import { toJS, values } from "mobx";
import { v4 as uuidv4 } from "uuid";
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
					yield self.fetchData();
						notification.success({ message: "Booking thành công!" });
				} catch (error) {
					notification.error({ message: "Booking không thành công!" });
				}
			}),
			fetchData: flow(function* () {
				try {
					
				} catch (error) {
					console.log(error);
				}
			}),
			delete: flow(function* (item: any) {
				destroy(item);
			}),
		};
	});

export const bookingStore: any = BookingStore.create({});
