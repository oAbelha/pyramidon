<template>
  <v-app theme="dark">
    <v-container height="100vh">
      <div style="height: 10%;" class="d-flex align-center justify-space-between">
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
  
      <v-container height="90%" class="d-flex ga-sm-6 justify-start flex-wrap flex-row">
        <v-card
          v-for="org in organizacoes"
          :key="org"
          width="300"
          height="300"
          @click="$router.push(org.link)"
        >
          <v-card-title>
            {{ org.titulo }}
          </v-card-title>
        </v-card>
      </v-container>
    </v-container>

    <v-dialog v-model="dialog" max-width="750">
      <v-card>
        <v-card-text>NOVA ORGANIZAÇÃO</v-card-text>
        <v-card-text>
          <v-text-field
            label="Titulo"
          ></v-text-field>
          <v-textarea
            label="Descrição"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="pr-5 pl-5">
          <v-btn
            @click="dialog = false"
          >CRIAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'Organizacoes',

  data() {
    return {
      dialog: false,
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
  }
}
</script>