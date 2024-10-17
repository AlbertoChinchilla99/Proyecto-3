// Main.js
import './style.css'
import './Components/Header/Header.js'
import './Components/Footer/Footer.js'
import Gallery from './Components/Main/Gallery.js'

// Puedes añadir el contenido principal aquí
const mainTemplate = () => {
  return `
    <main>
      <div class="gallery">
        <!-- Aquí se puede agregar el contenido de la galería -->
      </div>
    </main>
  `
}

// Imprime el template principal
const printMainTemplate = () => {
  document.querySelector('main').innerHTML = mainTemplate()
}
const gallery = Gallery()
gallery.printTemplate()
// Inicializa el contenido principal
printMainTemplate()
