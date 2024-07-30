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
import { resetDB, updateSheet } from "./manageDbAndSs";

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

const allDataDiv = document.getElementById("datos");
const loader = document.getElementById("loader");
const upLoader = document.getElementById("UpLoader");
const myName = sessionStorage.getItem("myName");
const UploadBtn = document.getElementById("UpStuff");
let allInfo;

class Queue {
	constructor() {
		this.items = [];
	}

	// Enqueue: Add an element to the end of the queue
	enqueue(element) {
		this.items.push(element);
	}

	// Dequeue: Remove an element from the front of the queue
	dequeue() {
		if (this.isEmpty()) {
			throw new Error("Queue is empty");
		}
		return this.items.shift();
	}

	// Peek: Get the front element of the queue without removing it
	peek() {
		if (this.isEmpty()) {
			throw new Error("Queue is empty");
		}
		return this.items[0];
	}

	// isEmpty: Check if the queue is empty
	isEmpty() {
		return this.items.length === 0;
	}

	// Size: Get the number of elements in the queue
	size() {
		return this.items.length;
	}

	// Print: Print all elements in the queue
	print() {
		console.log(this.items.toString());
	}
}
let showQueue = new Queue();

document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  
    // Change icon based on theme
    if (body.classList.contains('dark-mode')) {
      themeIcon.textContent = '🌙'; // Moon icon for dark mode
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '☀️'; // Sun icon for light mode
      localStorage.setItem('theme', 'light');
    }
});
  
  // Load the saved theme from local storage
window.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
  
    if (savedTheme) {
      body.classList.add(savedTheme + '-mode');
      themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    } else {
      body.classList.add('light-mode'); // default to light mode
      themeIcon.textContent = '☀️';
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
	signOut(auth);
	window.location.href = "index.html";
});

UploadBtn.addEventListener('click', async () => {    
    if(document.getElementById("UpSheet").checked){
        UploadBtn.style.display = "none";
		upLoader.style.display = "flex";
        await updateSheet(allInfo, myName);        
    }
    if(document.getElementById("reset").checked){
        await resetDB(allInfo);
        location.reload();
    }
    UploadBtn.style.display = "block";
	upLoader.style.display = "none";
});

function creaText(text) {
	const newText = document.createElement("p");
	newText.textContent = text;
	return newText;
}

function getTotalNums(deQue, deQuien) {
	let total = 0;
	if (allInfo[deQuien][deQue] != undefined) {
		for (const add of Object.values(allInfo[deQuien][deQue])) {
			total += add;
		}
	}
	return total;
}

function getTotalStrings(deQue, deQuien) {
	let str = "";
	let num = 0;
	if (allInfo[deQuien][deQue] != undefined) {
		for (const add of Object.values(allInfo[deQuien][deQue])) {
			str += add + "; ";
			num++;
		}
	}
	return { str, num };
}

function invertDisplay(display) {
	if (display == "none") return "block";
	return "none";
}

function formatArrayToString(array) {
    // Filter out empty strings and format each non-empty string
    const formattedArray = array
        .filter(str => str.trim() !== '') // Remove empty strings
        .map(str => `- ${str}`); // Add "-" to each string
    // Join the formatted strings with a newline character
    return formattedArray.join('\n');
}

function creaBarra(porcent){
	const barContainer = document.createElement("div");
	const bar = document.createElement("div");
	barContainer.classList = "bar-container";
	bar.classList = "bar";
	bar.style.width = `${porcent}%`
	barContainer.append(bar);
	return barContainer;
}

