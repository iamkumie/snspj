import firebase from '@/plugins/firebase'

export const state = () => ({
  user: {
    uid: '',
    email: '',
    name: '',
  },
})

export const getters = {
  user: state => {
    return state.user
  }
}

export const actions = {
  login({ dispatch }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log('成功！')
        dispatch('checkLogin')
      }).catch((error) => {
        alert(error)
      })
  },
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        commit('getData', { uid: user.uid, email: user.email, name: user.displayName })
      }
    })
  },
  register ({ dispatch }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      console.log(user)
      dispatch('update', payload.name)
    }).catch(function (error) {
      console.log({'code':error.code, 'message':error.message})
    })
  },
  update ({ context }, name) {
    firebase.auth().currentUser.updateProfile({
      displayName: name
    })
      .then(()=> {
        console.log('Update successful')
      })
      .catch((error)=> {
        console.log(error)
      })
  },
}

export const mutations = {
  getData (state, user) {
    state.user = user
  },
}