import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as R,onValue as h,ref as d,update as _,get as x,child as N}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as w}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getAuth as F,signOut as L}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";var s={FIREBASE_API_KEY:'"AIzaSyBnbcPg2bm9uNHtQvSCKwneB9qyUC4RYPs"',FIREBASE_AUTH_DOMAIN:'"y-trials.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://y-trials-default-rtdb.firebaseio.com"',FIREBASE_PROJECT_ID:'"y-trials"',FIREBASE_STORAGE_BUCKET:'"y-trials.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"38252670103"',FIREBASE_APP_ID:'"1:38252670103:web:e93dd07b17de6537bc4dd2"',FIREBASE_MEASUREMENT_ID:'"G-DHZ2M1NK82"',SPREADSHEET_APP_ID:'"https://script.google.com/macros/s/AKfycbxCcBN7Ono829TeRK8iB3QQmZCsBSrds_h4a0pXClcl8T6SEo-TM4oEAShs5fCRXP1V/exec"'};const T={apiKey:s.FIREBASE_API_KEY.replace(/"/g,""),authDomain:s.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:s.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:s.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:s.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:s.FIREBASE_APP_ID.replace(/"/g,""),measurementId:s.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:s.FIREBASE_DATABASE_URL.replace(/"/g,"")},C=w(T),m=R(C),k=F(C),b=document.getElementById("block");let E;const P=document.getElementById("loader");document.getElementById("theme-toggle").addEventListener("click",function(){const e=document.body,t=document.getElementById("theme-icon");e.classList.toggle("dark-mode"),e.classList.toggle("light-mode"),e.classList.contains("dark-mode")?(t.textContent="🌙",localStorage.setItem("theme","dark")):(t.textContent="☀️",localStorage.setItem("theme","light"))});window.addEventListener("DOMContentLoaded",e=>{const t=localStorage.getItem("theme"),n=document.body,o=document.getElementById("theme-icon");t?(n.classList.add(t+"-mode"),o.textContent=t==="dark"?"🌙":"☀️"):(n.classList.add("light-mode"),o.textContent="☀️")});document.getElementById("logoutBtn").addEventListener("click",()=>{L(k),window.location.href="index.html"});function O(e){const t=d(R());return x(N(t,e)).then(n=>n.exists()?n.val():(console.log("No data available"),0)).catch(n=>(console.error(n),0))}function M(e){return e=="none"?"block":"none"}function U(e){return e.replace(/\s*,\s*/g,",").split(",")}function K(e,t,n){const o=e.indexOf(t);o!==-1&&e.splice(o,1),n!=""&&e.push(n);const u={};return e.forEach(i=>{const l=i.replace(/\./g,",");u[l]=!0}),u}window.onload=async function(){const e=sessionStorage.getItem("myEmail"),t=sessionStorage.getItem("myName");document.getElementById("email").textContent=e,document.getElementById("name").textContent=t,e==""&&(window.location.href="index.html");const n=Object.keys(await O("jefe"))[0].replace(/,/g,".");e!=n&&(window.location.href="addReu.html"),P.style.display="none",h(d(m,"personas"),function(o){if(o.exists()){b.innerHTML="";const u=Object.entries(o.val());for(const c of u){if(c[1].subs==null||c[1].subs=="")continue;const f=document.createElement("div"),A=document.createElement("h4");A.textContent=c[0],f.append(A);const a=document.createElement("div");a.classList="data",a.style.display="none";const S=document.createElement("div"),r=document.createElement("input");r.value=c[1].email,S.append(document.createElement("h5").textContent="Email: "),S.append(r),a.append(S);const v=document.createElement("div"),p=document.createElement("input");p.value=c[1].subs,v.append(document.createElement("h5").textContent="Subordinados: "),v.append(p),a.append(v);const B=document.createElement("div"),g=document.createElement("input");B.append(document.createElement("h5").textContent="Nombre del Centro: "),g.value=c[1].NombreCentro,B.append(g),a.append(B),f.append(a),A.addEventListener("click",()=>{a.style.display=M(a.style.display)});const y=document.createElement("button");y.textContent="Confirmar",a.append(y),b.append(f),y.addEventListener("click",()=>{p.value==""&&(g.value="",r.value=""),_(d(m,`personas/${c[0]}`),{NombreCentro:g.value,email:r.value,subs:U(p.value)});const D=K(E,c[1].email,r.value);_(d(m),{allowed:D})})}const i=document.createElement("div"),l=document.createElement("input"),I=document.createElement("button");l.placeholder="Nombre del Nuevo Jefe",I.textContent="Registrar Nuevo Jefe",i.append(l),i.append(I),b.append(i),I.addEventListener("click",function(){_(d(m,`personas/${l.value.trimEnd()}`),{subs:l.value.trimEnd()})})}else console.log("noData")})};h(d(m,"allowed"),function(e){if(e.exists()){E=Object.keys(e.val());for(let t=0;t<E.length;t++)E[t]=E[t].replace(/,/g,".")}});
