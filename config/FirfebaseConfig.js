import admin from 'firebase-admin';
import serviceAccount from '../visionary-9f018-firebase-adminsdk-k9wr7-448a58875d.json' assert { type: 'json' };
import dotenv from "dotenv"

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucket, 
});

export default admin;
