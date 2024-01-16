<template>
  <v-form ref="refForm" class="my-10">
    <v-row>
      <v-col cols="12" lg="4">
        <div v-if="!newBook.bookcover" class="flex justify-center rounded text-grey">
          <div class="border rounded h-210px w-200px"></div>
        </div>
        <img v-else :src="newBook.bookcover" class="">
      </v-col>
      <v-col>
        <v-text-field
          variant="outlined"
          v-model="newBook.title"
          :rules="rules"
          label="Nome do livro"
          clearable
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newBook.author"
          :rules="rules"
          clearable
          label="Nome do author"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newBook.description"
          :rules="rules"
          clearable
          label="Descrição"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newBook.bookcover"
          :rules="rules"
          hint="Copie e cole a url do endereço da imagem"
          clearable
          label="Foto da capa"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
        size="large"
        type="submit"
        color="grey"
        class="mt-2 w-full"
        variant="tonal"
        text="Voltar"
      ></v-btn>
      </v-col>
      <v-col>
        <v-btn
        size="large"
        :loading="loading"
        type="submit"
        color="green"
        class="mt-2 w-full"
        variant="tonal"
        text="Criar grupo"
        @click.prevent="createBook"
      ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup>
 const { postNewBook } = useBooksStore()

const loading = ref(false)
const newBook = ref({
  title: '',
  author: '',
  description: '',
  bookcover: ''
})

const createBook = async () => {
  loading.value = true
  const books = {
    books: {
      ...newBook.value,
    }
  }
  try {
    const resp = await postNewBook(books)
    loading.value = false
    return resp
  } catch (error) {
    loading.value = false
    console.error(error);
  }
}
</script>
