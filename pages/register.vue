<template>
  <div
    class="register"
  >
    <form
      class="form"
      @submit.prevent
    >
      <label class="label">
        <span class="label">
          email
        </span>
        <input
          class="input"
          type="text"
          v-model="email"
        >
      </label>
      <label class="label">
        <span class="label">
          password
        </span>
        <input
          class="input"
          type="password"
          v-model="password"
        >
      </label>
      <label class="label">
        <span class="label">
          name
        </span>
        <input
          class="input"
          type="text"
          v-model="updateName"
        >
      </label>
      <button
        class="button"
        type="submit"
        @click="register"
      >
        Register
      </button>
    </form>
  </div>
</template>
 
<script>
export default {
  computed: {
    user () {
      return this.$store.getters['user']
    },
  },
  data () {
    return {
      email: '',
      password: '',
      updateName: '',
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {email: this.email, password: this.password, name: this.updateName})
    }
  },
}
</script>