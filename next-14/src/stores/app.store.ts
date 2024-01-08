import {applySnapshot, flow, onSnapshot, types} from "mobx-state-tree";
import {RoomStore} from "@/stores/room.store";
import {HotelStore} from "@/stores/hotel.store";
import {BookingStore} from "@/stores/booking.store";
import {toJS} from "mobx";
import {AuthStore} from "./auth.store";
import {supabase} from "@/utils/supabaseClient";

const FilterStore = types.model("FilterStore", {
    filter_from: "",
    filter_to: "",
    filter_guests: 1,
    filter_city: "",
    filter_selected: "",
});

const AppStore = types
    .model("AppStore", {
        room: types.optional(RoomStore, {}),
        hotel: types.optional(HotelStore, {}),
        booking: types.optional(BookingStore, {}),
        auth: types.optional(AuthStore, {}),
        filter: types.optional(FilterStore, {}),
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
                    const fetchData = flow(function* () {
                        //get data room and hotel from api supabase
                        let dataRoom, dataHotel, dataBooking;

                        const getDataBooking = flow(function* () {
                            const {data} = yield supabase.from("bookings").select();
                            return data;
                        });

                        const getDataRoom = flow(function* () {
                            const {data} = yield supabase.from("rooms").select();
                            return data;
                        });

                        const getDataHotel = flow(function* () {
                            const {data} = yield supabase.from("hotels").select();
                            return data;
                        });

                        dataRoom = yield getDataRoom();
                        dataHotel = yield getDataHotel();
                        dataBooking = yield getDataBooking();
                        yield appStore.setData(dataRoom, dataHotel, dataBooking);
                    });
                    yield fetchData();

                    console.log("appStore", toJS(self));

                    onSnapshot(self, (snapshot) => {
                        console.log("snapshot", toJS(snapshot));
                        localStorage.setItem("bookingApp", JSON.stringify(snapshot));
                    });
                } catch (error) {
                    console.log(error);
                }

                if (typeof window !== "undefined") {
                    try {
                        if (localStorage) {
                            let json = localStorage.getItem("bookingApp");
                            if (json) {
                                json = JSON.parse(json);
                                // console.log("json", json);
                                applySnapshot(self, json);
                                self.hasDataFromStorage = true;
                            }
                        } else {
                            console.warn(
                                "localStorage is not available in this environment."
                            );
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                }
            }),
            setDuration(from: string, to: string) {
                self.filter.filter_from = from;
                self.filter.filter_to = to;
            },
            setGuests(num: number) {
                self.filter.filter_guests = num;
            },
            setCitys(city: string) {
                self.filter.filter_city = city;
            },
            resetFilter() {
                self.filter.filter_from = "";
                self.filter.filter_to = "";
                self.filter.filter_guests = 1;
                self.filter.filter_city = "";
            },
            setData: flow(function* (
                dataRoom: any,
                dataHotel: any,
                dataBooking: any
            ) {
                self.room.items = dataRoom;
                self.hotel.items = dataHotel;
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
