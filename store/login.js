import { defineStore } from 'pinia'
import { postLogin } from "../server/auth-api.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      token: null,
    },
    msgError: null
  }),
  actions: {
    async postLogin(payload) {
      try {
        const response = await postLogin(payload)
        console.log("responmse", response)

        const token = JSON.stringify(response.user.token)
        this.user.token = token

        localStorage.setItem("token", token)

        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
  }
})
