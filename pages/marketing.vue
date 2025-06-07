<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Marketing</h2>
        <v-btn color="yellow" text="Novo post" @click="dialogNovoPost = true" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="posts" :key="posts.length"
          no-data-text="Nenhum serviço inserido!" items-per-page-text="Posts por página"
          :page-text="`Total de posts: ${posts.length}`" page="1">
          <template v-slot:top>
            <h2 class="pa-3">Meus posts</h2>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="info" @click="verPost(item)">mdi-eye</v-icon>
            <v-icon small color="yellow" @click="editarPost(item)">mdi-pencil</v-icon>
            <v-icon small color="warning" @click="removePost(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogNovoPost" persistent width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">{{ modoEdicao == true ? "Editar Post" : "Novo Post" }}</h3>
            <v-icon @click="fecharPost" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field v-model="titulo" hide-details variant="outlined" label="Titulo" />
            <v-textarea v-model="descricao" hide-details variant="outlined" label="Descrição" />
            <v-autocomplete v-model="status" :items="['Ativo', 'Inativo']" hide-details variant="outlined"
              label="Status" />
            <v-text-field v-model="linkImagem" hide-details variant="outlined" label="Link da imagem" />
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExibePost">
      <v-card class="mx-auto" max-width="500">
        <v-img class="align-end text-white" height="200" :src="postSelecionado.link_imagem" cover />
        <v-card-text>
          <h2>{{ postSelecionado.titulo }}</h2>
          <h4>{{ postSelecionado.descricao }}</h4>
        </v-card-text>

        <v-card-actions class="justify-space-around">
          <v-btn color="red" text="Fechar" @click="dialogExibePost = false" />
          <v-btn :color="postSelecionado.status == 'Ativo' ? 'red' : 'green'"
            :text="postSelecionado.status == 'Ativo' ? 'Inativar' : 'Ativar'"
            @click="ativaInativaPost(postSelecionado)" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "marketing",
  layout: "LayoutNavBar",

  async created() { },

  data() {
    return {
      dialogExibePost: false,
      dialogNovoPost: false,
      modoEdicao: false,
      postSelecionado: null,
      titulo: null,
      descricao: null,
      status: null,
      linkImagem: null,
      headers: [
        { title: "Rede social", value: "nome_rede_social", align: "center" },
        { title: "Perfil", value: "nome_perfil", align: "center" },
        { title: "@ do perfil", value: "arroba_perfil", align: "center" },
        { title: "Link de acesso", value: "link_acesso", align: "center" },
        { title: "Responsável", value: "responsavel", align: "center" },
        { title: "Ações", value: "actions", align: "center", width: "100" },
      ],
      posts: [],
    };
  },

  async created() {
    await this.listarPerfisMarketing();
  },

  methods: {
    async listarPerfisMarketing() {
      const { data: response } = await this.$api.get("/marketing/get");
      console.log( response);
      
      this.posts = response.data;
    },

    verPost(item) {
      this.postSelecionado = item;
      this.dialogExibePost = true;
    },

    fecharPost() {
      this.modoEdicao = false;
      this.dialogNovoPost = false;
      this.titulo = null;
      this.status = null;
      this.descricao = null;
      this.linkImagem = null;
    },

    editarPost(item) {
      this.modoEdicao = true;
      this.dialogNovoPost = true;
      this.titulo = item.titulo;
      this.status = item.status;
      this.descricao = item.descricao;
      this.linkImagem = item.link_imagem;
    },
  },
};
</script>
