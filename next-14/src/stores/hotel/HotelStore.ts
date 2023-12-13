import { flow, types } from "mobx-state-tree";
import hotel from "../../app/api/hotels/hotels.json"
import { values } from "mobx";
export const Hotel = types.model("Hotel", {
  id: types.string,
  name: types.string,
  description: types.string,
  address: types.string,
  email: types.string,
  tel: types.string,
  city: types.string,
});


export const HotelStore = types
  .model("HotelStore", {
    isLoading: true,
    hotels: types.array(Hotel)
  })
  .views((self) => ({
    get hotelName() {
      return values(self.hotels)
    }
  }))
  .actions((self) => ({
  }));

  export const hotelStore = HotelStore.create({hotels:hotel})