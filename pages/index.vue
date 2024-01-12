<template>
  <div class="flex justify-center align-center h-100vh">
    <v-card class="border elevation-24 rounded-xl w-500px pa-10">
      <v-form ref="formRef">
        <div class="flex justify-center flex-col">
          <div>
            <div class="flex justify-center">
              <h3>Book Club</h3>
            </div>
            <v-text-field
              variant="outlined"
              density="compact"
              clearable
              label="E-mail"
              required
              :rules="[v => !!v || 'E-mail é obrigatório']"
              v-model="payload.user.email"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              density="compact"
              label="Password"
              class="mt-2"
              :rules="[v => !!v || 'Senha é obrigatória']"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              required
              v-model="payload.user.password"
            ></v-text-field>
          </div>

          <div>
            <v-btn
              variant="flat"
              block
              class="pa-3 border"
              color="green text-capitalize"
              @click="doLogin"
            >Join</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
<script setup>

const { postLogin } = useUserStore()

definePageMeta({
  layout: 'default'
})

const formRef = ref(null)
const payload = ref({
  user: {
    email: "mu@gmail.com",
    password: "123"
  }
})

const showPassword = ref(false)

const doLogin = async () => {
  const { valid } = await formRef.value.validate();
  // const valid = await formRef.value.validate();
  console.log("valid", valid)
  if (!valid) {
    return
  }
  try {
    console.log(payload.value)
    await postLogin(payload.value)
  }catch(error) {
    console .error(error)
  }
}

</script>
