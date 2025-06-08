<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Marketing</h2>
        <v-btn color="yellow" text="Nova rede social" @click="dialogNovaRedeSocial = true" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="redesSociais" :key="redesSociais.length" no-data-text="Nenhuma rede social cadastrada!" items-per-page-text="Redes sociais por página" :page-text="`Total de redes sociais: ${redesSociais.length}`" page="1">
          <template v-slot:top>
            <h2 class="pa-3">Gerencie suas redes</h2>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="blue" @click="editarRedeSocial(item)">mdi-pencil</v-icon>
            <v-icon small color="red"  @click="deletarRedeSocial(item)">mdi-delete</v-icon>
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
            <v-text-field   v-model="nomeRedeSocial" hide-details variant="outlined" label="Nome da rede social" />
            <v-text-field   v-model="nomePerfil"     hide-details variant="outlined" label="Nome do perfil" />
            <v-text-field   v-model="arrobaPerfil"   hide-details variant="outlined" label="Arroba do perfil" />
            <v-text-field   v-model="linkRedeSocial" hide-details variant="outlined" label="Link de acesso" />
            <v-text-field   v-model="responsavel"    hide-details variant="outlined" label="Responsável pela rede social" /> 
            <!-- Fazer a lógica para o campo resposável utilizando v-autocomplete, pois o mesmo deve ser preenchido com um id que vem da tabela funcionários. -->
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="persistRedesSociais"/>
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
      RedeSocialSelecionada: null,
      nomeRedeSocial: null,
      linkRedeSocial: null,
      arrobaPerfil: null,
      nomePerfil: null,
      id: null, 
      headers: [
        { title: "Rede social",    value: "nome_rede_social", align: "center" },
        { title: "Perfil",         value: "nome_perfil",      align: "center" },
        { title: "@ do perfil",    value: "arroba_perfil",    align: "center" },
        { title: "Link de acesso", value: "link_acesso",      align: "center" },
        { title: "Responsável",    value: "responsavel",      align: "center" },
        { title: "Ações",          value: "actions",          align: "center", width: "100" },
      ],
      redesSociais: [],
    };
  },

  async created() {
    await this.listarPerfisMarketing();
  },

  methods: {
    async listarPerfisMarketing() {
      try {
        const { data: response } = await this.$api.get("/marketing/get");
        this.redesSociais = response.data;
      } catch (error) {
        alert("Não foi possível listar as redes sociais!");
        console.log("Erro: ", error);
      };
    },

    async persistRedesSociais() {
      try {
        const request = {
          nome_rede_social: this.nomeRedeSocial,
          arroba_perfil: this.arrobaPerfil,
          link_acesso: this.linkRedeSocial,
          responsavel: this.responsavel,
          nome_perfil: this.nomePerfil,
        };

        if (this.id) {
          await this.$api.patch(`/marketing/patch/${this.id}`, request);
        } else {
          await this.$api.post(`/marketing/post`, request);
        }

        this.nomeRedeSocial = null;
        this.linkRedeSocial = null;
        this.arrobaPerfil = null;
        this.responsavel = null;
        this.nomePerfil = null;

        await this.listarPerfisMarketing();
      } catch (error) {
        alert("Erro ao listar redes sociais: ", error);
        console.log("Erro: ", error);
      };
    },

    async deletarRedeSocial(item) {
      try {
        await this.$api.delete(`/marketing/delete/${item.id}`);
        await this.listarPerfisMarketing();
      } catch (error) {
         alert("Erro ao deletar rede social: ", error);
        console.log("Erro: ", error);
      };
    },

    editarRedeSocial(item) {
      this.dialogNovaRedeSocial = true;
      this.modoEdicao = true;
      this.nomeRedeSocial = item.nome_rede_social;
      this.arrobaPerfil = item.arroba_perfil;
      this.linkRedeSocial = item.link_acesso;
      this.responsavel = item.responsavel
      this.nomePerfil = item.nome_perfil;
      this.id = item.id;
    },

    close() {
      this.dialogNovaRedeSocial = false;
      this.modoEdicao = false;
      this.linkRedeSocial = null;
      this.nomeRedeSocial = null;
      this.arrobaPerfil = null;
      this.responsavel = null;
      this.nomePerfil = null;
      this.id = item.id;
    },
  },
};
</script>
