import './Gallery.css'
import { createApi } from 'unsplash-js'

const Gallery = () => {
  const unsplash = createApi({
    accessKey: import.meta.env.VITE_ACCESS_KEY
  })

  // Función para crear el contenedor de notificación si no existe
  const createNotificationContainer = () => {
    let notification = document.querySelector('#notification')

    // Si el contenedor no existe, lo creamos
    if (!notification) {
      notification = document.createElement('div')
      notification.id = 'notification'
      notification.style.cssText = `
        background-color: #ffcc00;
        color: #333;
        padding: 10px;
        text-align: center;
        margin-bottom: 20px;
        border-radius: 5px;
        font-size: 1rem;
        display: none;  /* Oculto por defecto */
      `
      document.querySelector('main').prepend(notification) // Agrega la notificación al inicio del <main>
    }
    return notification
  }

  // Función para mostrar el mensaje en el contenedor
  const showNotification = (message) => {
    const notification = createNotificationContainer()
    notification.textContent = message
    notification.style.display = 'block'
  }

  // Función para ocultar el mensaje
  const hideNotification = () => {
    const notification = document.querySelector('#notification')
    if (notification) {
      notification.style.display = 'none'
    }
  }

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

      if (!images.response) {
        console.error('Error: la respuesta de la API no es válida', images)
        return { results: [] }
      }

      console.log('API Response:', images)
      return images.response
    } catch (error) {
      console.error('Error al realizar la solicitud a la API:', error)
      return { results: [] }
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
      hideNotification() // Ocultamos cualquier notificación anterior
      const images = await searchPhotos(input.value)

      if (images.results.length === 0) {
        // Mostrar notificación de que no se encontraron resultados y se mostrarán imágenes de gatos
        showNotification(
          'No se encontraron resultados para tu búsqueda, se mostrarán imágenes de gatos.'
        )

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
