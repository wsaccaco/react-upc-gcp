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

const tipoRecurso = {
    1: {text:'FromtEnd'},
    2: {text:'BackEnd'},
    3: {text:'Analista de Sistemas'},
    4: {text:'Diseñador UX'}
};

export function getTipoRecurso(code){
    if (tipoRecurso.hasOwnProperty(code)) {
        return tipoRecurso[code]
    }else{
        return null;
    }
}