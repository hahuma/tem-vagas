import { defineStore } from "pinia";
import axios from "@/api/axios";

export const usePersonStore = defineStore("personStore", {
  state: () => ({
    data: {
      person: {
        uuid: "",
        type_person_id: "J",
        affiliate_id: "",
        register_status_id: "",
        city_id: "",
        name: "",
        short_name: "",
        document_number: "",
        zip_code: "",
        street: "",
        number_street: "",
        street_complement: "",
        district: "",
        latitude: "",
        longitude: "",
        url_photo: "",
        email: "",
        phone: "",
        whatsapp: "",
        telegram: "",
        instagram: "",
        facebook: "",
      },

      user: {
        email: "",
        password: "",
      },
    },

    file: "",
  }),

  actions: {
    async searchCompanyByID(id) {
      const { data } = await axios.get(`/companies/${id}`);
      this.data.person = data.person;
      this.data.user = data.user;
      return data;
    },

    async searchAffiliateByID(id) {
      const { data } = await axios.get(`/affiliates/${id}`);
      this.data.person = data.person;
      this.data.user = data.user;
      return data;
    },

    async searchCandidateByID(id) {
      const { data } = await axios.get(`/candidates/${id}`);
      this.data.person = data.person;
      return data;
    },

    hasErrorForm() {
      let errorMessages = [];

      // Contrato
      if (this.data.person.type_person_id === "") {
        errorMessages.push("Informe o Tipo de Pessoa, Jurídica ou Física");
      }

      if (this.data.person.type_person_id === "F") {
        this.data.person.short_name = "";

        if (this.data.person.document_number === "") {
          errorMessages.push("Faltou informar o CPF");
        }
        if (this.data.person.name === "") {
          errorMessages.push("Faltou informar o Nome");
        }
      } else {
        if (this.data.person.document_number === "") {
          errorMessages.push("Faltou informar o CNPJ");
        }
        if (this.data.person.name === "") {
          errorMessages.push("Faltou informar a Razão Social");
        }
        if (this.data.person.short_name === "") {
          errorMessages.push("Faltou informar o nome de Fantasia");
        }
      }

      if (this.data.person.street === "") {
        errorMessages.push("Faltou informar o logradouro");
      }

      if (this.data.person.street_number === "") {
        errorMessages.push("Faltou informar o número do logradouro");
      }

      if (this.data.person.district === "") {
        errorMessages.push("Faltou informar o bairro ou localidade");
      }

      if (this.data.person.zip_code === "") {
        errorMessages.push("Faltou informar o CEP");
      }

      if (this.data.person.city_id === "") {
        errorMessages.push("Faltou informar o Município");
      }

      if (this.data.person.email === "") {
        errorMessages.value.push("Informe o email de contato");
      }

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.data.person.email)) {
        errorMessages.value.push("Informe um email de contato válido");
      }

      return errorMessages;
    },
  },
});
