import './index.css'
import { createSidebar } from './components/sidebar.js'
import { createDiscussion } from './components/discussion.js'
import { createChatArea } from './components/chatarea.js'
import { createLoginForm } from './components/login.js'
import { createRegisterForm } from './components/registre.js'
import { handleLogin } from './components/loginlogique.js'
import { handleRegister } from './components/registrelogique.js'

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

document.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (e.target.id === 'registerForm') {
        await handleRegister(app)
    }
    if (e.target.id === 'loginForm') {
        await handleLogin(app)
    }
})


