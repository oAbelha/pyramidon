<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Coloboradores</h2>
        <v-btn color="yellow" text="Novo colaborador" @click="dialogNovoColaborador = true" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="colaboradores" :key="colaboradores.length" no-data-text="Nenhuma colaborador cadastrado!" items-per-page-text="Colaboradores por página" :page-text="`Total de Colaboradores: ${colaboradores.length}`" page="1">
          <template v-slot:top>
            <h2 class="pa-3">Gerencie seus Colaboradores</h2>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="blue" @click="editarColaboradores(item)">mdi-pencil</v-icon>
            <v-icon small color="red"  @click="deletarColaboradores(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-main>

    <v-dialog v-model="dialogNovoColaborador" persistent width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">{{ modoEdicao == true ? "Editar Colaborador" : "Novo Colaborador" }}</h3>
            <v-icon @click="close" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field   v-model="nomecolaborador" hide-details variant="outlined" label="Nome do Colaborador" />
            <v-text-field   v-model="email"     hide-details variant="outlined" label="Email do Colaborador" />
            <v-text-field   v-model="cpf"   hide-details variant="outlined" label="CPF do Colaborador" />
            <v-text-field   v-model="telefone" hide-details variant="outlined" label="Telefone do Colaborador" />
            <v-text-field   v-model="cep"    hide-details variant="outlined" label="CEP do Colaborador" />
            <v-text-field   v-model="banco"    hide-details variant="outlined" label="Banco do Colaborador" />
            <v-text-field   v-model="numeroCartao"    hide-details variant="outlined" label="Numero do cartão do Colaborador" />
            <v-text-field   v-model="senhaCartao"    hide-details variant="outlined" label="Senha do Cartão do Colaborador" />
            <v-text-field   v-model="cvv"    hide-details variant="outlined" label="CVV do Cartão" />
            <v-text-field   v-model="vencimentoCartao"    hide-details variant="outlined" label="Vencimento do Cartão" />
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="persistcolaboradores"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "colaboradores",
  layout: "LayoutNavBar",

data() {
  return {
    dialogNovoColaborador: false,
    modoEdicao: false,
    colaboradorSelecionado: null,
    nomecolaborador: null,
    email: null,
    cpf: null,
    telefone: null,
    cep: null,
    banco: null,
    numeroCartao: null,
    senhaCartao: null,
    cvv: null,
    vencimentoCartao: null,
    id: null,
    colaboradores: [], 
    headers: [
      { title: "Colaborador", value: "nomecolaborador", align: "center" },
      { title: "Email", value: "email", align: "center" },
      { title: "CPF", value: "cpf", align: "center" },
      { title: "Telefone", value: "telefone", align: "center" },
      { title: "CEP", value: "cep", align: "center" },
      { title: "Banco", value: "banco", align: "center" },
      { title: "Numero do Cartão", value: "numeroCartao", align: "center" },
      { title: "Senha do Cartão", value: "senhaCartao", align: "center" },
      { title: "CVV", value: "cvv", align: "center" },
      { title: "Vencimento do Cartão", value: "vencimentoCartao", align: "center" },
      { title: "Ações", value: "actions", align: "center" },
    ],
  };
},


  async created() {
    await this.listarColaboradores();
  },

  methods: {
    async listarColaboradores() {
      try {
        const { data: response } = await this.$api.get("/colaboradores/get");
        this.colaboradores = response.data;
      } catch (error) {
        alert("Não foi possível listar os Colaboradores");
        console.log("Erro: ", error);
      };
    },

    async persistColaboradores() {
      try {
        const request = {
          nome_colaboradores: this.nomeColaboradores,
          email: this.email,
          cpf: this.cpf,
          telefone: this.telefone,
          cep: this.cep,
          banco: this.banco,
          numeroCartao: this.numeroCartao,
          senhaCartao: this.senhaCartao,
          cvv: this.cvv,
          vencimentoCartao: this.vencimentoCartao,
        };

        if (this.id) {
          await this.$api.patch(`/colaboradores/patch/${this.id}`, request);
        } else {
          await this.$api.post(`/colaboradores/post`, request);
        }

        this.nomeColaboradores = null;
        this.cpf = null;
        this.email = null;
        this.telefone = null;
        this.cep = null;
        this.banco = null;
        this.numeroCartao = null;
        this.senhaCartao = null;
        this.cvv = null;
        this.vencimentoCartao = null;

        await this.listarColaboradores();
      } catch (error) {
        alert("Erro ao listar colaboradores: ", error);
        console.log("Erro: ", error);
      };
    },

    async deletarColaboradores(item) {
      try {
        await this.$api.delete(`/colaboradores/delete/${item.id}`);
        await this.listarColaboradores();
      } catch (error) {
         alert("Erro ao deletar colaborador: ", error);
        console.log("Erro: ", error);
      };
    },

    editarColaboradores(item) {
      this.dialogNovoColaborador = true;
      this.modoEdicao = true;
      this.nomeColaboradores = item.nome_colaboradores;
      this.email = item.email;
      this.cpf = item.cpf;
      this.telefone = item.telefone
      this.cep = item.cep;
      this.banco = item.banco;
      this.numeroCartao = item.numeroCartao
      this.senhaCartao = item.senhaCartao
      this.cvv = item.cvv
      this.vencimentoCartao = item.vencimentoCartao
      this.id = item.id;
    },

    close() {
      this.dialogNovoColaborador = false;
      this.modoEdicao = false;
      this.cpf = null;
      this.nomeColaboradores = null;
      this.email = null;
      this.telefone = null;
      this.cep = null;
      this.banco = null;
      this.numeroCartao = null;
      this.senhaCartao = null;
      this.cvv = null;
      this.vencimentoCartao = null;
      this.id = item.id;
    },
  },
};
</script>
