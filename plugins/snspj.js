import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAib5MCc5Ozs0iqQlAuoo0PsPluyVAtugM",
      authDomain: "snspj-f8df6.firebaseapp.com",
      projectId: "snspj-f8df6",
      storageBucket: "snspj-f8df6.appspot.com",
      messagingSenderId: "49674332259",
      appId: "1:49674332259:web:7a01bc161b17d9cc3a3056",
      measurementId: "G-XQDWRF0215"
    }
  )
}
  
export default firebase