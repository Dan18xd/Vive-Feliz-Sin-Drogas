const palabras = [
  "SALUD","VIDA","RESPETO","FAMILIA","FUTURO",
  "VALORES","AMIGOS","ESCUELA","DEPORTE","AYUDA"
];

const size = 10;
const sopa = document.getElementById("sopa");
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let matriz = [];
let encontradas = new Set();

/* MATRIZ VACÍA */
for(let i=0;i<size;i++){
  matriz[i] = Array(size).fill("");
}

/* COLOCAR SIN ENCIMAR */
function colocar(p){
  let ok=false;
  while(!ok){
    let f=Math.floor(Math.random()*size);
    let c=Math.floor(Math.random()*(size-p.length));
    let libre=true;

    for(let i=0;i<p.length;i++){
      if(matriz[f][c+i]!=""){ libre=false; break; }
    }

    if(libre){
      for(let i=0;i<p.length;i++){
        matriz[f][c+i]=p[i];
      }
      ok=true;
    }
  }
}

palabras.forEach(colocar);

/* RELLENO */
for(let i=0;i<size;i++){
  for(let j=0;j<size;j++){
    if(matriz[i][j]==""){
      matriz[i][j]=letras[Math.floor(Math.random()*letras.length)];
    }
  }
}

/* DIBUJAR */
matriz.flat().forEach(l=>{
  const d=document.createElement("div");
  d.textContent=l;
  d.onclick=()=>{
    d.classList.toggle("seleccionado");
    verificar();
  };
  sopa.appendChild(d);
});

/* VERIFICAR + CAMBIO DE FONDO */
function verificar(){
  const seleccion=[...document.querySelectorAll(".seleccionado")]
    .map(e=>e.textContent).join("");

  palabras.forEach(p=>{
    if(seleccion.includes(p) && !encontradas.has(p)){
      encontradas.add(p);
      document.querySelectorAll("li").forEach(li=>{
        if(li.textContent===p) li.classList.add("encontrada");
      });

      document.body.style.animation = "gradientShift 6s ease infinite";

    }
  });

  if(encontradas.size===palabras.length){
    document.getElementById("ganaste").classList.add("mostrar");
  }
}
