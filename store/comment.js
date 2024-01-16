import { defineStore } from 'pinia'
import { postComment } from '../server/comment-api'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comment: [],
    token: ''
  }),
  actions: {
    getToken() {
      const token = localStorage.getItem('token')
      return token
    },
    async postComment(slug, content) {
      const payload = {
        token: this.getToken(),
        slug,
        body: {
          "comments": {
            "content": content
          }
        }
      }
      try {
        const response = await postComment(payload)
        return response
      } catch (error) {
        throw new Error('Error to post comments')
      }
    }
  }
})
