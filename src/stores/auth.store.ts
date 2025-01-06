import { applySnapshot, flow, getRoot, onSnapshot, resolveIdentifier, types } from "mobx-state-tree";
import { toJS } from "mobx";
import { notification } from "antd";

export const AuthStore = types
	.model("AuthStore", {
		isLoggin: false,
	})
	.actions((self) => {
		return {
			afterCreate: flow(function* () {
			
			}),
			signUp: flow(function* (userInformation) {
			
			}),
			signIn: flow(function* (users: any) {
				
			}),
			signOut: flow(function* () {
				
			}),
		};
	});
export const authStore = AuthStore.create()