<template>
  <v-app theme="dark">
    <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card
      class="pa-12"
      elevation="0"
      max-width="800"
      style=" border: 1px solid #fcee09;"
    >
      <h2 class="text-center mb-4" style="color: white;">ENTRAR</h2>

      <v-slide-x-transition>
        <v-window v-model="window" class="d-flex">
          <!-- CRIAR CONTA -->
          <v-window-item value="signup">
            <v-card class="pa-16" style=" border: 1px solid yellow;">
              <v-text-field v-model="signup.name" label="Nome" outlined  hide-details class="custom-input" prepend-icon="mdi-account" />
              <v-text-field v-model="signup.email" label="Email" outlined  hide-details class="custom-input" prepend-icon="mdi-email" />
              <v-text-field v-model="signup.password" label="Senha" outlined  type="password" hide-details class="custom-input" prepend-icon="mdi-lock" />
              <v-text-field v-model="signup.confirmPassword" label="Confirmar Senha" outlined  type="password" hide-details class="custom-input" prepend-icon="mdi-lock-check" />
              <v-text-field v-model="signup.cryptoKey" label="Chave Crypto" outlined  hide-details class="custom-input" prepend-icon="mdi-key" />
              <v-btn class="mt-10" block @click="createAccount" variant="outlined" style="color: #00ffff; border-color: red;" :disabled="loading">
                <template v-if="loading">
                  <v-progress-circular indeterminate color="#00ffff" size="20" />
                </template>
                <template v-else>
                  CRIAR CONTA
                </template>
              </v-btn>
            </v-card>
          </v-window-item>

          <!-- LOGIN -->
          <v-window-item value="login">
            <v-card class="pa-16" style=" border: 1px solid yellow;">
              <v-text-field v-model="login.email" label="Email" outlined  hide-details class="custom-input" prepend-icon="mdi-email" />
              <v-text-field v-model="login.password" label="Senha" outlined  type="password" hide-details class="custom-input" prepend-icon="mdi-lock" />
              <v-btn class="mt-10" block @click="loginUser" variant="outlined" style="color: #00ffff; border-color: red;" :disabled="loading">
                <template v-if="loading">
                  <v-progress-circular indeterminate color="#00ffff" size="20" />
                </template>
                <template v-else>
                  INFILTRAR
                </template>
              </v-btn>
            </v-card>
          </v-window-item>
        </v-window>
      </v-slide-x-transition>

      <v-row justify="center" class="mt-6">
        <v-btn variant="text" @click="toggleWindow" style="color: #fcee09; font-weight: bold;">
          {{ window === 'login' ? 'CRIAR CONTA' : 'JÁ TENHO CONTA' }}
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
  </v-app>
</template>

<script>

definePageMeta({
  layout: false,
});

import axios from 'axios'

export default {
  data() {
    return {
      window: 'login',
      loading: false,
      login: {
        email: '',
        password: ''
      },
      signup: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        cryptoKey: ''
      }
    }
  },
  methods: {
    toggleWindow() {
      this.window = this.window === 'login' ? 'signup' : 'login'
    },
    async loginUser() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3001/users', {
          params: {
            email: this.login.email,
            password: this.login.password
          }
        })
        if (res.data.length) {
          alert('Login bem-sucedido!')
        } else {
          alert('Credenciais inválidas!')
        }
      } catch (err) {
        alert('Erro ao fazer login.')
      } finally {
        this.loading = false
      }
    },
    async createAccount() {
      if (this.signup.password !== this.signup.confirmPassword) {
        return alert('Senhas não coincidem!')
      }

      this.loading = true
      try {
        await axios.post('http://localhost:3001/users', {
          name: this.signup.name,
          email: this.signup.email,
          password: this.signup.password,
          cryptoKey: this.signup.cryptoKey
        })

        alert('Conta criada com sucesso!')
        this.toggleWindow()
      } catch (err) {
        alert('Erro ao criar conta.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
::v-deep(.custom-input) .v-input__control {
  border-color: #ff007f;
}



</style>
