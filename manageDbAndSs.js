import {
	getDatabase,
	ref,
	onValue,
	get,
	child,
	update,
	push,
	set,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY.replace(/"/g, ''),
	authDomain: process.env.FIREBASE_AUTH_DOMAIN.replace(/"/g, ''),
	projectId: process.env.FIREBASE_PROJECT_ID.replace(/"/g, ''),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET.replace(/"/g, ''),
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g, ''),
	appId: process.env.FIREBASE_APP_ID.replace(/"/g, ''),
	measurementId: process.env.FIREBASE_MEASUREMENT_ID.replace(/"/g, ''),
	databaseURL: process.env.FIREBASE_DATABASE_URL.replace(/"/g, ''),
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function getTotalNums(array){
    let total = 0;
    for(const add of array)    
        total+=add;
    return total;
}

function getTotalStr(array){
    let total = "";
    for(const add of array)
        total+= `${add}, `;
    return total.slice(0, -2);
}

export async function updateSheet(info, jefe){    
    let pos = 2;
    const SsURL = process.env.SPREADSHEET_APP_ID.replace(/"/g, '');    
    for(let c = 0; c < Object.values(info).length; c++){
        const act = Object.entries(info)[c];
        const name = act[0];
        if(name == jefe)
            continue;
        const wentDates = (act[1]["wentDates"] != undefined) ? Object.values(act[1]["wentDates"]).length : 0;
        const missedDates = (act[1]["missedDates"] != undefined) ? Object.values(act[1]["missedDates"]).length : 0;
        const rprts = (act[1]["rprts"] != undefined) ? getTotalNums(Object.values(act[1]["rprts"])) : 0;
        const ejercicio = (act[1]["ejercicio"] != undefined) ? getTotalNums(Object.values(act[1]["ejercicio"])) : 0;
        const cuotas = (act[1]["cuotas"] != undefined) ? getTotalNums(Object.values(act[1]["cuotas"])) : 0;
        const readBooks = (act[1]["listBooks"] != undefined) ? getTotalStr(Object.values(act[1]["listBooks"])) : "";
        const obj = {
            A:name,
            B:wentDates,
            C:missedDates,
            E:rprts,
            G:ejercicio,
            I:cuotas,
            J:readBooks,
            Z:pos,
        }                         
        await fetch(
            SsURL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify(obj),
            }
        )        
        .catch((error) => {
            console.error("Error:", error);
            alert("Error: " + error.message);
        });
        pos++;
        
    }
    await fetch(
        SsURL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify({desde: pos}),
        }
    )        
    .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error.message);
    });
}

// MODIFICACIONES:
// Poner este archivo
// Modificar todos los viewContent
// Poner process.env.SPREADSHEET_APP_ID em vite.config.js, en el .env y en environment variables de netlify