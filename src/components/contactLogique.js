import { API } from '../config/api.js'

// Crée un nouveau contact avec les données du formulaire
function createContactObject() {
    return {
        id: crypto.randomUUID(),
        prenom: document.getElementById('contactPrenom').value,
        nom: document.getElementById('contactNom').value,
        numero: document.getElementById('contactNumero').value,
        
        dateAjout: new Date().toISOString()
    };
}

  

// Met à jour l'affichage de la liste des contacts
async function updateContactDisplay() {
    const listeContacts = document.getElementById('listeContacts');
    const contacts = await chargerContacts();
    if (listeContacts) {
        listeContacts.innerHTML = afficherContacts(contacts);
        // Réattacher les événements de clic aux contacts
        listeContacts.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', event => {
                const data = item.dataset.contact.replace(/&apos;/g, "'");
                const contact = JSON.parse(data);
                handleContactClick(contact, event);
            });
        });
    }
}

// Fonction principale d'ajout de contact
export async function ajouterContact(event) {
    event.preventDefault();
    
    // Vérification des champs
    const prenom = document.getElementById('contactPrenom').value.trim();
    const nom = document.getElementById('contactNom').value.trim();
    const numero = document.getElementById('contactNumero').value.trim();

    if (!prenom || !nom || !numero) {
        alert('Tous les champs sont obligatoires');
        return;
    };
    if ( !/^\d+$/.test(numero)) {
        alert('veillez entrer un numero valide');
        return;
    }

   


    const utilisateurActuel = JSON.parse(localStorage.getItem('user'));
    const nouveauContact = createContactObject();

    try {
        const user = await fetchUserData(utilisateurActuel.id);
        if (!user.contacts) user.contacts = [];

        // Vérifier si le contact existe déjà
        const contactExistant = user.contacts.find(contact => contact.numero === nouveauContact.numero);
        if (contactExistant) {
            alert('Ce numéro est déjà dans vos contacts');
            return;
        }

        // Si le contact n'existe pas, l'ajouter
        user.contacts.push(nouveauContact);

        const success = await updateUserContacts(utilisateurActuel.id, user);
        if (success) {
            localStorage.setItem('user', JSON.stringify(user));
            await updateContactDisplay();
            fermerFormulaireContact();
            alert('Contact ajouté avec succès!');
        }
    } catch (error) {
        alert('Erreur lors de l\'ajout du contact: ' + error.message);
    }
}

// Récupère les données utilisateur
async function fetchUserData(userId) {
    const response = await fetch(`${API}/${userId}`);
    return response.json();
}

// Met à jour les contacts de l'utilisateur sur le serveur
async function updateUserContacts(userId, userData) {
    const response = await fetch(`${API}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.ok;
}

// Le reste de votre code reste inchangé
export function fermerFormulaireContact() {
    const modal = document.getElementById('contactFormModal');
    if (modal) modal.remove();
}

export async function chargerContacts() {
    const utilisateurActuel = JSON.parse(localStorage.getItem('user'));
    
    try {
        const response = await fetch(`${API}/${utilisateurActuel.id}`);
        const user = await response.json();
        return {
            contacts: user.contacts || [],
            groups: user.groups || []
        };
    } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
        return { contacts: [], groups: [] };
    }
}

export function afficherContacts({ contacts, groups }) {
    let html = '';
    
    // Afficher les groupes
    if (groups && groups.length > 0) {
        html += groups.map(group => `
            <div class="contact-item flex items-center gap-3 px-4 py-3 hover:bg-[#f0f2f5] cursor-pointer"
                 data-group='${JSON.stringify(group).replace(/'/g, "&apos;")}'>
                <div class="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                    ${group.name[0].toUpperCase()}
                </div>
                <div class="flex-1 border-b border-[#e9edef] pb-2">
                    <div class="flex justify-between items-center">
                        <h3 class="font-medium text-[#111b21]">${group.name}</h3>
                    </div>
                    <p class="text-sm text-[#667781]">${group.description || 'Pas de description'}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Afficher les contacts
    if (contacts && contacts.length > 0) {
        html += contacts.map(contact => `
            <div class="contact-item flex items-center gap-3 px-4 py-3 hover:bg-[#f0f2f5] cursor-pointer"
                 data-contact='${JSON.stringify(contact).replace(/'/g, "&apos;")}'>
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
    }
    
    return html;
}

