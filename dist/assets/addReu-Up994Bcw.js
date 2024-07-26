import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as v,update as S,ref as d,get as y,child as A,push as b}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as _}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getAuth as k,signOut as L}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";import{u as T,r as F}from"./manageDbAndSs-BgUixtgR.js";var m={FIREBASE_API_KEY:'"AIzaSyBnbcPg2bm9uNHtQvSCKwneB9qyUC4RYPs"',FIREBASE_AUTH_DOMAIN:'"y-trials.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://y-trials-default-rtdb.firebaseio.com"',FIREBASE_PROJECT_ID:'"y-trials"',FIREBASE_STORAGE_BUCKET:'"y-trials.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"38252670103"',FIREBASE_APP_ID:'"1:38252670103:web:e93dd07b17de6537bc4dd2"',FIREBASE_MEASUREMENT_ID:'"G-DHZ2M1NK82"',SPREADSHEET_APP_ID:'"https://script.google.com/macros/s/AKfycbxCcBN7Ono829TeRK8iB3QQmZCsBSrds_h4a0pXClcl8T6SEo-TM4oEAShs5fCRXP1V/exec"'};const N={apiKey:m.FIREBASE_API_KEY.replace(/"/g,""),authDomain:m.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:m.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:m.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:m.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:m.FIREBASE_APP_ID.replace(/"/g,""),measurementId:m.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:m.FIREBASE_DATABASE_URL.replace(/"/g,"")},D=_(N),u=v(D),w=k(D),l=document.getElementById("llenado"),M=document.getElementById("loader");let B=[],i=[],E=[];const $=`Recuerda que un jefe debe estar al pendiente de los siguientes puntos sobre sus subordinados:<br>
&nbsp&nbsp&nbsp&nbsp -Estado general de salud.<br>
&nbsp&nbsp&nbsp&nbsp -Si está en estado de gracia.<br>
&nbsp&nbsp&nbsp&nbsp -Su pecado dominante y como ayudarle a superarlo.<br>
&nbsp&nbsp&nbsp&nbsp -Si tiene inquietud vocacional.<br>
&nbsp&nbsp&nbsp&nbsp -Su trabajo al exterior.<br>
También es importante recordar tener al menos una entrevista personal al mes con cada uno de ellos.<br><br>
Espacio para observaciones:<br>`,I=["comisiones","cuotas","ejercicio","rprts","misas","rosarios"];document.getElementById("logoutBtn").addEventListener("click",()=>{L(w),window.location.href="index.html"});function O(e,o){const t=new Date;if(e==0){const c=t.getFullYear(),r=t.getMonth()+1,p=t.getDate(),f=`${c}-${r<10?"0":""}${r}-${p<10?"0":""}${p}`;return S(d(u,"/"),{LastUpdate:f}),!1}const a=new Date(e);return(t.getTime()-a.getTime())/(1e3*3600*24)>=o}function P(){for(const e of i){const o=`personas/${e.nombre}`;delete e.nombre,b(d(u,o+"/wentDates"),e.fecha),delete e.fecha;for(const t of I)b(d(u,o+`/${t}`),e[t]),delete e[t];if(S(d(u,o),{observaciones:e.observaciones}),delete e.observaciones,e.listBooks&&(b(d(u,o+"/listBooks"),e.listBooks),delete e.listBooks),Object.keys(e).length!=0){const t=e;S(d(u,o),{actBook:t})}}for(const e of E){const o=`personas/${e.nombre}`;delete e.nombre,b(d(u,o+"/missedDates"),e.fecha),delete e.fecha;for(const t of I)b(d(u,o+`/${t}`),e[t]),delete e[t]}alert("Entrada registrada exitosamente :)")}async function j(){const e=document.createElement("div"),o=document.createElement("h2"),t=document.createElement("p");o.textContent="Notas Finales y Observaciones",e.classList="getearData",t.innerHTML=$,e.append(o),e.append(t),l.append(e);for(let s=0;s<i.length;s++){const n=document.createElement("p");n.textContent=i[s].nombre,e.append(n);const c=document.createElement("textarea");c.classList="observaciones",c.placeholder=`Observaciones sobre ${i[s].nombre}`;const r=await g(`personas/${i[s].nombre}/observaciones`);r!=0&&(c.textContent=r),e.append(c)}const a=document.createElement("button");a.textContent="Confirmar",e.append(a),a.addEventListener("click",s=>{s.preventDefault();const n=document.querySelectorAll(".observaciones");for(let c=0;c<n.length;c++)i[c].observaciones=n[c].value;l.innerHTML="",P(),x()})}function q(e,o,t){const a=document.createElement("input");return a.classList=e+" number-input",a.type="number",a.min="0",a.placeholder=`# de ${t}`,a}function h(e,o){const t=document.createElement("div"),a=document.createElement("h2");a.textContent=e,t.classList="getearData",t.append(a),l.append(t);for(let n=0;n<i.length;n++){const c=document.createElement("p");c.textContent=i[n].nombre,t.append(c),t.append(q("numInput","",e))}for(let n=0;n<E.length;n++)E[n][o]=0;const s=document.createElement("button");s.textContent="Confirmar",t.append(s),s.addEventListener("click",n=>{n.preventDefault();const c=document.querySelectorAll(".numInput");for(let r=0;r<c.length;r++)i[r][o]=Number(c[r].value);if(l.innerHTML="",e=="Reportes"){h("$ de Cuotas","cuotas");return}if(e=="$ de Cuotas"){h("Dias de Ejercicio","ejercicio");return}if(e=="Dias de Ejercicio"){U("Cumplimiento de comisiones","comisiones");return}e=="Misas Semanales"&&h("Rosarios Semanales","rosarios"),e=="Rosarios Semanales"&&j()})}function C(e,o){const t=document.createElement("label"),a=document.createElement("input"),s=document.createElement("span");return a.type="checkbox",a.classList=e,a.id=o,a.checked=!0,t.classList="checkbox-container",s.classList="checkmark",t.append(a),t.append(s),t}function x(){const e=document.createElement("div"),o=document.createElement("h2"),t=document.createElement("input"),a=document.createElement("h2");a.textContent="Asistencia",o.textContent="Fecha",t.type="date",e.classList="getearData",e.append(o),e.append(t),e.append(a),l.append(e),i=[];for(const n of B){const c=document.createElement("p");c.textContent=n,e.append(c),e.append(C("ifWent",""))}const s=document.createElement("button");s.textContent="Confirmar",e.append(s),s.addEventListener("click",n=>{n.preventDefault();const c=document.querySelectorAll(".ifWent"),r=t.value;if(!r){alert("Falta poner fecha");return}for(let p=0;p<c.length;p++){const f={nombre:B[p],fecha:r};c[p].checked?i.push(f):E.push(f)}l.innerHTML="",h("Reportes","rprts")})}function U(e,o){const t=document.createElement("div"),a=document.createElement("h2");a.textContent=e,t.classList="getearData",t.append(a),l.append(t);for(let n=0;n<i.length;n++){const c=document.createElement("p");c.textContent=i[n].nombre+" cumplio sus comisiones:",t.append(c),t.append(C("ifComision",""))}for(let n=0;n<E.length;n++)E[n][o]=!1;const s=document.createElement("button");s.textContent="Confirmar",t.append(s),s.addEventListener("click",n=>{n.preventDefault();const c=document.querySelectorAll(".ifComision");for(let r=0;r<c.length;r++)c[r].checked?i[r][o]=!0:i[r][o]=!1;l.innerHTML="",K()})}function H(){const e=document.createElement("div"),o=document.createElement("p"),t=document.createElement("input"),a=document.createElement("input");o.textContent="Cuando se inicio a leer el libro actual / Nombre del libro",t.type="date",t.classList="startDate",a.type="text",a.classList="currBook",a.placeholder="Nombre del libro actual",e.append(o),e.append(t),e.append(a);const s=document.createElement("p"),n=document.createElement("input");return s.textContent="Nuevo libro que se haya terminado",n.type="text",n.placeholder="Se puede dejar en blanco",n.classList="finishedBook",e.append(s),e.append(n),e}function K(){const e=document.createElement("div"),o=document.createElement("h2");o.textContent="Reporte de Lectura",e.classList="getearData",e.append(o),l.append(e);for(let a=0;a<i.length;a++){const s=document.createElement("h3");s.textContent=i[a].nombre,e.append(s),e.append(H())}const t=document.createElement("button");t.textContent="Confirmar",e.append(t),t.addEventListener("click",a=>{a.preventDefault();const s=document.querySelectorAll(".startDate"),n=document.querySelectorAll(".currBook"),c=document.querySelectorAll(".finishedBook");for(let r=0;r<s.length;r++)s[r].value!=""&&(i[r][n[r].value]=s[r].value),c[r].value!=""&&(i[r].listBooks=c[r].value);l.innerHTML="",h("Misas Semanales","misas")})}function G(e){const o=d(v());return y(A(o,e)).then(t=>t.exists()?Object.values(t.val()):(console.log("No data available"),0)).catch(t=>(console.error(t),0))}function g(e){const o=d(v());return y(A(o,e)).then(t=>t.exists()?t.val():(console.log("No data available"),0)).catch(t=>(console.error(t),0))}window.onload=async function(){const e=sessionStorage.getItem("myEmail"),o=sessionStorage.getItem("myName"),t=`/personas/${o}`;if(e==""&&(window.location.href="index.html"),Object.keys(await g("jefe"))[0].replace(/,/g,".")==e)if(document.getElementById("NO").style.display="block",O(await g("LastUpdate"),57)){console.log(!0);const s=await g("personas"),n=document.createElement("h2");n.textContent="Espera en lo que se actualizan los datos (2-3min), mientras hablen sobre de qué son los reportes de cada quien :)",l.append(n),await T(s,o),l.removeChild(n),F(s);const c=new Date,r=c.getFullYear(),p=c.getMonth()+1,f=c.getDate(),R=`${r}-${p<10?"0":""}${p}-${f<10?"0":""}${f}`;S(d(u,"/"),{LastUpdate:R})}else console.log(!1);document.getElementById("email").textContent=e,document.getElementById("name").textContent=o,B=await G(t+"/subs"),M.style.display="none",x()};