const { getApps, initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('/splendid-petal-379101-6a79a2024c33.json');

export const dbService = {
    insert,
    getAll,
    getUser,
    getUserById,
    approveUser,
    deleteUser
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
        last,
        ip1
    } = data;

    collection.doc(email);

     //if with this email already exists throw an error
    const user = await collection.where('email', '==', email).get(); 


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
        'sign-up-date': Date.now(),
        'ip1' : ip1,
        'ip2' : ip2,
        'approved' : false
    });

    return getUser(email, password);
}

async function getAll() {
    const snapshot = await collection.get();
    let users = {};

    snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        users = {...users, [doc.id] : doc.data()};
    });

    //console.log(users);
    return users;
}

//get user by email & pw
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

//get user by Id
async function getUserById(id) {
    return (await db.doc('users/' + id).get()).data();
}

async function approveUser(id) {
    return await db.doc('users/' + id).update({ 'approved' : true });
}

async function deleteUser(id) {
    return await db.doc('users/' + id).delete();
}

async function updateUserIPs(id, ip1, ip2) {
    return await db.doc('users/' + id).update({ 
        "ip1" : ip1,
        "ip2" : ip2
    });
}