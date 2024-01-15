<template>
  <div class="w-full">
    Home
  </div>
  <div class="sm:w-1200px">
    <div
      v-for="({ title, bookcover, author, slug }, bx) in booksData"
      :key="bx"
      class="w-full"
    >
      <div @click="goToBook(slug)" class="cursor-pointer">
        <div class="border border-2">
          <div class="flex">
            <img :src="bookcover" alt="">
            <div class="flex flex-col mt-3">
              <div class="text-black">{{ title }}</div>
              <sub>{{ author }}</sub>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
})

const router = useRouter();

const { getAllBooks, getBookBySlug } = useBooksStore()
const booksData = ref([])
const booksCountData = ref([])

onMounted(async () => {
  const response = await fecthDataBooks()
  const { books, booksCount } = response
  booksData.value = books
  booksCountData.value = booksCount
})

const fecthDataBooks = async () => {
  try {
    return await getAllBooks()
  } catch (e) {
    console.error(e);
  }
}

const goToBook = async (slug) => {
  const response = await getBookBySlug(slug)
  console.log("aqui", response)
  router.push({path: `${slug}`})
}
</script>
