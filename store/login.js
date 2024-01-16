import { defineStore } from 'pinia'
import { postLogin, getUserData } from "../server/auth-api.js"

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      token: null,
      authenticated: false,
    },
    msgError: null,
    token: ''
  }),
  actions: {
    getToken(params) {
      const token = localStorage.getItem('token')
      return params = token
    },
    async postLogin(payload) {
      try {
        const response = await postLogin(payload)

        const token = response.user.token
        this.user.token = token
        if(token) {
          localStorage.setItem("token", token)
          delete response.user.token
          localStorage.setItem("user", JSON.stringify(response.user))
          this.user.authenticated = true
        }

        return response
      } catch (error) {
        throw new Error('Error login');
      }
    },
    async getUser(token) {
      try {
        const token = localStorage.getItem('token')
        return await getUserData(token)
      } catch (error) {
        throw new Error('Error to get user infos');
      }
    }
  }
})
