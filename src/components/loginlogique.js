import { API_CONFIG } from '../config/api.js'

/**
 * Gère le processus de connexion de l'utilisateur
 * @param {HTMLElement} app - L'élément racine de l'application
 */
export async function handleLogin(app) {
    // 1. Récupération des données du formulaire
    const credentials = getLoginCredentials()
    
    try {
        // 2. Vérification de l'utilisateur
        const user = await authenticateUser(credentials)
        
        // 3. Gestion de la connexion
        if (user) {
            loginSuccess(user)
        } else {
            showLoginError('Numéro de téléphone ou mot de passe incorrect')
        }
    } catch (error) {
        showLoginError('Erreur lors de la connexion: ' + error.message)
    }
}

/**
 * Récupère les identifiants saisis par l'utilisateur
 */
function getLoginCredentials() {
    return {
        phoneNumber: document.getElementById('loginPhone').value,
        password: document.getElementById('loginPassword').value
    }
}

/**
 * Vérifie les identifiants auprès du serveur
 * @param {Object} credentials - Les identifiants de l'utilisateur
 */
async function authenticateUser({ phoneNumber, password }) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?phoneNumber=${phoneNumber}`)
    const users = await response.json()
    
    return users.find(user => 
        user.phoneNumber === phoneNumber && 
        user.password === password
    )
}

/**
 * Gère la connexion réussie
 * @param {Object} user - Les données de l'utilisateur
 */
function loginSuccess(user) {
    localStorage.setItem('user', JSON.stringify(user))
    window.location.reload()
}

/**
 * Affiche un message d'erreur
 * @param {string} message - Le message d'erreur à afficher
 */
function showLoginError(message) {
    alert(message)
}