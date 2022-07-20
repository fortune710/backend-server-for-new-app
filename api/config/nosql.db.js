const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./iiqama-firebase-adminsdk-91fjn-daa294331a.json')

const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'iiqama.appspot.com'
    //databaseURL: "https://iiqama.firebaseio.com"
})

const database = firebaseAdmin.firestore(firebaseApp)
const cloudStorage = firebaseAdmin.storage(firebaseApp)

module.exports = {
    firebaseDatabase: database,
    firebaseStorage: cloudStorage
}