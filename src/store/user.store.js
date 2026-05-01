import { create } from "zustand";

const userStore = create((set) => ({
  userName: "",
  email: "",
  organization: "",

  setUser: (user) =>
    set(() => ({
      userName: user.userName,
      email: user.email,
      organization: user.organization,
    })),
}));

export default userStore;