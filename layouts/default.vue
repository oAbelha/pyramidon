<template>
  <v-app theme="dark">
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-row class="align-center justify-end ga-3">
        <h2>{{ conta ? conta.nome : 'MEU PERFIL' }}</h2>
        <v-icon class="mr-5">mdi-account</v-icon>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item v-for="item in navigation" :key="item.to" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutNavBar',

  data() {
    return {
      model: false,
      drawer: false,
      conta: JSON.parse(localStorage.getItem('conta')),
      navigation: [
        {
          title: 'Colaboradores',
          to: 'colaboradores',
        },
        {
          title: 'Funcionários',
          to: 'funcionarios',
        },
        {
          title: 'Marketing',
          to: 'marketing',
        },
        {
          title: 'Cryptomoeda',
          to: 'cryptomoeda',
        },
        {
          title: 'Perfil',
          to: 'perfil',
        },
      ],
    }
  },
}
</script>

<style>
</style>