import { createContactForm } from './contactForm.js';
import { ajouterContact, fermerFormulaireContact, chargerContacts, afficherContacts } from './contactLogique.js';
import { createChatArea } from './chatarea.js';
import { handleLogout } from './logoutlogique.js';

export function createDiscussion() {
    return `
        <div class="w-[30%] flex flex-col border-r border-[#959797]">
            <div class="h-[60px] flex items-center justify-between p-5 relative">
                <div class="text-[25px]">Discussions</div>
                <div class="flex items-center gap-8">
                    <i id="ajouterContactBtn" class="fas fa-plus text-[20px] text-gray-800 cursor-pointer"></i>
                    <div class="relative">
                        <i id="menuBtn" class="fas fa-ellipsis-vertical text-[20px] text-gray-800 cursor-pointer"></i>
                        <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                <i class="fas fa-search absolute bottom-[700px] left-[150px]"></i>
                <input type="text" id="search" placeholder="Rechercher" class="w-full px-12 h-10 border border-gray-300 rounded-[7px] bg-[#f0ecec]"/>
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
});

// Chargement initial des contacts
window.addEventListener('DOMContentLoaded', async () => {
    const contacts = await chargerContacts();
    const listeContacts = document.getElementById('listeContacts');
    if (listeContacts) {
        listeContacts.innerHTML = afficherContacts(contacts);
        listeContacts.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', async (event) => {
                const data = item.dataset.contact.replace(/&apos;/g, "'");
                const contact = JSON.parse(data);
                await handleContactClick(contact, event);
            });
        });
    }
});

window.handleContactClick = async function(contact, event) {
    const allContacts = document.querySelectorAll('#listeContacts > div');
    allContacts.forEach(el => el.classList.remove('bg-[#f0f2f5]'));

    const clickedContact = event.currentTarget;
    clickedContact.classList.add('bg-[#f0f2f5]');

    const chatContainer = document.querySelector('.areaa');
    if (chatContainer) {
        const chatAreaContent = await createChatArea(contact);
        chatContainer.outerHTML = chatAreaContent;
    }
};

