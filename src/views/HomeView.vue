<template>
  <div>
    <nav class="container-fluid">
      <ul>
        <li><strong>Pyramidon</strong></li>
      </ul>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Sobre</a></li>
        <li><router-link to="/login" role="button">Entrar</router-link></li>
      </ul>
    </nav>

    <main class="container">
      <div class="grid">
        <section>
          <hgroup>
            <h2>Objetivo</h2>
            <h3>Centralizar a organização de esquemas de pirâmide em uma única plataforma.</h3>
          </hgroup>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
