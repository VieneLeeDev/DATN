import { applySnapshot, flow, onSnapshot, types } from "mobx-state-tree";
import { RoomStore } from "@/stores/room.store";
import { BookingStore } from "@/stores/booking.store";
import { toJS } from "mobx";
import { AuthStore } from "./auth.store";
import { supabase } from "@/utils/supabaseClient";
import { PaymentStore } from "./payment.store";

const FilterStore = types.model("FilterStore", {
	filter_from: "",
	filter_to: "",
	filter_guests: 1,
	filter_selected: "",
});

const AppStore = types
	.model("AppStore", {
		room: types.optional(RoomStore, {}),
		booking: types.optional(BookingStore, {}),
		auth: types.optional(AuthStore, { isLoggin: false }),
		filter: types.optional(FilterStore, {}),
		payment: types.optional(PaymentStore, {}),
	})
	.volatile(() => ({
		hasDataFromStorage: false,
	}))
	.views((self: any) => {
		return {};
	})
	.actions((self: any) => {
		return {
			afterCreate: flow(function* () {
				try {
					const fetchData = flow(function* fetchData() {
						//get data room and hotel from api supabase
						let dataRoom, dataBooking;

						const getDataBooking = flow(function* () {
							const { data } = yield supabase.from("booking").select();
							return data;
						});

						const getDataRoom = flow(function* () {
							const { data } = yield supabase.from("room").select();
							return data;
						});

					
						dataRoom = yield getDataRoom();
						
						dataBooking = yield getDataBooking();
						yield appStore.setData(dataRoom, dataBooking);
					});
					yield fetchData();
				} catch (error) {
					console.log(error);
				}
			}),
			setDuration(from?: string, to?: string) {
				self.filter.filter_from = from;
				self.filter.filter_to = to;
			},
			setGuests(num: number) {
				self.filter.filter_guests = num;
			},
			resetFilter() {
				self.filter.filter_from = "";
				self.filter.filter_to = "";
				self.filter.filter_guests = 1;
			},
			setData: flow(function* (
				dataRoom?: any,
				dataBooking?: any
			) {
				self.room.items = dataRoom;
				self.booking.items = dataBooking;
			}),
			roomSelected(id: string) {
				self.filter.filter_selected = id;
			},
		};
	});

export let appStore: any = {};

// App Store is created in client, no server
const isServer = typeof window === "undefined";
if (!isServer) {
	appStore = AppStore.create({});
}
