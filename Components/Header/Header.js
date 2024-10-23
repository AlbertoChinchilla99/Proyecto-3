// Header.js
import './Header.css'

// Función que genera el contenido del header
const headerTemplate = () => {
  return `
    <header>
      <h1 class="logo">I</h1>
      <input type="text" placeholder="Search" id="searchinput" />
      <button id="searchbtn"><img src="/icons/search.png" alt="Search icon" /></button>
      <button id="darkmodebtn"><img src="/icons/dark.png" alt="Dark mode icon" id="darkmodeicon"></button>
      <img src="/icons/usuario.png" alt="Profile image" class="profileimg" />
    </header>
  `
}

// Función para alternar entre modo claro y oscuro
const themeSwitch = () => {
  document.body.classList.toggle('dark')
}

// Funciones para manejar los eventos
const listeners = () => {
  const darkmodebtn = document.querySelector('#darkmodebtn')
  darkmodebtn.addEventListener('click', () => {
    themeSwitch()
    const theme = document.body.classList.contains('dark')
    document.querySelector('#darkmodeicon').src = theme
      ? '/public/icons/light.png'
      : '/public/icons/dark.png'
  })
}

// Función para imprimir el template del header
const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate()
  listeners()
}

// Inicializa el header
printHeaderTemplate()
