<template>
  <v-app theme="dark"> 
      <v-row class="h-screen align-center justify-center">
        <v-card width="50%">
          <v-card-title class="text-center">
            <h1>{{ !login ? 'Criar Conta' : 'Entrar' }}</h1>
          </v-card-title>
          <v-card-text>
            <v-window v-model="window">
              <v-window-item value="1" class="justify-center">
                <v-col>
                  <v-text-field v-model="name" label="Nome" prepend-icon="mdi-account" />
                  <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" />
                  <v-text-field v-model="password" label="Senha" prepend-icon="mdi-lock" />
                  <v-text-field v-model="confirmPassword" label="Confirmar Senha" prepend-icon="mdi-lock-check" />
                  <v-text-field v-model="cryptokey" label="Chave Crypto" prepend-icon="mdi-key" />
                  <v-autocomplete v-model="role" :items="roles" label="Função" />
                </v-col>
              </v-window-item>
              <v-window-item value="2" class="justify-center">
                <v-col>
                  <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" />
                  <v-text-field v-model="password" label="Senha" prepend-icon="mdi-lock" />
                </v-col>
              </v-window-item>
            </v-window>
          </v-card-text>
          <v-card-actions>
            <v-col class="align-center d-flex flex-column ga-5" >
              <v-btn @click="validaLogin" variant="outlined" color="red" class="font-weight-bold w-25" >
                <span v-if="!loading">{{ !login ? 'Criar Conta' : 'Entrar'  }}</span>
                <template v-if="loading">
                  <v-progress-circular indeterminate color="blue" size="20" />
                </template>
              </v-btn>
              <v-btn :text="!login ? 'Ja Tenho Conta' : 'Nao Tenho Conta'" @click="controlaLogin" variant="outlined"
                color="yellow" class="font-weight-bold w-25" />
            </v-col>
          </v-card-actions>
        </v-card>
      </v-row>
  </v-app>
</template>

<script>
definePageMeta({
  layout: false,
});

export default {
  name: 'login',
  data() {
    return {
      window: 0,
      loading: false,
      login: false,
      email: null,
      name: null,
      password: null,
      confirmPassword: null,
      cryptokey: null,
      role: null,
      roles: ['funcionario', 'colaborador'],
    };
  },

  methods: {
    validaLogin() {
      if(this.login) {
        this.loading=true
        if(this.email==='teste@gmail.com' && this.password==='1234') {
          this.$router.push({name:'perfil'}) //mudar para tela de dashboard quando a mesma existir
          return
        };

        alert("Email ou senha incorretos")
        this.loading=false
        return
      };


    },
    
    controlaLogin() {
      if (!this.login) {
        this.window = 1
        this.login = true
      }
      else {
        this.window = 0
        this.login = false
      }
    }
  },
}

</script>
