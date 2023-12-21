import { supabase } from "@/utils/supabaseClient";
import { flow, getRoot, types } from "mobx-state-tree";
import { appStore } from ".";
import { toJS } from "mobx";

const Auth = types.model("Auth", {
  id: types.identifier,
  email: types.string,
  password: types.string,
});
export const AuthStore = types
  .model("AuthStore", {
    auth: types.map(Auth),
  })
  .actions((self) => {
    return {
      signUp: flow(function* () {
        const {
          data: { user, session },
          error,
        } = yield supabase.auth.signUp(
          {
            email: "levien26092k1aaa@gmail.com",
            password: "levien_209a",
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
          data: { user },
          error,
        } = yield supabase.auth.signInWithPassword({
          email: "levien26092k1aaa@gmail.com",
          password: "levien_209a",
        });
        if (!error) {
          self.auth.set("id", user.id);
          console.log(toJS(self));
        }
      }),
      signOut: flow(function* () {
        yield supabase.auth.signOut();
      }),
    };
  });
