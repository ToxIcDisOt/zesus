const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.submitContactForm = functions.https.onRequest((req, res) => {
  const { name, email, message } = req.body;

  db.collection('messages').add({
    name,
    email,
    message,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    res.status(200).send('Message submitted successfully');
  })
  .catch((error) => {
    console.error("Error submitting message: ", error);
    res.status(500).send('Error submitting message');
  });
});
