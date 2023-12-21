"use client";
import { applySnapshot, onSnapshot, types } from "mobx-state-tree";
import { RoomStore } from "@/stores/room.store";
import { HotelStore } from "@/stores/hotel.store";
import { BookingStore } from "@/stores/booking.store";
import { dataApp } from "@/stores/data";
import { toJS } from "mobx";
import { AuthStore } from "./auth.store";
import { supabase } from "@/utils/supabaseClient";

const FilterStore = types.model("FilterStore", {
  filter_from: "",
  filter_to: "",
  filter_guests: 1,
  filter_city: "",
});

const AppStore = types
  .model("AppStore", {
    room: types.optional(RoomStore, {}),
    hotel: types.optional(HotelStore, {}),
    booking: types.optional(BookingStore, {}),
    auth: types.optional(AuthStore, {}),
    filter: types.optional(FilterStore, {}),
    // user_id: types.string,
  })
  .views((self: any) => {
    return {};
  })
  .actions((self: any) => {
    return {
      afterCreate() {
        const fetchData = async () => {
          //get data room and hotel from api supabase
          let dataRoom, dataHotel;

          const getDataRoom = async () => {
            const { data } = await supabase.from("rooms").select();
            return data;
          };

          const getDataHotel = async () => {
            const { data } = await supabase.from("hotels").select();
            return data;
          };

          dataRoom = await getDataRoom();
          dataHotel = await getDataHotel();
          appStore.setData(dataRoom,dataHotel)
        };
        fetchData();
        console.log("appStore", toJS(self));
        if (typeof window !== "undefined") {
          try {
            const json = JSON.parse(localStorage.getItem("bookingApp") || "");
            // if (json) {
            //   applySnapshot(self, json);
            // }
          } catch (error) {
            console.log(error);
          }
        }
      },
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
        (self.filter.filter_from = ""),
          (self.filter.filter_to = ""),
          (self.filter.filter_guests = 1),
          (self.filter.filter_city = "");
      },
      setData(dataRoom: any, dataHotel: any) {
        self.room.items = dataRoom;
        self.hotel.items = dataHotel;
      },
    };
  });

export const appStore = AppStore.create({
  room: { items: [] },
  hotel: { items: [] },
});
// export const appStore = AppStore.create(dataApp);

onSnapshot(appStore, (snapshot) => {
  // console.log("appStore", snapshot);
  // localStorage.setItem("bookingApp", JSON.stringify(snapshot));
});
