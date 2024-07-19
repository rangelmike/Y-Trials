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
const todo = document.getElementById("block");
const delay = ms => new Promise(res => setTimeout(res, ms));
let allowedEmails;
const loader = document.getElementById("loader");

document.getElementById("logoutBtn").addEventListener("click", () => {
	signOut(auth);
	window.location.href = "index.html";
});

// IMPORTANTE RECORDAR QUE LOS SUBS DE UN TIPO DEBEN SER ARRAYS NO OBJETOS, SI IMPORTA
// creo que no importa eso al final, igual si puedes hacerlos arrays estaria chido

function getFromDB(where) {
	const dbRef = ref(getDatabase());
	return get(child(dbRef, where))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const regresa = snapshot.val();
				return regresa;
			} else {
				console.log("No data available");
				return 0;
			}
		})
		.catch((error) => {
			console.error(error);
			return 0;
		});
}

function invertDisplay(display) {
	if (display == "none") return "block";
	return "none";
}

function convierte(str){
     // Remove spaces around commas
    const cleanedStr = str.replace(/\s*,\s*/g, ',');
    // Split the string by commas into an array
    const resultArray = cleanedStr.split(',');
    return resultArray;
}

function modifyArray(arr, strToDelete, strToAdd) {
  // Find the index of the string to delete
  const index = arr.indexOf(strToDelete);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  if(strToAdd != "")
    arr.push(strToAdd);
  const result = {};
  arr.forEach(str => {
    // Replace all occurrences of '.' with ','
    const modifiedStr = str.replace(/\./g, ',');
    // Set the modified string as a key in the result object with the value true
    result[modifiedStr] = true;
  });
  return result;
}

window.onload = async function () {
    const myEmail = sessionStorage.getItem("myEmail");
	const myName = sessionStorage.getItem("myName");
	document.getElementById("email").textContent = myEmail;
	document.getElementById("name").textContent = myName;
    
	if (myEmail == "") window.location.href = "index.html";
	const jefe = Object.keys(await getFromDB("jefe"))[0].replace(/,/g, ".");	
	if(myEmail != jefe) window.location.href = "addReu.html";        
    loader.style.display = "none";

    onValue(ref(database, "personas"), function(snapshot){        
        if(snapshot.exists()){
            todo.innerHTML = "";            
            const people = Object.entries(snapshot.val());              
            for(const act of people){       
                if(act[1].subs == undefined || act[1].subs == "")
                    continue;
                const actDiv = document.createElement("div");
                const name = document.createElement("h4");                
                name.textContent = act[0];                
                actDiv.append(name);
                

                const values = document.createElement("div");
                values.classList = "data"
                values.style.display = "none";

                const emailDiv = document.createElement("div")
                const emailInput = document.createElement("input");
                emailInput.value = act[1].email;
                emailDiv.append(document.createElement("h5").textContent = "Email: ")
                emailDiv.append(emailInput);                
                values.append(emailDiv)

                const subsDiv = document.createElement("div")
                const subsInput = document.createElement("input");
                subsInput.value = act[1].subs;
                subsDiv.append(document.createElement("h5").textContent = "Subordinados: ")
                subsDiv.append(subsInput);                
                values.append(subsDiv)
                

                const centroDiv = document.createElement("div")
                const centroInput = document.createElement("input");
                centroDiv.append(document.createElement("h5").textContent = "Nombre del Centro: ")
                centroInput.value = act[1].NombreCentro;
                centroDiv.append(centroInput);                
                values.append(centroDiv)                
                actDiv.append(values);
                name.addEventListener('click', () => {
                    values.style.display = invertDisplay(values.style.display);
                })
                
                
                const sendBtn = document.createElement("button");
                sendBtn.textContent = "Confirmar";
                values.append(sendBtn);       
                todo.append(actDiv);         
                sendBtn.addEventListener('click', () =>{                                   
                    // location.reload();  
                    // todo.innerHTML="";                    
                    if(subsInput.value == ""){
                        centroInput.value = "";
                        emailInput.value = "";
                    }                    
                    update(ref(database, `personas/${act[0]}`), {
                        NombreCentro: centroInput.value, 
                        email: emailInput.value,                         
                        subs: convierte(subsInput.value)
                    })                                
                    const allowed = modifyArray(allowedEmails, act[1].email, emailInput.value)
                    update(ref(database), {
                        allowed
                    })     
                                                             
                })  

            }
            const newBossDiv = document.createElement("div");
            const newBossInput = document.createElement("input");
            const newBossBtn = document.createElement("button");
            newBossInput.placeholder = "Nombre del Nuevo Jefe";
            newBossBtn.textContent = "Registrar Nuevo Jefe";
            newBossDiv.append(newBossInput);
            newBossDiv.append(newBossBtn);
            todo.append(newBossDiv);   
            newBossBtn.addEventListener('click', function(){
                // todo.innerHTML="";
                update(ref(database, `personas/${newBossInput.value.trimEnd()}`), {
                    subs:newBossInput.value.trimEnd()
                })
            });           
        }
        else{
            console.log("noData")
        }
    })
};

onValue(ref(database, "allowed"), function(snapshot){
    if(snapshot.exists()){
        allowedEmails = Object.keys(snapshot.val());
        for(let c=0; c < allowedEmails.length; c++){
            allowedEmails[c] = allowedEmails[c].replace(/,/g, ".");
        }
    }
})