<template>
  <div>
    <nav class="container-fluid">
      <ul>
        <li><strong>Pyramidon</strong></li>
      </ul>
      <ul>
        <li><router-link to="/">Voltar</router-link></li>
      </ul>
    </nav>

    <main class="container">
      <section>
        <hgroup>
          <h2>Login</h2>
          <h3>Entre na plataforma Pyramidon</h3>
        </hgroup>
        <form class="grid" @submit.prevent="login">
          <input type="email" placeholder="Email" aria-label="Email" v-model="email" required />
          <input type="password" placeholder="Senha" aria-label="Senha" v-model="senha" required />
          <button type="submit">Acessar</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    login() {
      alert(`Login com: ${this.email} / ${this.senha} (simulado)`)
    }
  }
}
</script>
