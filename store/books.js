import { defineStore } from 'pinia'
import { getAllBooks, getBookBySlug, postNewBook } from '../server/book-api'

export const useBooksStore = defineStore('book', {
  state: () => ({
    books: [],
    booksCount: 0,
    token: ''
  }),
  actions: {
    getToken() {
      const token = localStorage.getItem('token')
      return token
    },
    async getAllBooks(payload) {
      try {
        const { books, booksCount } = await getAllBooks(payload)

        return { books, booksCount }
      } catch (error) {
        throw new Error('Error to get all books');
      }
    },
    async getBookBySlug(slug) {
      this.getToken()
      const payload = {
        token: this.getToken(),
        slug
      }
      try {
        const response = await getBookBySlug(payload)
        return response
      } catch (error) {
        throw new Error('Error to get book');
      }
    },
    async postNewBook(books) {
      this.getToken()
      const payload = {
        token: this.getToken(),
        body: books
      }
      try {
        const response = await postNewBook(payload)
        return response
      } catch (error) {
        console.error(error);
        throw new Error('Error to create a book');
      }
    }
  }
})
