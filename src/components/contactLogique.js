import { API_CONFIG } from '../config/api.js'

export async function ajouterContact(event) {
    event.preventDefault();
    const utilisateurActuel = JSON.parse(localStorage.getItem('user'));
    
    const nouveauContact = {
        id: crypto.randomUUID(),
        prenom: document.getElementById('contactPrenom').value,
        nom: document.getElementById('contactNom').value,
        numero: document.getElementById('contactNumero').value,
        dateAjout: new Date().toISOString()
    };

    try {
        // Récupérer l'utilisateur actuel avec ses contacts
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${utilisateurActuel.id}`);
        const user = await response.json();
        
        // Ajouter le nouveau contact à la liste
        if (!user.contacts) user.contacts = [];
        user.contacts.push(nouveauContact);

        // Mettre à jour l'utilisateur avec le nouveau contact
        const updateResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${utilisateurActuel.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (updateResponse.ok) {
            // Mettre à jour le localStorage avec les nouvelles données
            localStorage.setItem('user', JSON.stringify(user));
            fermerFormulaireContact();
            await chargerContacts();
            alert('Contact ajouté avec succès!');
        }
    } catch (error) {
        alert('Erreur lors de l\'ajout du contact: ' + error.message);
    }
}

export function fermerFormulaireContact() {
    const modal = document.getElementById('contactFormModal');
    if (modal) modal.remove();
}

export async function chargerContacts() {
    const utilisateurActuel = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${utilisateurActuel.id}`);
        const user = await response.json();
        return user.contacts || [];
    } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
        return [];
    }
}

export function afficherContacts(contacts) {
    const listeContacts = contacts.map(contact => `
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#f0f2f5] cursor-pointer">
            <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                ${contact.prenom[0]}${contact.nom[0]}
            </div>
            <div class="flex-1 border-b border-[#e9edef] pb-2">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium text-[#111b21]">${contact.prenom} ${contact.nom}</h3>
                </div>
                <p class="text-sm text-[#667781]">${contact.numero}</p>
            </div>
        </div>
    `).join('');

    return listeContacts;
}