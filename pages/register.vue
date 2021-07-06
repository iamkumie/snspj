<template>
  <div class="register">
    <input type="text" v-model="name" placeholder="ユーザーネーム" required />
    <br>
    <input type="email" v-model="email" placeholder="メールアドレス" required />
    <br>
    <input type="password" v-model="password" placeholder="パスワード" required />
    <br>
    <button @click="register">新規登録</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
     async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/auth/register", {
          name: this.name,
        });
        this.$router.push("/login");
      } catch {
        alert("ユーザーネームを入力してください。");
      }

       if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/login')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })

     },
  },
}
</script>