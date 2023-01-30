import axios from "@/api/axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    profile: null,
  }),

  actions: {
    isLogged() {
      return !!this.user;
    },

    async logout() {
      const { data } = await axios.get("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      localStorage.removeItem("account");
      router.push({ path: "/" });

      if (data.error) throw data.error;
    },
  },
});
