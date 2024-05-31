const form = document.querySelector('form')
const userName = form.querySelector('#username')
const password = form.querySelector('#password')

const URL_LOGIN = "http://localhost:3000/users?"

console.log(userName, password)

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const user = await validateUser(userName)
    if (!user) {
        alert('Usuario o contraseña incorrectos')
    } else {
        if (user.password === password.value) {
            alert('Bienvenido')
            localStorage.setItem('user', JSON.stringify(user))
            console.log(localStorage.getItem('user'))
            window.location.href = 'crud.html'  
        } else {
            alert('Contraseña incorrecta')
        }
    }
})

async function validateUser(userName) {
    const response = await fetch(URL_LOGIN + 'username=' + userName.value)
    const user = await response.json()

    if(user.length !== 0){
        return user[0]
    } else {
        return false
    }
}