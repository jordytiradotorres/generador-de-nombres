const formulario = document.getElementById('formulario')
const listado = document.getElementById('listado')
// const loader = document.getElementById('loader')

const cargarNombres = e => {
  e.preventDefault()

  // leer variables
  const origen = document.getElementById('origen')
  const origenSeleccionado = origen.options[origen.selectedIndex].value

  const genero = document.getElementById('genero')
  const generoSeleccionado = genero.options[genero.selectedIndex].value

  const numeroNombres = document.getElementById('numero-nombres').value

  // la url
  let url = ''
  url += 'https://uinames.com/api/?'

  // si hay origen agregalo ala url
  if (origenSeleccionado !== '') {
    url += `region=${origenSeleccionado}&`
  }

  // si hay genero agregalo ala url
  if (generoSeleccionado !== '') {
    url += `gender=${generoSeleccionado}&`
  }

  // si hay cantidas
  if (numeroNombres !== '') {
    url += `amount=${numeroNombres}&`
  }

  // cargar AJAX
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  xhr.addEventListener('load', e => {
    switch (e.target.status) {
      case 200:
        const data = JSON.parse(e.target.responseText)
        mostrarResultado(data)
        break
      case 400: listado.textContent = 'Solicitud incorrecta'; listado.style.color = '#000'; break
      case 401: listado.textContent = 'No estas autorizado para esta acción'; listado.style.color = '#000'; break
      case 404: listado.textContent = 'No existe información, página 404'; listado.style.color = '#000'; break
      case 500: listado.textContent = 'Error del servidor'; listado.style.color = '#000'; break
    }
  })

  const mostrarResultado = (data) => {
    listado.innerHTML = ''
    const nombresFragment = document.createDocumentFragment()

    data.map(nombre => {
      const p = document.createElement('p')
      p.classList.add('nombre')
      p.innerHTML += `${nombre.name}`
      nombresFragment.appendChild(p)
    })

    listado.style.backgroundColor = '#2193b0'
    listado.appendChild(nombresFragment)
  }// fin de mostrarResultado

  xhr.send()
} // fin de cargarNombres

formulario.addEventListener('submit', cargarNombres)
