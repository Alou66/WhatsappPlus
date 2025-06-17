import { createContactForm } from './contactForm.js';
import { ajouterContact, fermerFormulaireContact, chargerContacts, afficherContacts } from './contactLogique.js';
import { createChatArea, createGroupChatArea } from './chatarea.js';
import { handleLogout } from './logoutlogique.js';
import { createGroupView } from './groupView.js';

export function createDiscussion() {
    return `
        <div class="discussion-panel w-[30%] flex flex-col border-r border-[#959797]">
            <div class="h-[60px] flex items-center justify-between p-5 relative">
                <div class="text-[25px]">Discussions</div>
                <div class="flex items-center gap-8">
                    <i id="ajouterContactBtn" class="fas fa-plus text-[20px] text-gray-800 cursor-pointer"></i>
                    <div class="relative">
                        <i id="menuBtn" class="fas fa-ellipsis-vertical text-[20px] text-gray-800 cursor-pointer"></i>
                        <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <a href="#" id="newGroupLink" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Nouveau groupe
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Messages importants
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sélectionner les discussions
                                </a>
                                <hr class="my-1">
                                <a href="#" id="menuLogoutBtn" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    Déconnexion
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-3 py-3">
                <div class="relative">
                    <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    <input type="text" 
                           id="searchGroupContacts" 
                           placeholder="Rechercher des contacts" 
                           class="w-full pl-10 pr-4 h-10 border border-gray-300 rounded-[7px] bg-[#f0ecec]"/>
                </div>
            </div>
            <div id="listeContacts" class="flex-1 overflow-y-auto">
                <!-- La liste des contacts sera insérée ici -->
            </div>
        </div>
    `;
}

// Ajoutez ces gestionnaires d'événements dans votre main.js
document.addEventListener('click', async (e) => {
    if (e.target.id === 'ajouterContactBtn') {
        document.body.insertAdjacentHTML('beforeend', createContactForm());
        
        document.getElementById('addContactForm').addEventListener('submit', ajouterContact);
        document.getElementById('annulerContact').addEventListener('click', fermerFormulaireContact);
    }


    // Nouveau gestionnaire pour le menu
    if (e.target.id === 'menuBtn') {
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu.classList.toggle('hidden');
    }

    // Fermer le menu si on clique ailleurs
    if (!e.target.closest('#dropdownMenu') && !e.target.closest('#menuBtn')) {
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
        }
    }

    // Gestionnaire pour le bouton de déconnexion dans le menu
    if (e.target.closest('#menuLogoutBtn')) {
        e.preventDefault();
        handleLogout();
    }

    if (e.target.closest('#newGroupLink')) {
        e.preventDefault();
        const contacts = await chargerContacts();
        const discussionContainer = document.querySelector('.discussion-panel'); // ✅ Déclaration ici
        if (discussionContainer) {
            discussionContainer.outerHTML = createGroupView(contacts);
            attachGroupContactEvents(); // Réattache les événements de sélection
        }
    }

});

// Supprimer les multiples event listeners DOMContentLoaded et les combiner en un seul
window.addEventListener('DOMContentLoaded', async () => {
    // Chargement initial des contacts
    const { contacts, groups } = await chargerContacts();
    const listeContacts = document.getElementById('listeContacts');
    if (listeContacts) {
        listeContacts.innerHTML = afficherContacts({ contacts, groups });
        attachContactClickEvents();
    }

    // Configuration de la recherche
    const searchInput = document.getElementById('searchGroupContacts');
    if (searchInput) {
        const debouncedSearch = debounce(async (searchTerm) => {
            const { contacts, groups } = await chargerContacts();
            
            const filteredContacts = contacts ? contacts.filter(contact => 
                contact.prenom?.toLowerCase().includes(searchTerm) ||
                contact.nom?.toLowerCase().includes(searchTerm) ||
                contact.numero?.includes(searchTerm)
            ) : [];
            
            const filteredGroups = groups ? groups.filter(group =>
                group.name?.toLowerCase().includes(searchTerm)
            ) : [];
            
            const listeContacts = document.getElementById('listeContacts');
            if (listeContacts) {
                listeContacts.innerHTML = afficherContacts({
                    contacts: filteredContacts,
                    groups: filteredGroups
                });
                attachContactClickEvents();
            }
        });

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            debouncedSearch(searchTerm);
        });
    }
});

// Dans main.js, modifiez la fonction attachContactClickEvents
function attachContactClickEvents() {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', async (event) => {
            try {
                if (item.dataset.contact) {
                    const contact = JSON.parse(item.dataset.contact.replace(/&apos;/g, "'"));
                    await handleContactClick(contact, event);
                } else if (item.dataset.group) {
                    const group = JSON.parse(item.dataset.group.replace(/&apos;/g, "'"));
                    await handleGroupClick(group, event);
                }
            } catch (error) {
                console.error('Erreur lors du traitement du clic:', error);
            }
        });
    });
}

// Assurez-vous que handleGroupClick est bien défini
async function handleGroupClick(group, event) {
    const allItems = document.querySelectorAll('#listeContacts > div');
    allItems.forEach(el => el.classList.remove('bg-[#f0f2f5]'));

    const clickedItem = event.currentTarget;
    clickedItem.classList.add('bg-[#f0f2f5]');

    const chatContainer = document.querySelector('.areaa');
    if (chatContainer) {
        chatContainer.outerHTML = await createGroupChatArea(group);
    }
}

// Assurez-vous que handleContactClick est défini comme une fonction normale (pas une méthode window)
async function handleContactClick(contact, event) {
    const allItems = document.querySelectorAll('#listeContacts > div');
    allItems.forEach(el => el.classList.remove('bg-[#f0f2f5]'));

    const clickedItem = event.currentTarget;
    clickedItem.classList.add('bg-[#f0f2f5]');

    const chatContainer = document.querySelector('.areaa');
    if (chatContainer) {
        const chatAreaContent = await createChatArea(contact);
        chatContainer.outerHTML = chatAreaContent;
    }
}

function attachGroupContactEvents() {
    const contactItems = document.querySelectorAll('.contact-select-item');
    const createGroupBtn = document.getElementById('createGroupButton');
    const selectedContacts = new Set();

    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const numero = item.querySelector('p').textContent;
            const checkbox = item.querySelector('.contact-checkbox');

            if (selectedContacts.has(numero)) {
                selectedContacts.delete(numero);
                checkbox.classList.remove('bg-green-500');
            } else {
                selectedContacts.add(numero);
                checkbox.classList.add('bg-green-500');
            }

            // Activer / désactiver le bouton
            if (selectedContacts.size > 0) {
                createGroupBtn.disabled = false;
                createGroupBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                createGroupBtn.disabled = true;
                createGroupBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
    });
}

// Ajouter cette fonction de debounce en haut du fichier
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}
