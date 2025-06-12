import { API } from '../config/api.js'

export async function createSidebar() {
    // Récupérer l'ID de l'utilisateur connecté
    const userId = JSON.parse(localStorage.getItem('user')).id;
    
    // Récupérer les données de l'utilisateur depuis le serveur
    const response = await fetch(`${API}/${userId}`);
    const user = await response.json();
    
    // Créer les initiales avec les données du serveur
    const initiales = `${user.firstName[0]}${user.lastName[0]}`;

    return `
        <div class="w-[6%] flex flex-col border-r border-[#959797] bg-[#c9c6c6] justify-between">
            <div class="flex flex-col items-center justify-center gap-8 p-8 ">
                <i class="fa-solid fa-message text-[25px] text-gray-700"></i>
                <i class="fas fa-bullseye text-[25px] text-gray-700"></i>
                <i class="fas fa-comment-dots text-[25px] text-gray-700"></i>
                <i class="fa-solid fa-users text-[25px] text-gray-700"></i>
            </div>
            <div class="w-[100%] h-[200px] flex flex-col items-center gap-8">
                <i class="fa-solid fa-gear text-[25px] text-gray-700"></i>                
                <div class="flex w-[50px] h-[50px] border text-[20px] rounded-full bg-gray-300 justify-center items-center">${initiales}</div>
                <i id="logoutBtn" class="fas fa-right-from-bracket text-[25px] text-red-500 cursor-pointer hover:text-red-800"></i>
            </div>
        </div>
    `;
}