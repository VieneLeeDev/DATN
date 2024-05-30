import { supabase } from "@/utils/supabaseClient";
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
				const { data: activeSession } = yield supabase.auth.getSession();
				if (activeSession.session) {
					self.isLoggin = true;
				}
			}),
			signUp: flow(function* (userInformation) {
				const {
					data: { user, session },
					error,
				} = yield supabase.auth.signUp({
					email: userInformation.email,
					password: userInformation.password,
					options: {
						data: {
							firstName: userInformation.firstName,
							lastName: userInformation.lastName,
							age: userInformation.age,
						},
					},
				});
			}),
			signIn: flow(function* (users: any) {
				const {
					data: { user }, } = yield supabase.auth.signInWithPassword({
						email: users.email,
						password: users.password,
					});
				const { data: activeSession } = yield supabase.auth.getSession();
				if (activeSession.session) {
					self.isLoggin = true
				}
				else {
					notification.error({ message: "Đăng nhập thất bại, Vui lòng thử lại!" });
				}
			}),
			signOut: flow(function* () {
				self.isLoggin = false
				yield supabase.auth.signOut();
			}),
		};
	});
export const authStore = AuthStore.create()