import {getRoot, types} from "mobx-state-tree";
import {values} from "mobx";
import _ from "lodash";

const Room = types
    .model('Room', {
        id: types.identifier,
        hotel_id: '',
        image_url: '',
        price: 0,
        size: 0, // unit is m2
        guest: 0, // people
    })
    .views(
        (self: any) => {
            const root: any = getRoot(self);
            return {
                get hotel() {
                    return values(root.hotel.items).find((hotel: any) => hotel.id === self.hotel_id);
                },
            }
        }
    );

export const RoomStore = types
    .model('RoomStore', {
        items: types.array(Room),
        itemSelected: types.safeReference(Room),
    })
    .views(
        (self: any) => {
            const root: any = getRoot(self);
            return {
                get itemsSorted() {
                    const _return: readonly any[] = values(self.items);
                    return _return;
                },
                get itemsFiltered() {
                    const _return: readonly any[] = self.itemsSorted.filter((room: any) => room.guest >= root.filter_guests);
                    return _return;
                },
                get guestList() {
                    const _guests: readonly number[] = self.itemsSorted.map((item: any) => item.guest);
                    return _.map(_.groupBy(_guests), (value, key) => key);
                },
            }
        }
    )
    .actions((self: any) => {
        return {
            pickItem(item: any) {
                self.itemSelected = item;
            },
        }
    });