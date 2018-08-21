const prioridad = {
  1: {text:'Alta', status:'error'},
  2: {text:'Medio', status:'warning'},
  3: {text:'Bajo', status:'success'}
};

export function getPrioridad(code){
  if (prioridad.hasOwnProperty(code)) {
    return prioridad[code]
  }else{
    return null;
  }
}