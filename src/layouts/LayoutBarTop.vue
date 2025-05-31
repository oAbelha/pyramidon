<template>
  <v-app theme="dark">
    <v-app-bar>
      <div class="w-100 pl-5 pr-5 d-flex ga-6 align-center justify-end">
        <h2>MEU PERFIL</h2>
        <v-btn
          icon
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutBarTop',
}
</script>