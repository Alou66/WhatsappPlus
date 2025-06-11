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
        const response = await fetch(`${API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        if (response.ok) {
            app.innerHTML = createLoginForm()
            alert('Inscription réussie! Veuillez vous connecter.')
        }
    } catch (error) {
        alert('Erreur lors de l\'inscription: ' + error.message)
    }
}