import React from "react";

export const ShowIncrement = React.memo(({increment}) => { //recibe increment del padre CallbackHook. Para memorizar una funcion en el padre se debe usar el hook useCallback 
  
    console.log('Me volvi a generar :( ');

    return (
    <button
        className="btn btn-primary"
        onClick={() => increment(5)}
    >
      Incrementar
    </button>
  )
})
