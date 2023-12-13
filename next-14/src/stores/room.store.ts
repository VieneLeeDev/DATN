import {types} from "mobx-state-tree";
import {values} from "mobx";

const Room = types
    .model('Room', {
        id: types.identifier,
        name: types.optional(types.string, ''),
    });

export const RoomStore = types
    .model('RoomStore', {
        items: types.array(Room),
    })
    .views(
        (self: any) => {
            return {
                get roomsSorted() {
                    return values(self.rooms);
                },
            }
        }
    )
    .actions((self: any) => {
        return {
            order(user: any) {
            },
        }
    });