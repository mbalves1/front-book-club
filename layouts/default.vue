<template>
  <v-app>
    <div>
      <HeaderNav></HeaderNav>
    </div>
    <div class="bg-green">
      <HeaderContent></HeaderContent>
    </div>

    <div class="max-w-1200px mx-auto">
      <slot></slot>
    </div>
  </v-app>
</template>
