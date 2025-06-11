import { createContactForm } from './contactForm.js';
import { ajouterContact, fermerFormulaireContact, chargerContacts, afficherContacts } from './contactLogique.js';

export function createDiscussion() {
    return `
        <div class="w-[30%] flex flex-col border-r border-[#959797]">
            <div class="h-[60px] flex items-center justify-between p-5">
                <div class="text-[25px]">Discussions</div>
                <div class="flex items-center gap-8">
                    <i id="ajouterContactBtn" class="fas fa-plus text-[20px] text-gray-800 cursor-pointer"></i>
                    <i class="fas fa-ellipsis-vertical text-[20px] text-gray-800"></i>
                </div>
            </div>
            <div class="px-3 py-3">
                <i class="fas fa-search absolute bottom-[625px] left-[150px]"></i>
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
});

// Chargement initial des contacts
window.addEventListener('DOMContentLoaded', async () => {
    const contacts = await chargerContacts();
    const listeContacts = document.getElementById('listeContacts');
    if (listeContacts) {
        listeContacts.innerHTML = afficherContacts(contacts);
    }
});