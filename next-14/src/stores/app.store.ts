import {types} from "mobx-state-tree";
import {RoomStore} from "@/stores/room.store";


const AppStore = types
    .model('AppStore', {
        room: types.optional(RoomStore, {}),
    })
    .views(
        (self: any) => {
            return {};
        }
    )
    .actions((self: any) => {
        return {}
    });

export const appStore = AppStore.create({room: {items: [{id: '1'}, {id: '2'}, {id: '3'}]}})