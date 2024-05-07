import PropTypes from 'prop-types'

const GifItem = ({title, url, id}) => { //recibe el objeto ...image del padre GifGrid pero se desestructura obteniendo estos datos
  
    //console.log({title, url, id})
  
    return (
    <div className="card">
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  )
}

export default GifItem


GifItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}