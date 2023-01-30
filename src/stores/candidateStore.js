import { defineStore } from 'pinia'

export const useCandidateStore = defineStore('candidateStore', {
  state: () => ({
    data: {
      candidate: {
        adhesion_term_id: '',
        type_job_id: '',
        gender_id: '',
        marital_status_id: '',
        educational_level_id: '',
        turn_preference_id: '',
        distance_range_id: '',
        salary_pretension_id: '',
        type_vehicle_id: '',
        type_license_drive_id: '',
        type_disability_id: '',
        birth_date: '',
        number_children: '',
        available_interview: '',
        notify_new_job: false,
        foreign_languages: '',
        travel_availability: false,
        currently_employed: false,
        first_job: false,
        tags_abilities: '',
        references: '',
        about: '',
        score_hard_skill: '',
        score_soft_skill: '',
        worked_their_own: '',
        what_did_you_do: '',
      },
      academicFormations: [],
      professionalExperiences: [],
      otherExperiences: [],
      courses: [],
      occupationsInterest: [],
    },
    smallSelects: [],
  }),

  actions: {
    insertAcademicFormation(data) {
      // if (this.data.academicFormations.find((item) => item.id === data.id && item.deleted === false)) {
      //   console.log(data.id)
      //   console.log('já existe')
      //   return
      // }

      this.data.academicFormations.push(data)
    },

    removeOfAcademicFormations(index) {
      this.data.academicFormations[index].deleted = true
    },

    insertForeignLanguage(data) {
      // if (this.data.foreignLanguage.find((item) => item.id === data.id && item.deleted === false)) {
      //   return
      // }

      this.data.foreignLanguages.push(data)
    },

    removeOfForeignLanguages(index) {
      this.data.foreignLanguages[index].deleted = true
    },

    insertProfessionalExperience(data) {
      // if (this.data.professionalExperiences.find((item) => item.id === data.id && item.deleted === false)) {
      //   return
      // }

      this.data.professionalExperiences.push(data)
    },

    removeOfProfessionalExperiences(index) {
      this.data.professionalExperiences[index].deleted = true
    },

    insertOtherExperience(data) {
      if (this.data.otherExperiences.find((item) => item.id === data.id && item.deleted === false)) {
        return
      }

      this.data.otherExperiences.push(data)
    },

    removeOfOtherExperiences(index) {
      this.data.otherExperiences[index].deleted = true
    },

    insertCourse(data) {
      if (this.data.courses.find((item) => item.id === data.id && item.deleted === false)) {
        return
      }

      this.data.courses.push(data)
    },

    removeOfCourses(index) {
      this.data.courses[index].deleted = true
    },

    insertOccupationInterest(data) {
      // if (this.data.occupationsInterest.find((item) => item.id === data.id && item.deleted === false)) {
      //   return
      // }
      console.log(data)

      this.data.occupationsInterest.push(data)
    },

    removeOfOccupationsInterest(index) {
      this.data.occupationsInterest[index].deleted = true
    },
  },
})
