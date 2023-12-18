"use client";
import { applySnapshot, onSnapshot, types } from "mobx-state-tree";
import { RoomStore } from "@/stores/room.store";
import { HotelStore } from "@/stores/hotel.store";
import { BookingStore } from "@/stores/booking.store";
import { dataApp } from "@/stores/data";
import { toJS } from "mobx";

const AppStore = types
  .model("AppStore", {
    room: types.optional(RoomStore, {}),
    hotel: types.optional(HotelStore, {}),
    booking: types.optional(BookingStore, {}),
    filter_from: "",
    filter_to: "",
    filter_guests: 1,
    filter_city:''
  })
  .views((self: any) => {
    return {};
  })
  .actions((self: any) => {
    return {
      afterCreate() {
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
        self.filter_from = from;
        self.filter_to = to;
      },
      setGuests(num: number) {
        self.filter_guests = num;
      },
      setCitys(city: string) {
        self.filter_city = city;
      },
      resetFilter(){
        self.filter_from = '',
        self.filter_to = '',
        self.filter_guests= 1,
        self.filter_city=''
      }
    };
  });

export const appStore = AppStore.create(dataApp);

onSnapshot(appStore, (snapshot) => {
  console.log("appStore", snapshot);
  localStorage.setItem("bookingApp", JSON.stringify(snapshot));
});
