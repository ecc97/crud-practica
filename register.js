const form = document.querySelector('form')
const userName = form.querySelector('#username')
const password = form.querySelector('#password')

const URL_REGISTER = "http://localhost:3000/users"

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const checkUser = await validateUser(userName)

    if (checkUser) {
        registerUser(userName, password)
        alert('Usuario creado')
        window.location.href = '/'
    } else {
        alert('El usuario ya existe')
    }
})

const validateUser = async (userName) => {
    const response = await fetch(URL_REGISTER + '?username=' + userName.value)
    const users = await response.json()

    if (users.length === 0) {
        return true
    } else {
        return false
    }
}

const registerUser = async (userName, password) => {

    const newUser = {
        username: userName.value,
        password: password.value
    }
    console.log(newUser)

    const response = await fetch(URL_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    const user = await response.json()
    console.log(user)
    return user
}