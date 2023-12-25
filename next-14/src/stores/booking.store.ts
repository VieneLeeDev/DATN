import {destroy, getParent, types, flow, getRoot} from "mobx-state-tree";
import {values} from "mobx";
import {v4 as uuidv4} from "uuid";
import {supabase} from "@/utils/supabaseClient";
import {notification} from "antd";

const Booking = types
    .model("Booking", {
        id: types.identifier,
        user_id: types.optional(types.string, ""),
        room_id: types.optional(types.string, ""),
        from: types.optional(types.string, ""),
        to: types.optional(types.string, ""),
        total_price: types.optional(types.number, 0),
    })
    .views((self: any) => {
        const root: any = getRoot(self);
        return {
            get room() {
                return values(root.room.items).find(
                    (room: any) => room.id === self.room_id
                );
            },
        };
    })
    .actions((self: any) => {
        const parent: any = getParent(self, 2);
        return {
            delete() {
                parent.delete(self);
            },
        };
    });

export const BookingStore = types
    .model("BookingStore", {
        items: types.optional(types.array(Booking), []),
    })
    .views((self: any) => {
        return {
            get itemsSorted() {
                // const getData = async () => {
                //   let _result;
                //   const {
                //     data: { user },
                //   } = await supabase.auth.getUser();
                //   const { data } = await supabase
                //     .from("bookings")
                //     .select("*")
                //     .eq("user_id", user?.id);
                // _result = data;
                // };
                // getData();
                return values(self.items);
            },
        };
    })
    .actions((self: any) => {
        return {
            create: flow(function* (items: {
                from: string;
                to: string;
                room_id: string;
                total_price: number;
            }) {
                try {
                    const id = uuidv4();
                    yield supabase.from("bookings").insert({
                        id,
                        from: items.from,
                        to: items.to,
                        room_id: items.room_id,
                        total_price: items.total_price,
                    });
                    yield self.fetchData();
                    notification.success({message: "Booking thành công!"});
                } catch (error) {
                    console.error(error);
                }
            }),
            fetchData: flow(function* () {
                try {
                    const {data} = yield supabase.from("bookings").select("*");
                    self.items = data;
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }),
            delete: flow(function* (item: any) {
                yield supabase.from("bookings").delete().eq("id", item.id);
                destroy(item);
            }),
        };
    });
