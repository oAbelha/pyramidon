<template>
  <v-app theme="dark">
    <v-container>
      <div class="d-flex align-center justify-space-between">
        <div>
          <h1>Minhas Organizações</h1>
        </div>
        <div>
          <v-btn
            variant="outlined"
            class="text-yellow rounded-lg"
            @click="dialog = true"
          >NOVA ORGANIZAÇÃO</v-btn>
        </div>
      </div>
  
      <v-container class="d-flex ga-sm-6 justify-start flex-wrap flex-row">
        <v-card
          v-for="org in organizacoes"
          :key="org"
          width="300"
          height="300"
          @click="acessaOrganizacao(org)"
        >
          <v-card-title>
            <div class="d-flex align-center justify-space-between">
              <h3 class="w-75" style="overflow: hidden; text-overflow: ellipsis;">{{ org.nome }}</h3>
              <v-btn
                flat
                icon="mdi-pencil"
                @click.stop="abreDialogUpdate(org)"
              ></v-btn>
            </div>
          </v-card-title>

          <v-card-text>
            <div>
              Em funcionamento: {{ org.emFuncionamento ? 'SIM' : 'NÃO' }}
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-container>

    <v-dialog v-model="dialog" max-width="750">
      <v-card>
        <v-card-text>NOVA ORGANIZAÇÃO</v-card-text>
        <v-card-text>
          <v-text-field
            v-model="nome"
            label="Nome da Organização"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pr-5 pl-5">
          <v-btn
            @click="criaOrganizacao"
          >CRIAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUpdate" max-width="750">
      <v-card>
        <v-card-text>NOVA ORGANIZAÇÃO</v-card-text>
        <v-card-text>
          <v-text-field
            v-model="organizacao.nome"
            label="Nome da Organização"
          ></v-text-field>
          <div class="d-flex align-center">
            <h3 class="d-inline w-50">Em funcionamento: {{ organizacao.emFuncionamento ? 'SIM' : 'NÃO' }}</h3>
            <v-btn 
              variant="outlined"
              class="text-yellow rounded-lg"
              @click="organizacao.emFuncionamento = !organizacao.emFuncionamento"
            >Alterar status</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="pr-5 pl-5">
          <v-btn
            @click="updateOrganizacao"
          >SALVAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
definePageMeta({
  layout: 'layout-bar-top',
});

export default {
  name: 'Organizacoes',

  data() {
    return {
      dialog: false,
      dialogUpdate: false,
      conta: JSON.parse(localStorage.getItem('conta')),
      nome: null,
      organizacao: {},
      organizacoes: [
        {
          titulo: 'Pyramidon',
          link: '/dashboard',
        },
        {
          titulo: 'Cassinão',
          link: '/dashboard',
        },
        {
          titulo: 'Tigrinho',
          link: '/dashboard',
        },
      ],
    }
  },

  async created() {
    await this.getOrganizacoes();
  },

  methods: {
    async getOrganizacoes() {
      try {
        const { data } = await this.$api.get(`/organizacoes/get-organizacoes-conta/${this.conta.id}`);
        
        if(data.type === 'success') {
          this.organizacoes = data.data;
          console.log(data);
        }
      }
      catch(err) {
        console.log(err);
      }
    },

    async criaOrganizacao() {
      try {
        const { data } = await this.$api.post(`/organizacoes/post`, {
          nome: this.nome,
          idConta: this.conta.id,
        });
        
        if(data.type === 'success') {
          await this.getOrganizacoes();
        }

        this.dialog = false;
      }
      catch(err) {
        console.log(err);
      }
    },

    abreDialogUpdate(item) {
      this.organizacao = item;
      this.dialogUpdate = true;
    },

    async updateOrganizacao() {
      try {
        const { data } = await this.$api.patch(`/organizacoes/patch/${this.organizacao.id}`, this.organizacao);
        console.log(data.message);
        this.organizacao = {};
        this.dialogUpdate = false;
      }
      catch(err) {
        console.log(err);
      }
    },

    acessaOrganizacao(item) {
      localStorage.setItem('organizacao', JSON.stringify(item));
      this.$router.push({ name: 'colaboradores' });
    },
  },
}
</script>