import {applySnapshot, onSnapshot, types} from "mobx-state-tree";
import {RoomStore} from "@/stores/room.store";
import {HotelStore} from "@/stores/hotel.store";
import {BookingStore} from "@/stores/booking.store";
import {dataApp} from "@/stores/data";
import {toJS} from "mobx";

const AppStore = types
    .model('AppStore', {
        room: types.optional(RoomStore, {}),
        hotel: types.optional(HotelStore, {}),
        booking: types.optional(BookingStore, {}),
        filter_from: '',
        filter_to: '',
        filter_guests: 1,
    })
    .views(
        (self: any) => {
            return {};
        }
    )
    .actions((self: any) => {
        return {
            afterCreate() {
                console.log('appStore', toJS((self)));
                if (typeof window !== 'undefined') {
                    const json = JSON.parse(localStorage.getItem('bookingApp') || '');
                    if (json)
                        applySnapshot(self, json);
                }
            },
            setDuration(from: string, to: string) {
                self.filter_from = from;
                self.filter_to = to;
            },
            setGuests(num: number) {
                self.filter_guests = num;
            }
        }
    });

export const appStore = AppStore.create(dataApp);

onSnapshot(appStore, (snapshot) => {
    console.log('appStore', snapshot);
    localStorage.setItem('bookingApp', JSON.stringify(snapshot));
})