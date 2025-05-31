COLABORADORES.VUE

<template>
  <v-app theme="dark">
    <v-row class="align-center">
      <v-col>
        <h1>Gerencie a sua base de colaboradoes</h1>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn variant="outlined" class="text-yellow rounded-lg" text="Adicionar trouxa"/>
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-data-table
        variant="outlined"
        class="mx-auto"
        color="surface-variant"
        min-width="1450"
        hide-default-footer
        no-data-text="Sem troxas">
          <template v-slot:actions>
            <v-btn text="Button"></v-btn>
          </template>
        </v-data-table>     
        <!-- card dos trouxa
      nome
      email
      cpf
      telefone
      cep
      bancos
      numero do cartao
      senha do cartao
      cvv
      data de vencimento do caratão 
        -->    
    </v-row>
  </v-app>
</template>

<script>
export default {
    
}
</script>

<style>

</style>