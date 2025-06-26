<template>
  <v-app>
    <v-main class="pa-5">
      <v-row class="justify-space-between">
        <h2>Funcionários</h2>
        <v-btn color="yellow" text="Novo Funcionário" @click="dialog = true" />
      </v-row>

      <v-row>
        <v-data-table class="mt-10 rounded-xl" :headers="headers" :items="funcionarios" :key="funcionarios.length"
          no-data-text="Nenhuma funcionário cadastrado!" items-per-page-text="funcionários por página"
          :page-text="`Total de funcionários: ${funcionarios.length}`" page="1">
          <template v-slot:top>
            <h2 class="pa-3">Gerencie sua equipe</h2>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small color="blue" @click="editar(item)">mdi-pencil</v-icon>
            <v-icon small color="red" @click="deletar(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-main>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <v-row class="align-center justify-space-between pa-3">
            <h3 class="text-blue">{{ modoEdicao == true ? "Editar" : "Novo Funcionário" }}</h3>
            <v-icon @click="dialog = false" color="red" icon="mdi-close" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex flex-column ga-5">
            <v-text-field v-model="funcionario.codFuncionario" hide-details variant="outlined" label="Código de funcionário" />
            <v-text-field v-model="funcionario.nome" hide-details variant="outlined" label="Nome" />
            <v-text-field v-model="funcionario.salario" hide-details variant="outlined" label="Salário" />
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-center pa-3">
          <v-btn class="w-50 bg-success" color="black" text="Salvar" @click="persist" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "funcionarios",
  layout: "LayoutNavBar",

  data() {
    return {
      dialog: false,
      modoEdicao: false,
      funcionarios: [],
      funcionario: {},
      headers: [
        { title: "Código", value: "codFuncionario", align: "center", width: '100px' },
        { title: "Nome", value: "nome", align: "center" },
        { title: "Salário", value: "salario", align: "center" },
        { title: "Ações", value: "actions", align: "center", width: "100" },
      ],
    };
  },

  async created() {
    await this.getFuncionarios();
  },

  methods: {
    async getFuncionarios() {
      try {
        const { data } = await this.$api.get("/funcionarios/get");
        console.log(data.message);
        if(data.type === 'success') {
          this.funcionarios = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async persist() {
      try {
        const request = {
          codFuncionario: this.funcionario.codFuncionario,
          nome: this.funcionario.nome,
          salario: this.funcionario.salario,
        };

        if (this.funcionario.id) {
          const { data } = await this.$api.patch(`/funcionarios/patch/${this.funcionario.id}`, request);
          console.log(data.message);
        } else {
          const org = JSON.parse(localStorage.getItem('organizacao'));
          const { data } = await this.$api.post(`/funcionarios/post/${org.id}`, request);
          console.log(data.message);
        }

        this.dialog = false;
        this.funcionario = {};

        await this.getFuncionarios();
      } catch (error) {
        console.log(error);
      }
    },

    async deletar(item) {
      try {
        await this.$api.delete(`/funcionarios/delete/${item.id}`);
        await this.getFuncionarios();
      } catch (error) {
        console.log(error);
      }
    },

    editar(item) {
      this.modoEdicao = true;
      this.dialog = true;
      this.funcionario = item;
    },
  },
};
</script>