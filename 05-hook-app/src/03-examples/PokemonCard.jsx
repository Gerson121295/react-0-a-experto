
export const PokemonCard = ({ id, name, sprites = [] }) => { //recibe las props id, name, sprites del padre MultipleCustomHooks
  
  return (
    <section style={{height:200}}>
        <h2 className="text-capitalize">
            #{id} - {name}
        </h2>

        {/* images */}
        <div>
            {//Recorre el arreglo sprite con map para mostrar los sprites,
              sprites.map(sprites => (
                <img key={sprites} src={sprites} alt={name} />
              ))
            }
        </div>
        
    </section>
  )
}


