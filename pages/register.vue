<template>
  <div class="register">
    <h1>新規登録</h1>
    <input v-model="username" type="text" placeholder="ユーザーネーム" required>
    <br>
    <input v-model="email" type="email" placeholder="メールアドレス" required>
    <br>
    <input v-model="password" type="password" placeholder="パスワード" required>
    <br>
    <button @click="register">新規登録</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      username: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      if(!this.name || !this.email || !this.password) {
        alert('ユーザーネームまたはメールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
      .auth().createUserWithEmailAndPassword(this.email, this.password).then((data) => {
        data.user.updateProfile({
          displayName: this.username
        }).then(() => {
          this.$router.replace('/confirm')
        })
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/email-already-in-use':
            alert('このメールドレスはすでに使われています。')
            break
          case 'auth/weak-password':
            alert('パスワードは6文字以上で入力してください。')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            break
        }
      })
    }
  }
}
</script>