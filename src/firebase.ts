import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: 'AIzaSyBKpUAMl29UhHoLYZpCfFsRWz9ERG_a58Q',
    authDomain: 'typescriptdiscordbot.firebaseapp.com',
    projectId: 'typescriptdiscordbot',
    storageBucket: 'typescriptdiscordbot.appspot.com',
    messagingSenderId: '580607537270',
    appId: '1:580607537270:web:6051fc2e3583296ddeaf57',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
    try {
        await addDoc(collection(db, 'tickets'), {
            threadId,
            text,
            openedAt: Date(),
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}
