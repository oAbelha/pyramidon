<template>
  <v-app theme="dark"> 
      <v-row class="h-screen align-center justify-center">
        <v-card width="750">
          <v-card-title class="text-center">
            <h1>{{ !login ? 'Criar Conta' : 'Entrar' }}</h1>
          </v-card-title>

          <v-card-text>
            <v-window v-model="window">

              <v-window-item value="1" class="justify-center">
                <v-col>
                  <v-text-field v-model="nome" label="Nome" prepend-icon="mdi-account" />
                  <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" />
                  <v-text-field v-model="senha" label="Senha" prepend-icon="mdi-lock" :type="show1 ? 'password' : 'text'" :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show1 = !show1" />
                  <v-text-field v-model="confirmsenha" label="Confirmar Senha" prepend-icon="mdi-lock-check" :type="show2 ? 'password' : 'text'" :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show2 = !show2" />
                  <v-text-field v-model="chaveCrypto" label="Chave Crypto" prepend-icon="mdi-key" />
                </v-col>
              </v-window-item>

              <v-window-item value="2" class="justify-center">
                <v-col>
                  <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" />
                  <v-text-field v-model="senha" label="Senha" prepend-icon="mdi-lock" :type="show1 ? 'password' : 'text'" :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="show1 = !show1" />
                </v-col>
              </v-window-item>

            </v-window>
          </v-card-text>

          <v-card-actions>
            <v-col class="align-center d-flex flex-column ga-5" >
              <v-btn @click="login ? validaLogin() : criaConta()" variant="outlined" color="red" class="font-weight-bold w-25" >
                <span>{{ login ? 'Entrar' : 'Criar conta'  }}</span>
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
  nome: 'login',
  data() {
    return {
      window: 1,
      login: true,
      email: null,
      nome: null,
      senha: null,
      confirmsenha: null,
      show1: false,
      show2: false,
      chaveCrypto: null,
    };
  },

  methods: {
    async criaConta() {
      try {
        const req = {
          nome: this.nome,
          email: this.email,
          senha: this.senha,
          chaveCrypto: this.chaveCrypto,
        };
        const response = await this.$api.post('/contas/post', req);
        
        if(response.data.type === 'success') {
          
          localStorage.setItem('conta', JSON.stringify(response.data.data));
          this.$router.push('organizacoes');
        }
      } catch (error) {
        console.log(error);
      }
    },

    async validaLogin() {
      try {
        const req = {
          email: this.email,
          senha: this.senha,
        };

        const { data } = await this.$api.post(`/contas/login`, req);
        console.log(data.message);
        
        if(data.type === 'success') {
          localStorage.setItem('conta', JSON.stringify(data.data));
          this.$router.push({ name: 'organizacoes' });
        }
      }
      catch(err) {
        console.log(err);
      }
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
