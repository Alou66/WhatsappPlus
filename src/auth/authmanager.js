// import { handleRegister } from './components/registrelogique.js'
// import { handleLogin } from './components/loginlogique.js'
// import { handleLogout } from './components/logoutlogique.js'
// import { createSidebar } from './components/sidebar.js'
// import { createDiscussion, initDiscussionListeners } from '../components/discussion.js'
// import { createChatArea } from './components/chatarea.js'

// export const initAuthListeners = (app) => {
//     document.addEventListener('submit', async (e) => {
//         e.preventDefault()
//         if (e.target.id === 'registerForm') {
//             await handleRegister(app)
//         }
//         if (e.target.id === 'loginForm') {
//             await handleLogin(app)
//         }
//     })
// }

// export const renderAuthenticatedApp = async (app) => {
//     try {
//         const sidebar = await createSidebar();
//         app.innerHTML = `
//             <div class="flex h-screen w-full justify-center items-center">
//                 <div class="flex h-[95%] w-[95%] shadow-[0px_0px_13px_-4px_#000000]">
//                     ${sidebar}
//                     ${createDiscussion()}
//                     ${createChatArea()}
//                 </div>
//             </div>
//         `;
        
//         // Initialiser les écouteurs d'événements après que le DOM soit mis à jour
//         setTimeout(() => {
//             initDiscussionListeners();
//             const logoutBtn = document.querySelector('#logoutBtn');
//             if (logoutBtn) {
//                 logoutBtn.addEventListener('click', handleLogout);
//             }
//         }, 0);
        
//     } catch (error) {
//         console.error('Erreur lors du rendu de l\'application:', error);
//     }
// }


