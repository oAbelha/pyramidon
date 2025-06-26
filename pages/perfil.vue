<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Perfil</h2>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex flex-column ga-5">
          <h2>Email: {{ conta.email }}</h2>
          <h2>Nome: {{ conta.nome }}</h2>
          <h2>CryptoKey: {{ conta.chaveCrypto }}</h2>
          <v-btn class="w-25" @click="dialogEditaPerfil = true">Editar Perfil</v-btn>
        </v-col>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogEditaPerfil" width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">Novas Informações</h3>
            <v-icon @click="dialogEditaPerfil = false" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field v-model="conta.email" hide-details variant="outlined" label="Novo Email" />
            <v-text-field v-model="conta.nome" hide-details variant="outlined" label="Novo Nome" />
            <v-text-field v-model="conta.chaveCrypto" hide-details variant="outlined" label="Nova CriptoKey" />
            <v-text-field v-model="conta.senha" :type="show ? 'text' : 'password'" hide-details variant="outlined" label="Nova Senha"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="show = !show" />
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="editaPerfil" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "perfil",
  layout: "LayoutNavBar",

  data() {
    return {
      dialogEditaPerfil: false,
      modoEdicao: false,
      conta: JSON.parse(localStorage.getItem('conta')),
      show: false,
    };
  },

  methods: {
    async carregaPerfil() {
      try {
        const { data } = await this.$api.get(`/contas/get/${this.conta.id}`);
        console.log(data.message);
        if(data.type === 'success') {
          this.conta = data.data;
          localStorage.setItem('conta', JSON.stringify(this.conta));
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editaPerfil() {
      try {
        const { data } = await this.$api.patch(`/contas/patch/${this.conta.id}`, this.conta);
        console.log(data.message);
        await this.carregaPerfil();
        this.dialogEditaPerfil = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
