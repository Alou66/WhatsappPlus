import './index.css'
import { createSidebar } from './components/sidebar.js'
import { createDiscussion } from './components/discussion.js'
import { createChatArea } from './components/chatarea.js'
import { createLoginForm } from './components/login.js'
import { createRegisterForm } from './components/registre.js'
import { handleLogin } from './components/loginlogique.js'
import { handleRegister } from './components/registrelogique.js'
import { afficherContacts, chargerContacts } from './components/contactLogique.js'
import { createGroupForm } from './components/groupForm.js'
import { createGroupView } from './components/groupView.js';
import { createGroup } from './components/groupLogique.js';

const app = document.querySelector('#app')
const isLoggedIn = localStorage.getItem('user')

if (!isLoggedIn) {
    app.innerHTML = createLoginForm()
    
    document.addEventListener('click', (e) => {
        if (e.target.id === 'registerLink') {
            app.innerHTML = createRegisterForm()
        } else if (e.target.id === 'loginLink') {
            app.innerHTML = createLoginForm()
        }
    })
} else {
    // Utiliser une fonction asynchrone auto-exécutée
    (async () => {
        const sidebar = await createSidebar();
        const defaultChatArea = await createChatArea();
        
        app.innerHTML = `
            <div class="flex h-screen w-full justify-center items-center">
                <div class="flex h-[95%] w-[95%] shadow-[0px_0px_13px_-4px_#000000]">
                    ${sidebar}
                    ${createDiscussion()}
                    ${defaultChatArea}
                </div>
            </div>
        `;
    })();
}

document.addEventListener('click', async (e) => {
    // ... autres conditions

    if (e.target.id === 'backToDiscussions') {
        e.preventDefault();
        const contacts = await chargerContacts();
        const groupPanel = document.querySelector('.discussion-panel'); // le conteneur actuel du panneau groupe

        if (groupPanel) {
            groupPanel.outerHTML = createDiscussion();

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
        }
    }

    if (e.target.closest('#createGroupButton') && !e.target.closest('#createGroupButton').disabled) {
        const discussionPanel = document.querySelector('.discussion-panel');
        if (discussionPanel) {
            discussionPanel.outerHTML = createGroupForm(); // Remplacer directement le panel
        }
    }

    // Ajouter un gestionnaire pour le retour
    if (e.target.id === 'backToGroupView') {
        const { contacts } = await chargerContacts(); // Destructurer pour obtenir juste contacts
        const discussionPanel = document.querySelector('.discussion-panel');
        if (discussionPanel) {
            discussionPanel.outerHTML = createGroupView({ contacts }); // Passer un objet avec contacts
            attachGroupContactEvents();
        }
    }

    // Ajouter un gestionnaire pour la création du groupe
    if (e.target.closest('#createGroupSubmit')) {
        const groupName = document.getElementById('groupName').value.trim();
        const groupDescription = document.getElementById('groupDescription').value.trim();
        
        if (!groupName) {
            alert('Le nom du groupe est obligatoire');
            return;
        }
        
        try {
            const newGroup = await createGroup(groupName, groupDescription, Array.from(selectedGroupContacts));
                selectedGroupContacts.clear();
            
            const discussionPanel = document.querySelector('.discussion-panel');
            if (discussionPanel) {
                discussionPanel.outerHTML = createDiscussion();
                const { contacts, groups } = await chargerContacts();
                const listeContacts = document.getElementById('listeContacts');
                if (listeContacts) {
                    listeContacts.innerHTML = afficherContacts({ contacts, groups });
                    // Réattacher les événements de clic
                    attachContactClickEvents();
                }
            }
            
            alert('Groupe créé avec succès !');
        } catch (error) {
            alert('Erreur lors de la création du groupe: ' + error.message);
        }
    }

    // Dans le gestionnaire de clic pour #newGroupLink
    if (e.target.closest('#newGroupLink')) {
        e.preventDefault();
        const { contacts } = await chargerContacts(); // Destructurer pour obtenir juste contacts
        const discussionContainer = document.querySelector('.discussion-panel');
        if (discussionContainer) {
            discussionContainer.outerHTML = createGroupView({ contacts }); // Passer un objet avec contacts
            attachGroupContactEvents();
        }
    }

    // De même pour le gestionnaire de backToGroupView
    if (e.target.id === 'backToGroupView') {
        const { contacts } = await chargerContacts(); // Destructurer pour obtenir juste contacts
        const discussionPanel = document.querySelector('.discussion-panel');
        if (discussionPanel) {
            discussionPanel.outerHTML = createGroupView({ contacts }); // Passer un objet avec contacts
            attachGroupContactEvents();
        }
    }
});


document.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (e.target.id === 'registerForm') {
        await handleRegister(app)
    }
    if (e.target.id === 'loginForm') {
        await handleLogin(app)
    }
})

// Ajouter cette variable au niveau global pour stocker les contacts sélectionnés
const selectedGroupContacts = new Set();

// Modifier la fonction attachGroupContactEvents
function attachGroupContactEvents() {
    const contactItems = document.querySelectorAll('.contact-select-item');
    const createGroupBtn = document.getElementById('createGroupButton');

    contactItems.forEach(item => {
        const numero = item.querySelector('p').textContent;
        const checkbox = item.querySelector('.contact-checkbox');
        
        // Restaurer l'état de sélection
        if (selectedGroupContacts.has(numero)) {
            checkbox.classList.add('bg-green-500');
        }

        item.addEventListener('click', () => {
            if (selectedGroupContacts.has(numero)) {
                selectedGroupContacts.delete(numero);
                checkbox.classList.remove('bg-green-500');
            } else {
                selectedGroupContacts.add(numero);
                checkbox.classList.add('bg-green-500');
            }

            // Activer / désactiver le bouton
            if (selectedGroupContacts.size > 0) {
                createGroupBtn.disabled = false;
                createGroupBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                createGroupBtn.disabled = true;
                createGroupBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
    });

    // Activer le bouton si des contacts sont déjà sélectionnés
    if (selectedGroupContacts.size > 0) {
        createGroupBtn.disabled = false;
        createGroupBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Modifier le gestionnaire de clic pour backToGroupView
document.addEventListener('click', async (e) => {
    // ...existing code...

    if (e.target.id === 'backToGroupView') {
        const { contacts } = await chargerContacts(); // Destructurer pour obtenir juste contacts
        const discussionPanel = document.querySelector('.discussion-panel');
        if (discussionPanel) {
            discussionPanel.outerHTML = createGroupView({ contacts }); // Passer un objet avec contacts
            attachGroupContactEvents(); // Les sélections seront restaurées
        }
    }

});

// Ajoutez cette fonction pour gérer les événements de clic
function attachContactClickEvents() {
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', async (event) => {
            if (item.dataset.contact) {
                const data = item.dataset.contact.replace(/&apos;/g, "'");
                const contact = JSON.parse(data);
                await handleContactClick(contact, event);
            } else if (item.dataset.group) {
                const data = item.dataset.group.replace(/&apos;/g, "'");
                const group = JSON.parse(data);
                // Gérer le clic sur un groupe (à implémenter)
                // await handleGroupClick(group, event);
            }
        });
    });
}


