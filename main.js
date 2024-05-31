const form = document.querySelector('form')
const section = document.querySelector('section')
const name = document.querySelector('#name')
const year = document.querySelector('#year')
const category = document.querySelector('#category')
const image = document.querySelector('#img')
let id

const updateTitleButton = document.getElementById('update-title-button')

const URL_DATA = "http://localhost:3000/movies/"

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (id === undefined) {
        await create(name, year, category, image)
    } else {
        await update(id, name, year, category, image)
    }
    await read()
    form.reset()
})

section.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.dataset.id
        await deleteItem(id)
    } else if (e.target.classList.contains('btn-warning')) {
        id = e.target.dataset.id
        const found = await find(id)
        name.value = found.title
        year.value = found.releaseYear
        category.value = found.genre
        image.value = found.urlImage
    }
})

const create = async (name, year, category, image) => {

    const newMovie = {
        title: name.value,
        releaseYear: year.value,
        genre: category.value,
        urlImage: image.value
    }
    console.log(newMovie)

    const response = await fetch(URL_DATA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    const data = await response.json()
    console.log(data)
}

const read = async () => {
    const response = await fetch(URL_DATA)
    const data = await response.json()
    console.log(data)
    data.forEach(movie => {
        section.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${movie.urlImage}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${movie.genre}</li>
          <li class="list-group-item">${movie.releaseYear}</li>
          <li class="list-group-item">${movie.title}</li>
        </ul>
        <div class="btn-group gap-3 justify-content-center p-4" role="group" aria-label="g-b">
            <button type="button" data-id=${movie.id} class="btn btn-warning">Editar</button>
            <button type="button" data-id=${movie.id} class="btn btn-danger">Eliminar</button>
        </div>
      </div>
        `
    })
}

read()

const update = async (id, name, year, category, image) => {

    const updateMovie = {
        title: name.value,
        releaseYear: year.value,
        genre: category.value,
        urlImage: image.value
    }

    const response = await fetch(URL_DATA + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateMovie)
    })
    const data = await response.json()
    console.log(data)

    id = undefined
}



const deleteItem = async (id) => {
    const response = await fetch(URL_DATA + id, {
        method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    location.reload()
}

const find = async (id) => {
    const response = await fetch(URL_DATA + id)
    const data = await response.json()
    return data
}