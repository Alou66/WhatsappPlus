export function handleLogout() {
    localStorage.removeItem('user')
    window.location.reload()
}