import { types } from "mobx-state-tree";
import room from "../../app/api/rooms/rooms.json";
import { values } from "mobx";
import { Hotel } from "../hotel/HotelStore";
import hotel from "../../app/api/hotels/hotels.json"
export const Room = types.model("Room", {
  id: types.identifier,
  hotel_id: types.string,
  image_url: types.string,
  price: types.number,
  size: types.string,
  guest: types.number,
});

//defind a store
export const RoomStore = types
  .model("RoomStore", {
    isLoading: true,
    rooms: types.array(Room),
    hotels: types.array(Hotel),
    guest: 1,
    location: "All",
  })
  .views((self) => ({
    get roomsAvailable() {
      let listRoom = values(self.rooms);
        if(self.guest !== 1){
          listRoom = listRoom.filter((room) => room.guest > self.guest);
        }
        if(self.location !== "All"){
          const hotelCheck = values(self.hotels)
          listRoom = listRoom.filter((room) => hotelCheck.find((hotel) => room.hotel_id === hotel.id && hotel.city === self.location))
        }
      return listRoom;
    },
  }))
  .actions((self) => ({
    setFilterGuest(guest: any) {
      self.guest = guest;
    },
    setFilterCity(city: any) {
      self.location = city;
    },
  }));

export const roomStore = RoomStore.create({ rooms: room, hotels: hotel });
