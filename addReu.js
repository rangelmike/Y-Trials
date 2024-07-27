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

const allData = document.getElementById("llenado");
const loader = document.getElementById("loader");

let mySubs = [];
let asistentes = [];
let faltantes = [];

const parrafo = 
`Recuerda que un jefe debe estar al pendiente de los siguientes puntos sobre sus subordinados:<br>
&nbsp&nbsp&nbsp&nbsp -Estado general de salud.<br>
&nbsp&nbsp&nbsp&nbsp -Si está en estado de gracia.<br>
&nbsp&nbsp&nbsp&nbsp -Su pecado dominante y como ayudarle a superarlo.<br>
&nbsp&nbsp&nbsp&nbsp -Si tiene inquietud vocacional.<br>
&nbsp&nbsp&nbsp&nbsp -Su trabajo al exterior.<br>
También es importante recordar tener al menos una entrevista personal al mes con cada uno de ellos.<br><br>
Espacio para observaciones:<br>`;
const campos = ["comisiones", "cuotas", "ejercicio", "rprts", "misas", "rosarios"]

document.getElementById("logoutBtn").addEventListener("click", () => {
	signOut(auth);
	window.location.href = "index.html";
});

function createUpdates() {
	for (const act of asistentes) {
		const location = `personas/${act.nombre}`;
		delete act.nombre;
		push(ref(database, location + "/wentDates"), act.fecha);
		delete act.fecha;
        for (const campo of campos){
            push(ref(database, location + `/${campo}`), act[campo]);
		    delete act[campo];
        }
        update(ref(database, location), {
            observaciones: act["observaciones"]
        })
        delete act.observaciones;
        if (act.listBooks) {
            push(ref(database, location + "/listBooks"), act.listBooks);
            delete act.listBooks;
        }
		if (Object.keys(act).length != 0) {
			const actBook = act;
			update(ref(database, location), {
				actBook,
			});			
		}
        
	}
	for (const act of faltantes) {
		const location = `personas/${act.nombre}`;
		delete act.nombre;
		push(ref(database, location + "/missedDates"), act.fecha);
		delete act.fecha;
		for (const campo of campos){
            push(ref(database, location + `/${campo}`), act[campo]);
		    delete act[campo];
        }
	}
    alert("Entrada registrada exitosamente :)")
}

async function buildObs(){
    const actDiv = document.createElement("div");
	const title = document.createElement("h2");
    const remainderText = document.createElement("p");
	title.textContent = "Notas Finales y Observaciones";
	actDiv.classList = "getearData";
    remainderText.innerHTML = parrafo;
	actDiv.append(title);
    actDiv.append(remainderText);
	allData.append(actDiv);

	for (let c = 0; c < asistentes.length; c++) {        
		const act = document.createElement("p");
		act.textContent = asistentes[c].nombre;
		actDiv.append(act);
        const aux = document.createElement("textarea");
        aux.classList = "observaciones";
        aux.placeholder = `Observaciones sobre ${asistentes[c].nombre}`;
        const obsPasadas = await getFromDB(`personas/${asistentes[c].nombre}/observaciones`);
        if(obsPasadas != 0)
            aux.textContent = obsPasadas;
        actDiv.append(aux);		
	}

    const finishBtn = document.createElement("button");
	finishBtn.textContent = "Confirmar";
	actDiv.append(finishBtn);
	finishBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const allObs = document.querySelectorAll(".observaciones");
		for (let c = 0; c < allObs.length; c++) {
			asistentes[c]["observaciones"] = allObs[c].value;
		}
		allData.innerHTML = "";        
        createUpdates();
        buildAsistencia();		
	});
}

function creaNumInput(clase, id, name) {
	const input = document.createElement("input");
	input.classList = clase + " number-input";
	input.type = "number";
	input.min = "0";
	input.placeholder = `# de ${name}`;
	return input;
}

function buildNumerico(name, inDbName) {
	const actDiv = document.createElement("div");
	const title = document.createElement("h2");
	title.textContent = name;
	actDiv.classList = "getearData";
	actDiv.append(title);
	allData.append(actDiv);

	for (let c = 0; c < asistentes.length; c++) {
		const act = document.createElement("p");
		act.textContent = asistentes[c].nombre;
		actDiv.append(act);
		actDiv.append(creaNumInput("numInput", "", name));
	}
	for (let c = 0; c < faltantes.length; c++) {
		faltantes[c][inDbName] = 0;
	}

	const finishBtn = document.createElement("button");
	finishBtn.textContent = "Confirmar";
	actDiv.append(finishBtn);
	finishBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const nums = document.querySelectorAll(".numInput");
		for (let c = 0; c < nums.length; c++) {
			asistentes[c][inDbName] = Number(nums[c].value);
		}
		allData.innerHTML = "";
		if (name == "Reportes") {
			buildNumerico("$ de Cuotas", "cuotas");
			return;
		}
		if (name == "$ de Cuotas") {
			buildNumerico("Dias de Ejercicio", "ejercicio");
			return;
		}
		if (name == "Dias de Ejercicio") {
			buildComisiones("Cumplimiento de comisiones", "comisiones");
			return;
		}
        if(name == "Misas Semanales"){            
            buildNumerico("Rosarios Semanales", "rosarios");
        }
        if(name == "Rosarios Semanales"){
            buildObs();
            // buildAsistencia();
        }
	});
}

function creaCheck(clase, id) {
	const big = document.createElement("label");
	const input = document.createElement("input");
	const span = document.createElement("span");
	input.type = "checkbox";
	input.classList = clase;
	input.id = id;
	input.checked = true;
	big.classList = "checkbox-container";
	span.classList = "checkmark";
	big.append(input);
	big.append(span);
	return big;
}

