import {destroy, getParent, getRoot, types} from "mobx-state-tree";
import {values} from "mobx";
import {v4 as uuidv4} from "uuid";

const Booking = types
    .model('Booking', {
        id: types.identifier,
        room_id: '',
        from: '',
        to: '',
        total_price: 0,
    })
    .views(
        (self: any) => {
            const root: any = getRoot(self);
            return {
                get room() {
                    return values(root.room.items).find((room: any) => room.id === self.room_id);
                },
            }
        }
    )
    .actions((self: any) => {
        const parent: any = getParent(self, 2);
        return {
            delete() {
                parent.delete(self);
            },
        }
    });

export const BookingStore = types
    .model('BookingStore', {
        items: types.array(Booking),
    })
    .views(
        (self: any) => {
            return {
                get itemsSorted() {
                    return values(self.items);
                },
            }
        }
    )
    .actions((self: any) => {
        return {
            create(item: { room_id: string, from: string, to: string, total_price: number }) {
                const id = uuidv4();
                self.items.push({id, ...item});
            },
            delete(item: any) {
                destroy(item);
            },
        }
    });