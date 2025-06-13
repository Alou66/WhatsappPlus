import { API } from '../config/api.js';

export async function sendMessage(content, receiverId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        // Récupérer les données actuelles de l'utilisateur
        const response = await fetch(`${API}/${user.id}`);
        const userData = await response.json();

        // Initialiser la structure des messages si elle n'existe pas
        if (!userData.messages) {
            userData.messages = {};
        }
        if (!userData.messages[receiverId]) {
            userData.messages[receiverId] = [];
        }

        // Créer le nouveau message
        const newMessage = {
            id: crypto.randomUUID(),
            content,
            timestamp: new Date().toISOString(),
            senderId: user.id,
            receiverId
        };

        // Ajouter le message
        userData.messages[receiverId].push(newMessage);

        // Mettre à jour sur le serveur
        await fetch(`${API}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return newMessage;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        throw error;
    }
}

export async function getMessages(contactId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const response = await fetch(`${API}/${user.id}`);
        const userData = await response.json();
        
        return userData.messages?.[contactId] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        return [];
    }
}