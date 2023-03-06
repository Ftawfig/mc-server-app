const { getApps, initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('/splendid-petal-379101-6a79a2024c33.json');

export const dbService = {
    insert,
    getAll,
    getUser
};

if (getApps().length < 1) {
    initializeApp({
      credential: cert(serviceAccount)
    });
}

const db =  getFirestore();
const collection = db.collection('users');

async function insert(data) {
    const { 
        email, 
        password, 
        gamertag, 
        first, 
        last 
    } = data;

    collection.doc(email);

     //if with this email already exists throw an error
    const user = await collection.where('email', '==', email).get(); 

    console.log(user);

    if (!user.empty) {
        throw 'User already exists!';
    }

    //create a new user document
    const doc = collection.doc();

    //populate the fields for the new user document
    doc.set({
        'email' : email,
        'password' : password,
        'first' : first,
        'last' : last,
        'gamertag' : gamertag,
        'role' : 'user',
        'sign-up-date': Date.now()
    });

    return getUser(email, password);
}

async function getAll() {
    return await collection.get();
}

async function getUser(email, password) {
    return await collection
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then(querySnapshot => {
            if(!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                return user;
            } else {
                return null;
            }
        });
}