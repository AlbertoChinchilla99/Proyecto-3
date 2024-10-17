import './Gallery.css'
import { createApi } from 'unsplash-js'

const Gallery = () => {
  const unsplash = createApi({
    accessKey: import.meta.env.VITE_ACCESS_KEY
  })
  const cardTemplate = (item) => {
    return `
      <li class="gallery-item" style="background-image: url(${item.urls.regular}); border: 10px solid ${item.color}">
        <div class="info">
          <div class="save-btn">
            <button>Guardar</button>
          </div>
          <div class="links">
            <a href=${item.links.html} class="full-link">${item.links.html}</a>
            <div>
              <a href=${item.urls.full} target="_blank" class="links-icon">
                <img src="/public/icons/upload.png" alt="Upload icon"/>
              </a>
              <a href="#null" class="links-icon">
                <img src="/public/icons/more.png" alt="More icon"/>
              </a>    
            </div>
          </div>
        </div>
      </li>
    `
  }

  const searchPhotos = async (keyword) => {
    try {
      const images = await unsplash.search.getPhotos({
        query: keyword,
        page: 1,
        perPage: 30
      })

      // Verificamos si hay errores en la respuesta
      if (!images.response) {
        console.error('Error: la respuesta de la API no es válida', images)
        return { results: [] } // Retornamos un objeto vacío para evitar errores
      }

      console.log('API Response:', images) // Agrega esto para ver qué datos está devolviendo
      return images.response // Regresamos la respuesta completa
    } catch (error) {
      console.error('Error al realizar la solicitud a la API:', error)
      return { results: [] } // Retornamos un array vacío en caso de error
    }
  }

  const galleryTemplate = () => `
    <ul class="gallery"></ul>
  `

  const printItems = (items) => {
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    items.forEach((item) => {
      gallery.innerHTML += cardTemplate(item)
    })
  }

  const galleryListeners = async () => {
    const input = document.querySelector('#searchinput')
    const btn = document.querySelector('#searchbtn')

    btn.addEventListener('click', async () => {
      const images = await searchPhotos(input.value)

      if (images.results.length === 0) {
        const catImages = await searchPhotos('gatos')
        printItems(catImages.results)
      } else {
        printItems(images.results)
      }

      input.value = ''
    })
  }

  const printTemplate = async (keyword = 'moon') => {
    document.querySelector('main').innerHTML = galleryTemplate()
    galleryListeners()

    const images = await searchPhotos(keyword)

    // Agregamos un chequeo adicional aquí para evitar errores si la respuesta está vacía
    if (images.results && images.results.length > 0) {
      printItems(images.results)
    } else {
      console.log('No se encontraron imágenes para la búsqueda:', keyword)
    }
  }

  return {
    printTemplate
  }
}

export default Gallery
