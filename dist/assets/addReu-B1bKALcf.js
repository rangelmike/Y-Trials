import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as g,ref as d,get as A,child as S,push as E,update as B}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as _}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getAuth as k,signOut as x}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";var p={FIREBASE_API_KEY:'"AIzaSyCbmdIyIqyEDELeAiMJaMcwkAcoR_ID5QU"',FIREBASE_AUTH_DOMAIN:'"projecty-v1.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://projecty-v1-default-rtdb.firebaseio.com/"',FIREBASE_PROJECT_ID:'"projecty-v1"',FIREBASE_STORAGE_BUCKET:'"projecty-v1.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"1031013084147"',FIREBASE_APP_ID:'"1:1031013084147:web:afe73747c5d3e512308086"',FIREBASE_MEASUREMENT_ID:'"G-ZGZ9W8CBRR"'};const L={apiKey:p.FIREBASE_API_KEY.replace(/"/g,""),authDomain:p.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:p.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:p.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:p.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:p.FIREBASE_APP_ID.replace(/"/g,""),measurementId:p.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:p.FIREBASE_DATABASE_URL.replace(/"/g,"")},y=_(L),u=g(y),T=k(y),l=document.getElementById("llenado"),F=document.getElementById("loader");let h=[],i=[],m=[];const j=`Recuerda que un jefe debe estar al pendiente de los siguientes puntos sobre sus subordinados:<br>
&nbsp&nbsp&nbsp&nbsp -Estado general de salud.<br>
&nbsp&nbsp&nbsp&nbsp -Si está en estado de gracia.<br>
&nbsp&nbsp&nbsp&nbsp -Su pecado dominante y como ayudarle a superarlo.<br>
&nbsp&nbsp&nbsp&nbsp -Si tiene inquietud vocacional.<br>
&nbsp&nbsp&nbsp&nbsp -Su trabajo al exterior.<br>
También es importante recordar tener al menos una entrevista personal al mes con cada uno de ellos.<br><br>
Espacio para observaciones:<br>`,I=["comisiones","cuotas","ejercicio","rprts","misas","rosarios"];document.getElementById("logoutBtn").addEventListener("click",()=>{x(T),window.location.href="index.html"});function M(){for(const e of i){const o=`personas/${e.nombre}`;delete e.nombre,E(d(u,o+"/wentDates"),e.fecha),delete e.fecha;for(const t of I)E(d(u,o+`/${t}`),e[t]),delete e[t];if(B(d(u,o),{observaciones:e.observaciones}),delete e.observaciones,e.listBooks&&(E(d(u,o+"/listBooks"),e.listBooks),delete e.listBooks),Object.keys(e).length!=0){const t=e;B(d(u,o),{actBook:t})}}for(const e of m){const o=`personas/${e.nombre}`;delete e.nombre,E(d(u,o+"/missedDates"),e.fecha),delete e.fecha;for(const t of I)E(d(u,o+`/${t}`),e[t]),delete e[t]}alert("Entrada registrada exitosamente :)")}async function N(){const e=document.createElement("div"),o=document.createElement("h2"),t=document.createElement("p");o.textContent="Notas Finales y Observaciones",e.classList="getearData",t.innerHTML=j,e.append(o),e.append(t),l.append(e);for(let c=0;c<i.length;c++){const a=document.createElement("p");a.textContent=i[c].nombre,e.append(a);const s=document.createElement("textarea");s.classList="observaciones",s.placeholder=`Observaciones sobre ${i[c].nombre}`;const r=await R(`personas/${i[c].nombre}/observaciones`);r!=0&&(s.textContent=r),e.append(s)}const n=document.createElement("button");n.textContent="Confirmar",e.append(n),n.addEventListener("click",c=>{c.preventDefault();const a=document.querySelectorAll(".observaciones");for(let s=0;s<a.length;s++)i[s].observaciones=a[s].value;l.innerHTML="",M(),D()})}function O(e,o,t){const n=document.createElement("input");return n.classList=e+" number-input",n.type="number",n.min="0",n.placeholder=`# de ${t}`,n}function f(e,o){const t=document.createElement("div"),n=document.createElement("h2");n.textContent=e,t.classList="getearData",t.append(n),l.append(t);for(let a=0;a<i.length;a++){const s=document.createElement("p");s.textContent=i[a].nombre,t.append(s),t.append(O("numInput","",e))}for(let a=0;a<m.length;a++)m[a][o]=0;const c=document.createElement("button");c.textContent="Confirmar",t.append(c),c.addEventListener("click",a=>{a.preventDefault();const s=document.querySelectorAll(".numInput");for(let r=0;r<s.length;r++)i[r][o]=Number(s[r].value);if(l.innerHTML="",e=="Reportes"){f("$ de Cuotas","cuotas");return}if(e=="$ de Cuotas"){f("Dias de Ejercicio","ejercicio");return}if(e=="Dias de Ejercicio"){w("Cumplimiento de comisiones","comisiones");return}e=="Misas Semanales"&&f("Rosarios Semanales","rosarios"),e=="Rosarios Semanales"&&N()})}function C(e,o){const t=document.createElement("label"),n=document.createElement("input"),c=document.createElement("span");return n.type="checkbox",n.classList=e,n.id=o,n.checked=!0,t.classList="checkbox-container",c.classList="checkmark",t.append(n),t.append(c),t}function D(){const e=document.createElement("div"),o=document.createElement("h2"),t=document.createElement("input"),n=document.createElement("h2");n.textContent="Asistencia",o.textContent="Fecha",t.type="date",e.classList="getearData",e.append(o),e.append(t),e.append(n),l.append(e),i=[];for(const a of h){const s=document.createElement("p");s.textContent=a,e.append(s),e.append(C("ifWent",""))}const c=document.createElement("button");c.textContent="Confirmar",e.append(c),c.addEventListener("click",a=>{a.preventDefault();const s=document.querySelectorAll(".ifWent"),r=t.value;if(!r){alert("Falta poner fecha");return}for(let b=0;b<s.length;b++){const v={nombre:h[b],fecha:r};s[b].checked?i.push(v):m.push(v)}l.innerHTML="",f("Reportes","rprts")})}function w(e,o){const t=document.createElement("div"),n=document.createElement("h2");n.textContent=e,t.classList="getearData",t.append(n),l.append(t);for(let a=0;a<i.length;a++){const s=document.createElement("p");s.textContent=i[a].nombre+" cumplio sus comisiones:",t.append(s),t.append(C("ifComision",""))}for(let a=0;a<m.length;a++)m[a][o]=!1;const c=document.createElement("button");c.textContent="Confirmar",t.append(c),c.addEventListener("click",a=>{a.preventDefault();const s=document.querySelectorAll(".ifComision");for(let r=0;r<s.length;r++)s[r].checked?i[r][o]=!0:i[r][o]=!1;l.innerHTML="",U()})}function q(){const e=document.createElement("div"),o=document.createElement("p"),t=document.createElement("input"),n=document.createElement("input");o.textContent="Cuando se inicio a leer el libro actual / Nombre del libro",t.type="date",t.classList="startDate",n.type="text",n.classList="currBook",n.placeholder="Nombre del libro actual",e.append(o),e.append(t),e.append(n);const c=document.createElement("p"),a=document.createElement("input");return c.textContent="Nuevo libro que se haya terminado",a.type="text",a.placeholder="Se puede dejar en blanco",a.classList="finishedBook",e.append(c),e.append(a),e}function U(){const e=document.createElement("div"),o=document.createElement("h2");o.textContent="Reporte de Lectura",e.classList="getearData",e.append(o),l.append(e);for(let n=0;n<i.length;n++){const c=document.createElement("h3");c.textContent=i[n].nombre,e.append(c),e.append(q())}const t=document.createElement("button");t.textContent="Confirmar",e.append(t),t.addEventListener("click",n=>{n.preventDefault();const c=document.querySelectorAll(".startDate"),a=document.querySelectorAll(".currBook"),s=document.querySelectorAll(".finishedBook");for(let r=0;r<c.length;r++)c[r].value!=""&&(i[r][a[r].value]=c[r].value),s[r].value!=""&&(i[r].listBooks=s[r].value);l.innerHTML="",f("Misas Semanales","misas")})}function $(e){const o=d(g());return A(S(o,e)).then(t=>t.exists()?Object.values(t.val()):(console.log("No data available"),0)).catch(t=>(console.error(t),0))}function R(e){const o=d(g());return A(S(o,e)).then(t=>t.exists()?t.val():(console.log("No data available"),0)).catch(t=>(console.error(t),0))}window.onload=async function(){const e=sessionStorage.getItem("myEmail"),o=sessionStorage.getItem("myName"),t=`/personas/${o}`;e==""&&(window.location.href="index.html"),Object.keys(await R("jefe"))[0].replace(/,/g,".")==e&&(document.getElementById("NO").style.display="block"),document.getElementById("email").textContent=e,document.getElementById("name").textContent=o,h=await $(t+"/subs"),F.style.display="none",D()};
