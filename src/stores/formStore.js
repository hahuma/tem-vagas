import { defineStore } from "pinia";

export const useFormStore = defineStore("formStore", {
  state: () => ({
    origin: "admin",
    action: "insert",
    editing: true,
  }),
});
