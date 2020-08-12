const app = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyByFY74ojNshwexBW4vjYJXpexrfedpLx4",
    authDomain: "yelp-web-app-45122.firebaseapp.com",
    databaseURL: "https://yelp-web-app-45122.firebaseio.com",
    projectId: "yelp-web-app-45122",
    storageBucket: "yelp-web-app-45122.appspot.com",
    messagingSenderId: "1092438213910",
    appId: "1:1092438213910:web:1ebdd000d5cff7ec2ffc37",
    measurementId: "G-LB77RGXHXQ"
};
// Initialize Firebase
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    // ** AUTH API **

    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    // ** USER API **

    doCreateUser = (id, user) => {
        return this.db.collection('users').doc(id).set(user);
    }

    doGetUser = id => {
        return this.db.collection('users').doc(id).get()
    }
}

const firebase = new Firebase()

module.exports = firebase