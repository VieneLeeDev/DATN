import { supabase } from "@/utils/supabaseClient";
import { flow, getRoot, resolveIdentifier, types } from "mobx-state-tree";
import { toJS } from "mobx";
import { notification } from "antd";

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
      signUp: flow(function* (userInformation) {
        const {
          data: { user, session },
          error,
        } = yield supabase.auth.signUp(
            {
            email: userInformation.email,
            password: userInformation.password,
            options: {
              data: {
                firstName: userInformation.firstName,
                lastName: userInformation.lastName,
                age: userInformation.age,
              },
            },
          }
        );
      }),
      signIn: flow(function* (users: any) {
        try {
          const {
            data: { user },
            error,
          } = yield supabase.auth.signInWithPassword({
            email: users.email,
            password: users.password,
          });
        } catch (error) {
          console.log(error);
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
