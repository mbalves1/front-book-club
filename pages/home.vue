<template>
  <div class="w-full">
    <v-tabs
      v-model="tab"
    >
      <v-tab value="feed">Feed</v-tab>
      <v-tab value="forms">Create Group</v-tab>
    </v-tabs>
  </div>
  <div class="sm:w-1200px">
    <v-divider class="mb-4"></v-divider>
    <v-window v-model="tab">
      <v-window-item value="feed">
        <div
          v-for="({ title, bookcover, author, slug, admingroup, comments, description }, bx) in booksData"
          :key="bx"
          class="w-full"
        >
          <div @click="goToBook(slug)" class="cursor-pointer">
            <div class="flex justify-between">
              <div class="flex">
                <img :src="bookcover ? bookcover : '/defaultbook.avif'" alt="" class="w-40">
                <div class="flex flex-col mt-3 ml-5">
                  <div class="text-black text-xl">{{ title }}</div>
                  <sub class="text-grey font-bold">{{ author }}</sub>
                  <div class="mt-4">
                    {{ description }}
                  </div>
                  <div class="mt-4">
                    Criador do grupo: {{ admingroup.username }}
                  </div>
                </div>
              </div>
              <div class="mr-1 flex">
                <v-icon icon="mdi-comment-outline"></v-icon>
                <div>{{ comments.length }}</div>
              </div>
            </div>
            <v-divider class="my-4"></v-divider>
          </div>
        </div>
      </v-window-item>

      <v-window-item value="forms">
        <BookForms @redirect="redirect"></BookForms>
      </v-window-item>
    </v-window>
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
const tab = ref('feed')

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

  router.push({path: `${slug}`})
}

const redirect = (item) => {
  tab.value = item
}
</script>
