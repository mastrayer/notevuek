import Firebase from 'Firebase'
import { firebaseAction } from 'vuexfire'

const config = {
  apiKey: "AIzaSyAZbCOOzWcQfIA9nvudvnLpabxb1LjsNBw",
  authDomain: "notevuek.firebaseapp.com",
  databaseURL: "https://notevuek.firebaseio.com",
  projectId: "notevuek",
  storageBucket: "notevuek.appspot.com",
  messagingSenderId: "661685797490"
}

// Initialize Firebase
var app = Firebase.initializeApp(config)
var db = app.database()
var notesRef = db.ref('notes')

export default { app, db, notesRef }
