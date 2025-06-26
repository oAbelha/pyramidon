<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Marketing</h2>
        <v-btn color="yellow" text="Nova rede social" @click="dialogNovaRedeSocial = true" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="redesSociais" :key="redesSociais.length"
          no-data-text="Nenhuma rede social cadastrada!" items-per-page-text="Redes sociais por página"
          :page-text="`Total de redes sociais: ${redesSociais.length}`" page="1">
          <template v-slot:top>
            <h2 class="pa-3">Gerencie suas redes</h2>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="blue" @click="editarRedeSocial(item)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deletarRedeSocial(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogNovaRedeSocial" persistent width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">{{ modoEdicao == true ? "Editar rede social" : "Nova rede social" }}</h3>
            <v-icon @click="close" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field v-model="perfilRedes.nomeRedeSocial" hide-details variant="outlined" label="Nome da rede social" />
            <v-text-field v-model="perfilRedes.nomePerfil" hide-details variant="outlined" label="Nome do perfil" />
            <v-text-field v-model="perfilRedes.arrobaPerfil" hide-details variant="outlined" label="Arroba do perfil" />
            <v-text-field v-model="perfilRedes.linkAcesso" hide-details variant="outlined" label="Link de acesso" />
            <v-autocomplete v-model="perfilRedes.responsavel" hide-details variant="outlined" label="Responsável pela rede social"
              :items="funcionarios"
              item-title="nome"
              item-value="id"
              no-data-text="Não há funcionarios"
            ></v-autocomplete>
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="persistRedesSociais" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "marketing",
  layout: "LayoutNavBar",

  data() {
    return {
      dialogNovaRedeSocial: false,
      modoEdicao: false,
      funcionarios: [],
      redesSociais: [],
      perfilRedes: {},
      headers: [
        { title: "Rede social", value: "nomeRedeSocial", align: "center" },
        { title: "Perfil", value: "nomePerfil", align: "center" },
        { title: "@ do perfil", value: "arrobaPerfil", align: "center" },
        { title: "Link de acesso", value: "linkAcesso", align: "center", width: "600" },
        { title: "Responsável", value: "responsavel", align: "center" },
        { title: "Ações", value: "actions", align: "center", width: "100" },
      ],
    };
  },

  async created() {
    await this.listarPerfisMarketing();
  },

  methods: {
    async listarPerfisMarketing() {
      try {
        const { data } = await this.$api.get("/marketing/get");
        this.redesSociais = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async persistRedesSociais() {
      try {
        const request = {
          nomeRedeSocial: this.perfilRedes.nomeRedeSocial,
          nomePerfil: this.perfilRedes.nomePerfil,
          arrobaPerfil: this.perfilRedes.arrobaPerfil,
          linkAcesso: this.perfilRedes.linkAcesso,
          responsavel: this.perfilRedes.responsavel,
        };

        if (!this.validacoesCadastro(request)) return;

        if (this.perfilRedes.id) {
          const { data } = await this.$api.patch(`/marketing/patch/${this.perfilRedes.id}`, request);
          console.log(data.message);
        } else {
          const { data } = await this.$api.post(`/marketing/post`, request);
          console.log(data.message);
        }

        this.dialogNovaRedeSocial = false;
        this.perfilRedes = {};

        await this.listarPerfisMarketing();
      } catch (error) {
        console.log(error);
      }
    },

    async deletarRedeSocial(item) {
      try {
        await this.$api.delete(`/marketing/delete/${item.id}`);
        await this.listarPerfisMarketing();
      } catch (error) {
        alert("Erro ao deletar rede social: ", error);
        console.log("Erro: ", error);
      }
    },

    editarRedeSocial(item) {
      this.modoEdicao = true;
      this.dialogNovaRedeSocial = true;
      this.perfilRedes = { ...item };
    },

    close() {
      this.dialogNovaRedeSocial = false;
      this.perfilRedes = {};
      this.modoEdicao = false;
    },

    validacoesCadastro(item) {
      if (!item.nomeRedeSocial) {
        alert("Insira o nome da rede social");
        return;
      }

      if (!item.nomePerfil) {
        alert("Insira o nome do perfil");
        return;
      }

      if (!item.arrobaPerfil) {
        alert("Insira o arroba do perfil!");
        return;
      }

      if (!this.URLValida(item.linkAcesso)) {
        alert("Informe uma URL valida para a rede social!");
        return;
      }

      if (!item.responsavel) {
        alert("Informe quem é o funcionário responsável pelo perfil dessa rede!");
        return;
      }

      return true;
    },

    URLValida(str) {
      try {
        new URL(str);
        return true;
      } catch (_) {
        return false;
      }
    },
  },
};
</script>