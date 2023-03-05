const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('/splendid-petal-379101-6a79a2024c33.json');

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();