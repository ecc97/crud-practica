const user = localStorage.getItem('user')

if (!user) {
    window.location.href = '/'
}

const logout = document.getElementById('logout')

logout.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.href = '/'
})