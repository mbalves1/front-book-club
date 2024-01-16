<template>
  <div class="flex">
    <div v-if="isLoading"> ... carregando </div>
    <div class="flex my-10">
      <img :src="book.image" alt="">
      <div class="ml-5">
        <div class="text-2xl">{{ book.title }}</div>
        <sub class="text-grey text-xl font-bold">{{ book.author }}</sub>
        <div class="mt-4">
          {{ book.content }}
        </div>
        <div class="mt-4">
          Criador do grupo: {{ book.user.username }}
        </div>
      </div>
    </div>
  </div>
  <div class="sm:w-1200px">
    <div v-for="(book, bx) in booksCommentNewArray" :key="bx">
      <div class="flex items-center">
        <img :src="book.user.image || '/user.avif'" alt="" srcset="" class="w-50px">
        <div class="flex items-start">
          <div class="flex flex-col">
            <div class="font-bold">{{ book.user.username }} </div>
            <div class="text-xs">{{ formatDate(book.createdAt) }}</div>
          </div>
          <div class="text-black ml-1">{{ book.content }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-10 mt-1">
    <div class="">
      <div class="flex items-center">
        <img :src="userLogged.image || '/user.avif'" class="w-50px">
        <div class="mr-2 font-bold">
          {{ userLogged.username }}
        </div>
        <v-text-field
          density="compact"
          variant="outlined"
          hide-details
          append-inner-icon="mdi-pencil"
          v-model="comment"
          v-on:keyup.enter="sendComment"
          ></v-text-field>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    script: [
      {
        src: "~/public/data.json",
        type: "module"
      }
    ]
  }
};
</script>
<script setup>

const router = useRoute();
const { getBookBySlug } = useBooksStore()
const  { postComment } = useCommentStore()

const isLoading = ref(true);
const book = ref({
  image: '',
  title: '',
  content: '',
  user: {
    username: '',
    image: ''
  },
  comments: []
})
const userLogged = ref({})
const comment = ref('')

onBeforeMount(async() => {
  await fetchDataBook()
  isLoading.value = false;
  const user = localStorage.getItem('user')
  userLogged.value = JSON.parse(user)
})

const fetchDataBook = async () => {
  try {
    const response = await getBookBySlug(router.path)
    book.value = {
      image: response.book?.bookcover,
      title: response.book?.title,
      content: response.book?.content,
      user: {
        username: response.book?.admingroup.username,
        image: response.book?.admingroup.image
      },
      comments: response.book?.comments
    }
  } catch (error) {
    console.error(error);
  }
}

const booksCommentNewArray = computed(() => {
  return [...book.value.comments]
})

const sendComment = async () => {
  try {
    const response = await postComment(router.path, comment.value)

    if (response.comment.id) {
      book.value.comments.push({
        content: comment.value,
        createdAt: new Date(),
        user: {
          id: '',
          email: '',
          username:  userLogged.value.username,
          bio: '',
          image: userLogged.value.image
        }
      })
      comment.value = ''
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
