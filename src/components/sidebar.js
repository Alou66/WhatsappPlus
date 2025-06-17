import { API } from '../config/api.js'
import { createParametresView } from './parametres.js'

export async function createSidebar() {
    // Récupérer l'ID de l'utilisateur connecté
    const userId = JSON.parse(localStorage.getItem('user')).id;
    
    // Récupérer les données de l'utilisateur depuis le serveur
    const response = await fetch(`${API}/${userId}`);
    const user = await response.json();
    
    // Créer les initiales avec les données du serveur
    const initiales = `${user.firstName[0]}${user.lastName[0]}`;

    const sidebarHtml = `
        <div class="w-[6%] flex flex-col border-r border-[#959797] bg-[#c9c6c6] justify-between">
            <div class="flex flex-col items-center justify-center gap-8 p-8 ">
                <i class="fa-solid fa-message text-[25px] text-gray-700 cursor-pointer"></i>
                <i class="fas fa-bullseye text-[25px] text-gray-700 cursor-pointer"></i>
                <i class="fas fa-comment-dots text-[25px] text-gray-700 cursor-pointer"></i>
                <i class="fa-solid fa-users text-[25px] text-gray-700 cursor-pointer"></i>
            </div>
            <div class="w-[100%] p-3 flex flex-col items-center gap-8">
                <i id="parametresBtn" class="fa-solid fa-gear text-[25px] text-gray-700 cursor-pointer"></i>                
                <div class="flex w-[50px] h-[50px] border text-[20px] rounded-full bg-gray-300 justify-center items-center cursor-pointer">${initiales}</div>
            </div>
        </div>
    `;

    // Ajouter après le rendu
    setTimeout(() => {
        const parametresBtn = document.getElementById('parametresBtn');
        if (parametresBtn) {
            parametresBtn.addEventListener('click', () => {
                const discussionPanel = document.querySelector('.discussion-panel');
                if (discussionPanel) {
                    discussionPanel.outerHTML = createParametresView();
                }
            });
        }
    }, 0);

    return sidebarHtml;
}