import {types} from "mobx-state-tree";
import {values} from "mobx";

const Hotel = types
    .model('Hotel', {
        id: types.identifier,
        name: '',
        description: '',
        address: '',
        email: '',
        tel: '',
        city: '',
    });

export const HotelStore = types
    .model('HotelStore', {
        items: types.array(Hotel),
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
            order(user: any) {
            },
        }
    });