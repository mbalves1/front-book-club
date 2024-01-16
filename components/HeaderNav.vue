<template>
  <div class="max-w-1200px flex justify-between items-center mx-auto h-10vh">
    <div>
      log
    </div>
    <div class="">
      <div class="flex justify-between">
        <div class="mr-5 cursor-pointer" @click="goTo('home')">Home</div>
        <div class="mr-5 cursor-pointer">Sign In</div>
        <div class="mr-5 cursor-pointer">Sign Out</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()

const goTo = (params) => {
  router.push({ path: `/${params}`})
}

</script>
