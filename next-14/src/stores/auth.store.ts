import {supabase} from "@/utils/supabaseClient";
import {flow, getRoot, resolveIdentifier, types} from "mobx-state-tree";
import {toJS} from "mobx";

const Auth = types.model("Auth", {
    id: types.identifier,
    email: types.string,
    password: types.string,
});
export const AuthStore = types
    .model("AuthStore", {
        auth: types.optional(Auth, {
            id: "",
            email: "",
            password: "",
        }),
    })
    .actions((self) => {
        return {
            signUp: flow(function* () {
                const {
                    data: {user, session},
                    error,
                } = yield supabase.auth.signUp(
                    {
                        email: "levien26092k1@gmail.com",
                        password: "1",
                        options: {
                            data: {
                                firstName: "Le",
                                lastName: "Vien",
                                age: 20,
                            },
                        },
                    }
                    //   {
                    //   email: userInformation.email,
                    //   password: userInformation.password,
                    //   options: {
                    //     data: {
                    //       firstName: userInformation.firstName,
                    //       lastName: userInformation.lastName,
                    //       age: userInformation.age,
                    //     },
                    //   },
                    // }
                );
            }),
            signIn: flow(function* () {
                const {
                    data: {user},
                    error,
                } = yield supabase.auth.signInWithPassword({
                    email: "levien2@gmail.com",
                    password: "2",
                });
                if (!error) {
                    console.log(toJS(self));
                }
            }),
            signOut: flow(function* () {
                yield supabase.auth.signOut();
            }),
        };
    });
export const authStore = AuthStore.create({
    auth: {
        id: "",
        email: "",
        password: "",
    },
});