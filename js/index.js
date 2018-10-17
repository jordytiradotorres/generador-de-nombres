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

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json()
    })
    .then(function (data) {
      mostrarResultado(data)
    }).catch(function (error) {
      console.log(error)
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
} // fin de cargarNombres

formulario.addEventListener('submit', cargarNombres)
