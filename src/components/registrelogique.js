import { createLoginForm } from './login.js'
import { API } from '../config/api.js'

export async function handleRegister(app) {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value
    }
    
    try {
        // Vérifier si le numéro existe déjà
        const response = await fetch(`${API}?phoneNumber=${formData.phoneNumber}`)
        const existingUsers = await response.json()
        
        if (existingUsers.length > 0) {
            alert('Ce numéro de téléphone est déjà utilisé')
            return
        }
        
        // Si le numéro n'existe pas, procéder à l'inscription
        const registerResponse = await fetch(`${API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        if (registerResponse.ok) {
            app.innerHTML = createLoginForm()
            alert('Inscription réussie! Veuillez vous connecter.')
        }
    } catch (error) {
        alert('Erreur lors de l\'inscription: ' + error.message)
    }
}