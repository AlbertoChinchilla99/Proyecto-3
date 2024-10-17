// Footer.js
import './Footer.css'

// Función que genera el contenido del footer
const templateFooter = () => {
  return `
    <footer>
      <h4>Copyright 2023 - Inspirest - Rock the Code</h4>
    </footer>
  `
}

// Función para imprimir el template del footer
const printFooterTemplate = () => {
  document.querySelector('footer').innerHTML = templateFooter()
}

// Inicializa el footer
printFooterTemplate()
