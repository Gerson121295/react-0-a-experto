//import { memo } from "react";
import React from "react";

//memo es una funcion que le dice a React memoriza este component y solo cuando las properties cambien se va a ejecutar este componente
//export const Small = memo(({value}) => { //recibe props del padre Memorize
export const Small = React.memo(({value}) => { //recibe props del padre Memorize

    console.log('Me volvi a dibujar');

  return (
      <small>{value}</small>
  
  )
})
