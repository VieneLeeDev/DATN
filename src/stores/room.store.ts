import { getRoot, types } from "mobx-state-tree";
import { values } from "mobx";
import moment from "moment";
import _ from "lodash";

const Room = types
	.model("Room", {
		id: types.identifier,
		image_url: "",
		price: 0,
		size: 0, // unit is m2
		guest: 0, // people
		description: ""
	})

export const RoomStore = types
	.model("RoomStore", {
		items: types.optional(types.array(Room), []),
		itemSelected_id: "",
	})
	.views((self: any) => {
		const root: any = getRoot(self);
		return {
			get itemsSorted() {
				const _return: readonly any[] = values(self.items);
				return _return;
			},
			get itemsFiltered() {
				let _return: readonly any[] = self.itemsSorted.filter(
					(room: any) =>
						room.guest >= root.filter.filter_guests &&
						!root.booking.itemsSorted
							.filter(
								(book: any) =>
									moment(book.from, "YYYY-MM-DD").isBetween(
										moment(root.filter.filter_from, "YYYY-MM-DD"),
										moment(root.filter.filter_to, "YYYY-MM-DD"),
										undefined,
										"[]"
									) ||
									moment(book.to, "YYYY-MM-DD").isBetween(
										moment(root.filter.filter_from, "YYYY-MM-DD"),
										moment(root.filter.filter_to, "YYYY-MM-DD"),
										undefined,
										"[]"
									) ||
									moment(root.filter.filter_from, "YYYY-MM-DD").isBetween(
										moment(book.from, "YYYY-MM-DD"),
										moment(book.to, "YYYY-MM-DD"),
										undefined,
										"[]"
									)
							)
							.map((book: any) => book.room_id)
							.includes(room.id)
				);
				return _return;
			},
			get guestList() {
				const _guests: readonly number[] = self.itemsSorted.map(
					(item: any) => item.guest
				);
				return _.map(_.groupBy(_guests), (value, key) => key);
			},
			get itemSelected() {
				return values(self.items).find((room: any) => room.id === self.itemSelected_id);
			},
		};
	})
	.actions((self: any) => {
		return {
			pickItem(item: any) {
				if (typeof (item) === 'object')
					self.itemSelected_id = item.id;
				else if (typeof (item) === 'string')
					self.itemSelected_id = item;
			},
		};
	});
