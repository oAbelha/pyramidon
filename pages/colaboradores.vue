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
            <v-text-field   v-model="this.colaborador.nome" hide-details variant="outlined" label="Nome do Colaborador" />
            <v-text-field   v-model="this.colaborador.email"     hide-details variant="outlined" label="Email do Colaborador" />
            <v-text-field   v-model="this.colaborador.cpf"   hide-details variant="outlined" label="CPF do Colaborador" />
            <v-text-field   v-model="this.colaborador.telefone" hide-details variant="outlined" label="Telefone do Colaborador" />
            <v-text-field   v-model="this.colaborador.cep"    hide-details variant="outlined" label="CEP do Colaborador" />
            <v-text-field   v-model="this.colaborador.banco"    hide-details variant="outlined" label="Banco do Colaborador" />
            <v-text-field   v-model="this.colaborador.numeroCartao"    hide-details variant="outlined" label="Numero do cartão do Colaborador" />
            <v-text-field   v-model="this.colaborador.senhaCartao"    hide-details variant="outlined" label="Senha do Cartão do Colaborador" />
            <v-text-field   v-model="this.colaborador.senhaSeguranca"    hide-details variant="outlined" label="CVV do Cartão" />
            <v-text-field   v-model="this.colaborador.dataVencimentoCartao"    hide-details variant="outlined" label="Vencimento do Cartão" />
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="persistColaboradores"/>
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
    colaborador: {},
    colaboradores: [], 
    headers: [
      { title: "Colaborador", value: "nome", align: "center" },
      { title: "Email", value: "email", align: "center" },
      { title: "CPF", value: "cpf", align: "center" },
      { title: "Telefone", value: "telefone", align: "center" },
      { title: "CEP", value: "cep", align: "center" },
      { title: "Banco", value: "banco", align: "center" },
      { title: "Numero do Cartão", value: "numeroCartao", align: "center" },
      { title: "Senha do Cartão", value: "senhaCartao", align: "center" },
      { title: "CVV", value: "senhaSeguranca", align: "center" },
      { title: "Vencimento do Cartão", value: "dataVencimentoCartao", align: "center" },
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
        const org = JSON.parse(localStorage.getItem('organizacao'));
        const { data } = await this.$api.get(`/colaboradores/get/${org.id}`);
        
        if(data.type === 'success') {
          console.log(data.message);
          this.colaboradores = data.data;
        }
      } catch (error) {
        console.log(error);
      };
    },

    async persistColaboradores() {
      try {
        const request = {
          nome: this.colaborador.nome,
          email: this.colaborador.email,
          cpf: this.colaborador.cpf,
          telefone: this.colaborador.telefone,
          cep: this.colaborador.cep,
          banco: this.colaborador.banco,
          numeroCartao: this.colaborador.numeroCartao,
          senhaCartao: this.colaborador.senhaCartao,
          senhaSeguranca: this.colaborador.senhaSeguranca,
          dataVencimentoCartao: this.colaborador.dataVencimentoCartao,
        };

        if (this.colaborador.id) {
          const { data } = await this.$api.patch(`/colaboradores/patch/${this.colaborador.id}`, request);
          console.log(data.message);
        } else {
          const org = JSON.parse(localStorage.getItem('organizacao'));
          const { data } = await this.$api.post(`/colaboradores/cria-colaborador/${org.id}`, request);
          console.log(data.message);
        }

        this.close();

        await this.listarColaboradores();
      } catch (error) {
        console.log(error);
      };
    },

    async deletarColaboradores(item) {
      try {
        await this.$api.delete(`/colaboradores/delete/${item.id}`);
        await this.listarColaboradores();
      } catch (error) {
        console.log(error);
      };
    },

    editarColaboradores(item) {
      this.dialogNovoColaborador = true;
      this.colaborador = item;
      console.log(this.colaborador);
    },

    close() {
      this.dialogNovoColaborador = false;
      this.colaborador = {};
    },
  },
};
</script>
