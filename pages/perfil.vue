<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Perfil</h2>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex flex-column ga-5">
          <h2>Email: {{ perfil.email }}</h2>
          <h2>Nome: {{ perfil.nome }}</h2>
          <h2>CryptoKey: {{ perfil.chave_crypto }}</h2>
          <h2>Role: {{ perfil.role }}</h2>
          <v-btn class="w-25" @click="abreEdicaoPerfil(perfil)">Editar Perfil</v-btn>
        </v-col>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogEditaPerfil" persistent width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">Novas Informações</h3>
            <v-icon @click="close" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field v-model="email" hide-details variant="outlined" label="Novo Email" />
            <v-text-field v-model="nomePerfil" hide-details variant="outlined" label="Novo Nome" />
            <v-text-field v-model="cryptokey" hide-details variant="outlined" label="Nova CriptoKey" />
            <v-text-field v-model="password" hide-details variant="outlined" label="Nova Senha" />
            <v-autocomplete v-model="role" :items="roles" hide-details variant="outlined" label="Role" />
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
      email: null,
      password: null,
      cryptokey: null,
      nomePerfil: null,
      role: null,
      id: null,
      perfil: {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: '8d969eef6ecad3c29a3a629280e686cf',
        chave_crypto: '0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12',
        role: 'admin'
      },
      roles: ['admin', 'funcionario', 'colaborador'],
    };
  },

  methods: {
    async carregaPerfil() {
      try {
        const { data: response } = await this.$api.get("/contas/get");
        this.perfil = response.data;
      } catch (error) {
        alert("Não foi possível listar as informações do Perfil!");
        console.log("Erro: ", error);
      }
    },

    async editaPerfil() {
      try {
        const request = {
          email: this.email,
          chave_crypto: this.cryptokey,
          password: this.password,
          nome: this.nomePerfil,
          role: this.role,
        };

        if (this.id) {
          await this.$api.patch(`/contas/patch/${this.id}`, request);
        }

        this.email = null;
        this.password = null;
        this.cryptokey = null;
        this.nomePerfil = null;
        this.role = null;
        this.id = null;
        this.dialogEditaPerfil = false;

        await this.carregaPerfil();
      } catch (error) {
        alert("Erro ao carregar Perfil: ", error);
        console.log("Erro: ", error);
      }
    },

    async deletarPerfil(item) {
      try {
        await this.$api.delete(`/contas/delete/${item.id}`);
        await this.carregaPerfil();
      } catch (error) {
        alert("Erro ao deletar Perfil: ", error);
        console.log("Erro: ", error);
      }
    },

    abreEdicaoPerfil(item) {
      this.dialogEditaPerfil = true;
      this.modoEdicao = true;
      this.email = item.email;
      this.cryptokey = item.chave_crypto;
      this.password = item.senha || null;
      this.nomePerfil = item.nome;
      this.role = item.role;
      this.id = item.id;
    },

    close() {
      this.dialogEditaPerfil = false;
      this.modoEdicao = false;
      this.email = null;
      this.password = null;
      this.cryptokey = null;
      this.nomePerfil = null;
      this.role = null;
      this.id = null;
    },
  },
};
</script>
