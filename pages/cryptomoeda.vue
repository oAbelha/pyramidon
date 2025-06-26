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
      <template v-slot:item.aberta="{ item }">
        <span>{{ item.aberta ? 'SIM' : 'NÃO' }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon color="yellow" @click="abreDialogAbreFechaMoeda(item)">mdi-information</v-icon>
        <v-icon small color="blue" @click="editar(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="deletar(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
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

    <v-dialog
      v-model="dialogAbreFechaMoeda"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          {{ moeda.aberta ? 'Fechar a moeda?' : 'Abrir a moeda?'}}
        </v-card-title>
        <v-card-actions>
          <v-btn color="red" @click="dialogAbreFechaMoeda = false; moeda = {};">não</v-btn>
          <v-btn color="blue" @click="abreFechaMoeda">sim</v-btn>
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
      dialogAbreFechaMoeda: false,
      modoEdicao: false,
      moeda: {},
      moedas: [],
      headers: [
        { title: "nome", value: "nome", align: "center" },
        { title: "mercado", value: "tagMercado", align: "center" },
        { title: "quantidade disponível", value: "quantidadeDisponivel", align: "center", width: "10%" },
        { title: "quantidade possuída", value: "quantidadePossuida", align: "center", width: "10%" },
        { title: "valor", value: "valor", align: "center" },
        { title: "aberta", value: "aberta", align: "center" },
        { title: "Ações", value: "actions", align: "center" },
      ]
    }
  },

  async created() {
    await this.getMoedas();
  },

  methods: {
    async getMoedas() {
      try {
        const { data } = await this.$api.get(`crypto/get`);
        this.moedas = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    abreDialogAbreFechaMoeda(item) {
      this.moeda = item;
      this.dialogAbreFechaMoeda = true;
    },

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
        const { data } = await this.$api.delete(`/crypto/delete/${id}`);

        if(data.type === 'success') {
          console.log('Item deletado com sucesso');
        }

        await this.getMoedas();
      }
      catch(err) {
        console.log(err);
      }
    },

    async persist() {
      try {
        const req = {
          nome: this.moeda.nome,
          tagMercado: this.moeda.tagMercado,
          quantidadeDisponivel: this.moeda.quantidadeDisponivel,
          quantidadePossuida: this.moeda.quantidadeDisponivel,
          valor: this.moeda.valor,
          aberta: false,
          idOrganizacao: 1,
        }
  
        if(this.modoEdicao) {
          const { data } = await this.$api.patch(`/crypto/patch/${this.moeda.id}`, req);
  
          if(data.type === 'success') {
            console.log('Requisição deu certo');
          }
        } else {
          const { data } = await this.$api.post(`/crypto/post`, req);
  
          if(data.type === 'success') {
            console.log('Requisição deu certo');
          }
        }

        await this.getMoedas();
        this.fechaDialog();
      }
      catch(err) {
        console.log(err);
      }
    },

    async abreFechaMoeda() {
      try {
        const { data } = await this.$api.patch(`/crypto/patch/abre-fecha-moeda/${this.moeda.id}`);

        if(data.type === 'success') {
          console.log('Status da moeda foi alterado com sucesso');
        }

        await this.getMoedas();
        this.dialogAbreFechaMoeda = false;
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>

</style>