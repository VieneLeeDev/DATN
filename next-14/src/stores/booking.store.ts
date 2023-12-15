import {types} from "mobx-state-tree";
import {values} from "mobx";

const Booking = types
    .model('Booking', {
        id: types.identifier,
        room_id: '',
        from: '',
        to: '',
        total_price: 0,
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
            order(user: any) {
            },
            addBooking(booking: any){
                self.items.push(booking)
                localStorage.setItem('booking',JSON.stringify(self.items))
            },
            removeBooking(id:string){
                self.items = self.items?.filter((item: any) => item.id !== id)
                
            }
        }
    });