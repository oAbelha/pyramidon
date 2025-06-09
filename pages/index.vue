<template>
  <v-app>
    <v-main>
      <v-row class="align-center justify-space-between pr-3 pl-16 py-2">
        <span class="font-weight-thin">PYRAMIDON</span>
        <div>
          <v-btn class="bg-yellow rounded-lg ml-3" text="Login" to="login"/>
        </div>
      </v-row>

      <v-row>
        <v-col class="d-flex flex-column justify-center px-10 ga-5">
          <h1 class="text-h1 font-weight-thin">PYRAMIDON</h1>
          <h3 class="text-h5 font-weight-thin w-75">O GERENCIADOR DE ORGANIZAÇÕES PARA IMPULSIONAR SEUS ESQUEMAS.</h3>
          <v-btn class="w-25 rounded-lg bg-yellow" height="60" text="Comece agora"/>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-img src="../assets/logo.png" max-width="840"/>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>


<script>
definePageMeta({
  layout: false,
});

export default {
  data() {
    return {};
  },

  methods: {},
};
</script>
