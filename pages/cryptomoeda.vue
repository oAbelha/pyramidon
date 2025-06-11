<template>
  <v-container fluid class="pa-5">
    <header>
      <div class="d-flex align-center justify-space-between">
        <h2>Cryptomoeda</h2>
        <v-btn color="yellow" @click="dialog = true">Nova moeda</v-btn>
      </div>
    </header>
    <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="moedas" :key="moedas.length"
      no-data-text="Nenhuma moeda registrada!" items-per-page-text="Moedas por página"
      :page-text="`Total de moedas: ${moedas.length}`" page="1">
      <template v-slot:top>
        <h2 class="pa-3">Gerenciar moedas crypto</h2>
      </template>
      <template v-slot:item.nome="{ item }">
        <span>${{ item.nome }}</span>
      </template>
      <template v-slot:item.valor="{ item }">
        <span>R$ {{ item.valor }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small color="blue" @click="editar(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="deletar(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="750">
      <v-card>
        <v-card-title>
          <h1>{{ modoEdicao ? 'Modo de Edição' : 'Crie uma nova moeda' }}</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="moeda.nome"
            label="nome"
          ></v-text-field>
          <v-text-field
            v-model="moeda.tagMercado"
            label="tag de mercado"
          ></v-text-field>
          <v-text-field
            v-model="moeda.quantidadeDisponivel"
            label="quantidade disponível"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="moeda.valor"
            label="valor inicial"
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-btn color="red" @click="fechaDialog">voltar</v-btn>
          <v-btn color="blue" @click="persist">{{ modoEdicao ? 'salvar' : 'criar' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'cryptomoeda',
  layout: 'LayoutNavBar',

  data() {
    return {
      dialog: false,
      modoEdicao: false,
      moeda: {},
      moedas: [
        {
          nome: 'Pyramidcoin',
          tagMercado: 'PYD',
          quantidadeDisponivel: 100,
          quantidadePossuida: 100,
          valor: 0.015,
          aberta: 'SIM',
        },
        {
          nome: 'Pyramidcoin',
          tagMercado: 'PYD',
          quantidadeDisponivel: 100,
          quantidadePossuida: 100,
          valor: 0.015,
          aberta: 'SIM',
        },
        {
          nome: 'Pyramidcoin',
          tagMercado: 'PYD',
          quantidadeDisponivel: 100,
          quantidadePossuida: 100,
          valor: 0.015,
          aberta: 'SIM',
        },
        {
          nome: 'Pyramidcoin',
          tagMercado: 'PYD',
          quantidadeDisponivel: 100,
          quantidadePossuida: 100,
          valor: 0.015,
          aberta: 'SIM',
        },
      ],
      headers: [
        { title: "nome", value: "nome", align: "center" },
        { title: "mercado", value: "tagMercado", align: "center" },
        { title: "quantidade disponível", value: "quantidadeDisponivel", align: "center", width: "10%" },
        { title: "quantidade possuída", value: "quantidadePossuida", align: "center", width: "10%" },
        { title: "valor", value: "valor", align: "center" },
        { title: "aberta", value: "aberta", align: "center" },
        { title: "organização", value: "idOrganizacao", align: "center" },
        { title: "Ações", value: "actions", align: "center" },
      ]
    }
  },

  methods: {
    editar(item) {
      this.modoEdicao = true;
      this.moeda = item;
      this.dialog = true;
    },

    fechaDialog() {
      this.moeda = {};
      this.modoEdicao = false;
      this.dialog = false;
    },

    async deletar(id) {
      try {
        const response = await this.$api.delete(`/crypto/delete/${id}`);
      }
      catch(err) {
        console.log(err);
      }
    },

    async persist() {
      if(this.modoEdicao) {

      } else {
        const req = {

        }
      }
    },
  }
}
</script>

<style>

</style>