function buildAsistencia() {
	const asistDiv = document.createElement("div");
	const fechaTitle = document.createElement("h2");
	const fechaInput = document.createElement("input");
	const title = document.createElement("h2");
	title.textContent = "Asistencia";
	fechaTitle.textContent = "Fecha";
	fechaInput.type = "date";
	asistDiv.classList = "getearData";
	asistDiv.append(fechaTitle);
	asistDiv.append(fechaInput);
	asistDiv.append(title);
	allData.append(asistDiv);

    asistentes = []

	for (const act of mySubs) {
		const nuevo = document.createElement("p");
		nuevo.textContent = act;
		asistDiv.append(nuevo);
		asistDiv.append(creaCheck("ifWent", ""));
	}

	const finishBtn = document.createElement("button");
	finishBtn.textContent = "Confirmar";
	asistDiv.append(finishBtn);
	finishBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const checkboxes = document.querySelectorAll(".ifWent");
		const fecha = fechaInput.value;
		if (!fecha) {
			alert("Falta poner fecha");
			return;
		}
		for (let c = 0; c < checkboxes.length; c++) {
			const nuevo = {
				nombre: mySubs[c],
				fecha,
			};
			if (checkboxes[c].checked) {
				asistentes.push(nuevo);
			} else {
				faltantes.push(nuevo);
			}
		}
		allData.innerHTML = "";
		buildNumerico("Reportes", "rprts");
        // buildObs();
	});
}

function buildComisiones(name, inDbName) {
	const actDiv = document.createElement("div");
	const title = document.createElement("h2");
	title.textContent = name;
	actDiv.classList = "getearData";
	actDiv.append(title);
	allData.append(actDiv);

	for (let c = 0; c < asistentes.length; c++) {
		const act = document.createElement("p");
		act.textContent = asistentes[c].nombre + " cumplio sus comisiones:";
		actDiv.append(act);
		actDiv.append(creaCheck("ifComision", ""));
	}
	for (let c = 0; c < faltantes.length; c++) {
		faltantes[c][inDbName] = false;
	}

	const finishBtn = document.createElement("button");
	finishBtn.textContent = "Confirmar";
	actDiv.append(finishBtn);
	finishBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const checkboxes = document.querySelectorAll(".ifComision");
		for (let c = 0; c < checkboxes.length; c++) {
			if (checkboxes[c].checked) {
				asistentes[c][inDbName] = true;
			} else {
				asistentes[c][inDbName] = false;
			}
		}
		allData.innerHTML = "";
		buildLectura();
	});
}

function creaLibro() {
	const div = document.createElement("div");

	const actBookTitle = document.createElement("p");
	const fecha = document.createElement("input");
	const actBookName = document.createElement("input");
	actBookTitle.textContent =
		"Cuando se inicio a leer el libro actual / Nombre del libro";
	fecha.type = "date";
	fecha.classList = "startDate";
	actBookName.type = "text";
	actBookName.classList = "currBook";
	actBookName.placeholder = "Nombre del libro actual";
	div.append(actBookTitle);
	div.append(fecha);
	div.append(actBookName);

	const newBookTitle = document.createElement("p");
	const newBookInput = document.createElement("input");
	newBookTitle.textContent = "Nuevo libro que se haya terminado";
	newBookInput.type = "text";
	newBookInput.placeholder = "Se puede dejar en blanco";
	newBookInput.classList = "finishedBook";
	div.append(newBookTitle);
	div.append(newBookInput);

	return div;
}

function buildLectura() {
	const actDiv = document.createElement("div");
	const title = document.createElement("h2");
	title.textContent = "Reporte de Lectura";
	actDiv.classList = "getearData";
	actDiv.append(title);
	allData.append(actDiv);

	for (let c = 0; c < asistentes.length; c++) {
		const act = document.createElement("h3");
		act.textContent = asistentes[c].nombre;
		actDiv.append(act);
		actDiv.append(creaLibro());
	}

	const finishBtn = document.createElement("button");
	finishBtn.textContent = "Confirmar";
	actDiv.append(finishBtn);
	finishBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const fechas = document.querySelectorAll(".startDate");
		const currBooks = document.querySelectorAll(".currBook");
		const fnshBooks = document.querySelectorAll(".finishedBook");
		for (let c = 0; c < fechas.length; c++) {
			if (fechas[c].value != "") {
				asistentes[c][currBooks[c].value] = fechas[c].value;
			}
			if (fnshBooks[c].value != "") {
				asistentes[c].listBooks = fnshBooks[c].value;
			}
		}
		allData.innerHTML = "";
        buildNumerico("Misas Semanales", "misas");
		// buildAsistencia();
		// createUpdates();
	});
}

function getSubs(where) {
	const dbRef = ref(getDatabase());
	return get(child(dbRef, where))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const regresa = Object.values(snapshot.val());
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
	const myName = sessionStorage.getItem("myName");
	const myLocation = `/personas/${myName}`;
    if (myEmail == "") window.location.href = "index.html";
    const jefe = Object.keys(await getFromDB("jefe"))[0].replace(/,/g, ".");

    if(jefe == myEmail)
        document.getElementById("NO").style.display = "block";
	document.getElementById("email").textContent = myEmail;
	document.getElementById("name").textContent = myName;

	mySubs = await getSubs(myLocation + "/subs");
    loader.style.display = "none";

    buildAsistencia()	
};
