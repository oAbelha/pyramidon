<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Marketing</h2>
        <v-btn color="yellow" text="Novo post" @click="novoPost()" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10" :headers="headers" :items="posts" :key="posts.length"
          no-data-text="Nenhum serviço inserido!">
          <template v-slot:item.actions="{ item }">
            <v-icon small color="info" @click="verPost(item)">mdi-eye</v-icon>
            <v-icon small color="yellow">mdi-pencil</v-icon>
            <v-icon small color="warning">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogNovoPost" width="500">
      <v-card>
        <v-card-title>
          Novo post
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field variant="outlined" label="Titulo"></v-text-field>
              <v-text-field variant="outlined" label="Descrição"></v-text-field>
              <v-autocomplete variant="outlined" label="Status"></v-autocomplete>
              <v-text-field variant="outlined" label="Visualizações"></v-text-field>
              <v-text-field variant="outlined" label="Link da imagem"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-acton>
          <v-btn color="success" text="Salvar"></v-btn>
        </v-card-acton>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExibePost">
      <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" :src="postSelecionado.link_imagem" cover />
        <v-card-text>
          <h2>{{ postSelecionado.titulo }}</h2>
          <h4>{{ postSelecionado.descricao }}</h4>
        </v-card-text>

        <v-card-actions>
          <v-btn color="warning" text="Fechar" @click="dialogExibePost = false" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'marketing',
  layout: 'LayoutNavBar',

  data() {
    return {
      dialogExibePost: false,
      dialogNovoPost: false,
      postSelecionado: null,
      headers: [
        { title: "Titulo", value: "titulo", align: "center" },
        { title: "Descrição", value: "descricao", align: "center" },
        { title: "Status", value: "status", align: "center" },
        { title: "Visualizações", value: "visualizacoes", align: "center" },
        { title: "Imagem", value: "link_imagem", align: "center" },
        { title: "Ações", width: '95', value: "actions", align: "center" },
      ],
      posts: [
        {
          titulo: 'Promoção de Verão',
          descricao: 'Descontos especiais em todos os serviços até o final do mês.',
          status: 'Ativo',
          visualizacoes: 123,
          link_imagem: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
        },
        {
          titulo: 'Black Friday',
          descricao: 'Pacotes promocionais com até 70% de desconto.',
          status: 'Inativo',
          visualizacoes: 456,
          link_imagem: 'https://picsum.photos/500?image=3',
        },
        {
          titulo: 'Novo serviço',
          descricao: 'Agora oferecemos consultoria de marketing digital.',
          status: 'Ativo',
          visualizacoes: 89,
          link_imagem: 'https://picsum.photos/500?image=14',
        }
      ],
    };
  },

  methods: {
    seePost(item) {
      this.postSelecionado = item
      this.dialogExibePost = true
    },

    novoPost() {
      this.dialogNovoPost = true
    }
  },
}
</script>

<style></style>