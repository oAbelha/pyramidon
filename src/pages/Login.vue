<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card
      class="pa-8"
      elevation="0"
      max-width="800"
      style="background-color: #0f0f0f; border: 1px solid #fcee09;"
    >
      <h2 class="text-center mb-6" style="color: white;">ENTRAR</h2>

      <v-window v-model="window" class="d-flex">
        <!-- CRIAR CONTA -->
        <v-window-item value="signup">
          <v-card class="pa-4" style="background-color: #121212; border: 1px solid yellow;">
            <v-text-field v-model="signup.name" label="Nome" outlined dense hide-details class="custom-input" />
            <v-text-field v-model="signup.email" label="Email" outlined dense hide-details class="custom-input" />
            <v-text-field v-model="signup.password" label="Senha" outlined dense type="password" hide-details class="custom-input" />
            <v-text-field v-model="signup.confirmPassword" label="Confirmar Senha" outlined dense type="password" hide-details class="custom-input" />
            <v-text-field v-model="signup.cryptoKey" label="Chave Crypto" outlined dense hide-details class="custom-input" />
            <v-btn class="mt-4" block @click="createAccount" variant="outlined" style="color: #00ffff; border-color: red;">
              CRIAR CONTA
            </v-btn>
          </v-card>
        </v-window-item>

        <!-- LOGIN -->
        <v-window-item value="login">
          <v-card class="pa-4" style="background-color: #121212; border: 1px solid yellow;">
            <v-text-field v-model="login.email" label="Email" outlined dense hide-details class="custom-input" />
            <v-text-field v-model="login.password" label="Senha" outlined dense type="password" hide-details class="custom-input" />
            <v-btn class="mt-4" block @click="loginUser" variant="outlined" style="color: #00ffff; border-color: red;">
              INFILTRAR
            </v-btn>
          </v-card>
        </v-window-item>
      </v-window>

      <v-row justify="center" class="mt-6">
        <v-btn variant="text" @click="toggleWindow" style="color: #fcee09; font-weight: bold;">
          {{ window === 'login' ? 'CRIAR CONTA' : 'JÁ TENHO CONTA' }}
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      window: 'login',
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
    },
    async createAccount() {
      if (this.signup.password !== this.signup.confirmPassword) {
        return alert('Senhas não coincidem!')
      }

      await axios.post('http://localhost:3001/users', {
        name: this.signup.name,
        email: this.signup.email,
        password: this.signup.password,
        cryptoKey: this.signup.cryptoKey
      })

      alert('Conta criada com sucesso!')
      this.toggleWindow()
    }
  }
}
</script>

<style scoped>
.custom-input >>> .v-input__control {
  border-color: #ff007f;
}
</style>
