import { toJS } from "mobx";
import { types } from "mobx-state-tree";

const PaymentType = types.model('PaymentType', {
	room_id: types.optional(types.string, ""),
	from: types.optional(types.string, ""),
	to: types.optional(types.string, ""),
	total_price: types.optional(types.number, 0),
})

export const PaymentStore = types.model('PaymentStore', {
	items: types.optional(types.array(PaymentType), [])
}).actions((self: any) => {
	return {
		add: function (info: any) {
			self.items.push(info)
		}
	}
})

export const paymentStore: any = PaymentStore.create();