function buildDataBlock(padre, hijos) {
	const actDataDiv = document.createElement("div");
	const yoTitle = document.createElement("h3");
	yoTitle.textContent = padre + " (" + allInfo[padre]["NombreCentro"] + ")";
	actDataDiv.append(yoTitle);
	allDataDiv.append(actDataDiv);

	for (const act of hijos) {
        if(allInfo[act] == undefined){
            const noDataText = document.createElement("p");
            noDataText.textContent = `No hay registros de infromación aún sobre ${act}`;
            actDataDiv.append(noDataText);
            continue;
        }            
		const actTitle = document.createElement("h4");
		const hijoDiv = document.createElement("div");
		actTitle.textContent = act;
		hijoDiv.classList = act;
		hijoDiv.classList.add("hijoDiv");
		actDataDiv.append(actTitle);
		actDataDiv.append(hijoDiv);
		// resumen comisiones, libro leyendo, libros leidos

		const asistDiv = document.createElement("div");
		asistDiv.style.display = "none";
		asistDiv.classList = "asistDiv";
		const { str: str1, num: num1 } = getTotalStrings("wentDates", act);
		const fechasSi = str1.split("; ").filter(Boolean);
		const numFechasSi = num1;
		asistDiv.append(creaText("Fechas que asistio: " + fechasSi));
		const { str: str2, num: num2 } = getTotalStrings("missedDates", act);
		const fechasNo = str2.split("; ").filter(Boolean);
		const numFechasNo = num2;
		asistDiv.append(creaText("Fechas que falto: " + fechasNo));
		const detailsText = creaText("Asistencias: (click mostrar u ocultar detalles)")
		detailsText.addEventListener("click", function(){
			asistDiv.style.display = invertDisplay(asistDiv.style.display);
		})
		hijoDiv.append(detailsText);
		hijoDiv.append(asistDiv);
		 // Creating a calendar element
		const calendarEl = document.createElement("div");
		calendarEl.id = `calendar-${act}`;
		hijoDiv.append(calendarEl);

		// Initializing FullCalendar
		const calendar = new FullCalendar.Calendar(calendarEl, {
			initialView: 'dayGridMonth',
			events: [
				...fechasSi.map(date => ({
					title: 'Asistió',
					start: date,
					backgroundColor: 'green',
					borderColor: 'green',
					allDay: true
				})),
				...fechasNo.map(date => ({
					title: 'Faltó',
					start: date,
					backgroundColor: 'red',
					borderColor: 'red',
					allDay: true
				}))
			]
		});

		calendar.render();

		const totalReus = Number(numFechasSi + numFechasNo);
		const porcent = `${Math.floor((100 * numFechasSi) / totalReus)}`;
		hijoDiv.append(
			creaText(
				"Porcentaje de asistencia: " +
					porcent +
					`% (${numFechasSi}/${totalReus})`
			)
		);
		hijoDiv.append(creaBarra(porcent));

		const totRprts = getTotalNums("rprts", act);
		hijoDiv.append(creaText(`Total de reportes: ${totRprts}`));
		hijoDiv.append(
			creaText(`Promedio reportes: ${(totRprts / totalReus).toFixed(2)}`)
		);

		const totEjercicio = getTotalNums("ejercicio", act);
		hijoDiv.append(creaText(`Total dias de ejercicio: ${totEjercicio}`));
		hijoDiv.append(
			creaText(
				`Promedio dias de ejercicio: ${(totEjercicio / totalReus).toFixed(2)}`
			)
		);

		const totCuotas = getTotalNums("cuotas", act);
		hijoDiv.append(creaText(`Total cuotas pagadas: ${totCuotas}`));

		const totComisDone = getTotalNums("DoneComis", act);
		const totComisNot = getTotalNums("NotComis", act);
		const totComis = totComisDone + totComisNot;
		hijoDiv.append(
			creaText(
				`Promedio de cumplimiento de comisiones: ${(
					(totComisDone*100) / totComis
				).toFixed(2)}% (${totComisDone}/${totComis})`
			)
		);
		hijoDiv.append(creaBarra((totComisDone*100) / totComis))

		const proxComis = allInfo[act].ListComis;
        if(proxComis != undefined && proxComis != ""){            			       
			hijoDiv.append(creaText(`Comisiones pendientes: `))
            const seeComis = document.createElement("textarea");
            seeComis.value = formatArrayToString(proxComis);
            seeComis.style.height = 'auto';
            seeComis.setAttribute("readonly", "true");                                                              
            hijoDiv.append(seeComis);            
        }
        else{
            hijoDiv.append(creaText(`Comisiones pendientes: ninguna`))
        }

		let libroAct = "";
		let libroActDate = "";
		if (allInfo[act]["actBook"] != undefined) {
			libroAct = Object.keys(allInfo[act]["actBook"]);
			libroActDate = Object.values(allInfo[act]["actBook"]);
		}
		hijoDiv.append(
			creaText(`Actualmente leyendo: ${libroAct} /Desde: ${libroActDate}`)
		);

		const { str: str3, num: num3 } = getTotalStrings("listBooks", act);
		const totLibros = str3;
		hijoDiv.append(creaText(`Lista de libros leidos: ${totLibros}`));

		// hijoDiv.style.display = "none";		
		actTitle.addEventListener("click", function () {
			// hijoDiv.style.display = invertDisplay(hijoDiv.style.display);
			if (hijoDiv.classList.contains('showing')) {
				hijoDiv.classList.remove('showing');
				hijoDiv.classList.add('hiding');
			} else if (hijoDiv.classList.contains('hiding')) {
				hijoDiv.classList.remove('hiding');
				hijoDiv.classList.add('showing');
			} else {
				hijoDiv.classList.add('showing');
			}
		});		

        const totMisas = getTotalNums("misas", act);
		hijoDiv.append(creaText(`Total de misas acudidas: ${totMisas}`));
		hijoDiv.append(
			creaText(
				`Promedio dias de misas por semana: ${(totMisas / totalReus).toFixed(2)}`
			)
		);

        const totRoses = getTotalNums("rosarios", act);
		hijoDiv.append(creaText(`Total de rosarios: ${totRoses}`));
		hijoDiv.append(
			creaText(
				`Promedio de rosarios por semana: ${(totRoses / totalReus).toFixed(2)}`
			)
		);

        const observaciones = allInfo[act].observaciones;
        if(observaciones != undefined){            
            const auxText = creaText("Observaciones:");
            auxText.style.marginBottom = "0px";            
            hijoDiv.append(auxText);
            const seeObs = document.createElement("textarea");
            seeObs.value = observaciones;
            seeObs.style.height = 'auto'; // Reset the height
            // console.log(seeObs.scrollHeight);
            // seeObs.style.height = (seeObs.scrollHeight) + 'px';
            seeObs.setAttribute("readonly", "true");                                                               
            seeObs.onmousedown = function(event) {
                event.preventDefault();
            };
            seeObs.onselectstart = function(event) {
                event.preventDefault();
            };
            hijoDiv.append(seeObs);            
        }
        else{
            hijoDiv.append(creaText(`Observaciones: ninguna`))
        }
	}
}

function showData() {
	// Los subs tiene que ser un array
	// No es cierto, creo que si pueden ser objects
	if (!showQueue.isEmpty()) {
		const act = showQueue.dequeue();
        if(allInfo[act] == undefined){
            showData();
            return;
        }
		let hijos = allInfo[act]["subs"];
		if (hijos != undefined) {
			hijos = Object.values(hijos);
			for (const addToQueue of hijos) showQueue.enqueue(addToQueue);
			buildDataBlock(act, hijos);
		}
		showData();
	}
}

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

window.onload = async function () {
	const myEmail = sessionStorage.getItem("myEmail");	
	const myLocation = `/personas/${myName}`;
    if (myEmail == "") window.location.href = "index.html";
    const jefe = Object.keys(await getFromDB("jefe"))[0].replace(/,/g, ".");
	upLoader.style.display = "none";

    if(jefe == myEmail){
        const todos = document.querySelectorAll(".NO");        
        for(let act = 0; act < todos.length; act++){
            todos[act].style.display = "block";
        }
    }
	document.getElementById("email").textContent = myEmail;
	document.getElementById("name").textContent = myName;


	allInfo = await getFromDB("personas");
	showQueue.enqueue(myName);
    loader.style.display = "none";
	showData();
};
