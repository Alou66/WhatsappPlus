import './index.css'
import { createSidebar } from './components/sidebar.js'
import { createDiscussion } from './components/discussion.js'
import { createChatArea } from './components/chatarea.js'
import { createLoginForm } from './components/login.js'
import { createRegisterForm } from './components/registre.js'
import { handleLogin } from './components/loginlogique.js'
import { handleRegister } from './components/registrelogique.js'
import { afficherContacts, chargerContacts } from './components/contactLogique.js'

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


