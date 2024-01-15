import { defineStore } from 'pinia'
import { postLogin } from "../server/auth-api.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      token: null,
      authenticated: false,
    },
    msgError: null
  }),
  actions: {
    async postLogin(payload) {
      try {
        const response = await postLogin(payload)

        const token = response.user.token
        this.user.token = token
        if(token) {
          localStorage.setItem("token", token)
          this.user.authenticated = true
        }

        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
  }
})
