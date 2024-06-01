import { HeroList } from "../components"

export const DcPage = () => {
    return (
      <>
        <h1>Dc Comics</h1>
        <hr />
        <HeroList //Llama a renderizarse a HeroList y se le envia publisher como Props 
          publisher={'DC Comics'}
        />
      </>
    )
  }
  