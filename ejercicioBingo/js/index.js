cogerBola = (bolas,numeroBola = bolas[0]) => {
  _.pull(bolas,numeroBola);
  return numeroBola;
}

generarBolas = () =>{
  let bolas = _.range(1, 99);   
  bolas = _.shuffle(bolas); // Desordena
  return bolas;
}

 get_bolaEscogida => (){
  var bolaEscogida = cogerBola(bolas);
  return bolaEscogida;
}

var boton = document.querySelector('.boton');
boton.onclick = jugar =>{
  let dado = document.querySelector('.cuadro');
  let bolaEscogida = get_bolaEscogida();
  dado.textContent = bolaEscogida;
  tachar(cartonPlayer,bolaEscogida,"player");
  tachar(cartonMachine,bolaEscogida,"machine");
  comprobarGanador();
  if(!linea){
    linea = cantarLinea();
  }

}

tachar = (cartonJugador, bolaEscogida, jugador) => {
  let index = cartonJugador.findIndex(k => k == bolaEscogida);
  if( index != -1){
    //_.pull(cartonJugador,bolaEscogida);
    cartonJugador[index] = -1;
    let clase = document.querySelector(`.carton.${jugador} .number.number${bolaEscogida}`);
    clase.classList.add("tachado");   
  }
}

crearCarton = jugador => {
 let parent = document.querySelector(`.carton.${jugador}`);
 let numerosCarton = generarBolas();
 numerosCarton = numerosCarton.slice(0,15);
 numerosCarton.forEach((e) => {
   let div = document.createElement('div');
   div.className = `number number${e}`;
   div.textContent = `${e}`;
   parent.appendChild(div);
 });
  return numerosCarton;
}


comprobarGanador => (){
  if(comprobarElementosTachados(cartonPlayer) && comprobarElementosTachados(cartonMachine)){
    swal('Empate');
    boton.remove();
  }else if(comprobarElementosTachados(cartonPlayer)){
    swal('Gana Jugador');
    boton.remove();

  }else if(comprobarElementosTachados(cartonMachine)){
    swal('Gana CPU');
    boton.remove();

  }    
}

comprobarElementosTachados => array{
  let count = 0;
  array.forEach(valor => {
    if(valor == -1)
      count++;
    });
  
  if(count == array.length){
    return true;
  } 
  return false;
}

separarLineas => array {
  for(let i = 0; i < 15; i=i+5){
    let comprobacion = comprobarElementosTachados(array.slice(i,i+5));
    if(comprobacion){
      return true;
    }
  }
  
  return false;
}

cantarLinea => (){
  if(separarLineas(cartonPlayer) == true){
      swal('El jugador ha hecho linea');
      return true;
  }else if(separarLineas(cartonMachine) == true){
    swal('La maquina ha hecho linea');
    return true;
  }
  
  return false;
}

var bolas = generarBolas();
console.log(bolas);
var linea = false;
var cartonPlayer = crearCarton("player");
var cartonMachine = crearCarton("machine");