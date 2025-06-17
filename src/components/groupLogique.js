import { API } from '../config/api.js';

export async function createGroup(groupName, groupDescription, selectedContacts) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    const newGroup = {
        id: crypto.randomUUID(),
        name: groupName,
        description: groupDescription,
        createdAt: new Date().toISOString(),
        admin: currentUser.id,
        members: [currentUser.id, ...selectedContacts]
    };

    try {
        // Récupérer les données actuelles de l'utilisateur
        const response = await fetch(`${API}/${currentUser.id}`);
        const userData = await response.json();

        // Initialiser la propriété groups si elle n'existe pas
        if (!userData.groups) {
            userData.groups = [];
        }

        // Ajouter le nouveau groupe
        userData.groups.push(newGroup);

        // Mettre à jour sur le serveur
        await fetch(`${API}/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return newGroup;
    } catch (error) {
        console.error('Erreur lors de la création du groupe:', error);
        throw error;
    }
}