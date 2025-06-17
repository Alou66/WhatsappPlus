export function createParametresView() {
    const user = JSON.parse(localStorage.getItem('user'));
    const initiales = `${user.firstName[0]}${user.lastName[0]}`;

    return `
        <div class="discussion-panel w-[30%] flex flex-col border-r border-[#959797]">
            <div class="h-[60px] flex items-center gap-4 p-5">
                <i id="backToDiscussions" class="fas fa-arrow-left text-[20px] text-gray-800 cursor-pointer"></i>
                <div class="text-[20px] font-medium">Paramètres</div>
            </div>
            
            <!-- Barre de recherche -->
            <div class="px-3 py-3">
                <div class="relative">
                    <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                    <input type="text" 
                           placeholder="Rechercher un paramètre" 
                           class="w-full pl-10 pr-4 h-10 border border-gray-300 rounded-[7px] bg-[#f0ecec]"/>
                </div>
            </div>

            <!-- Profil utilisateur -->
            <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                <div class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                    ${initiales}
                </div>
                <div>
                    <h3 class="font-medium text-[16px]">${user.firstName} ${user.lastName}</h3>
                    <p class="text-sm text-gray-500">Le travail acharné bat le talent quand le talent...</p>
                </div>
            </div>

            <!-- Liste des paramètres -->
            <div class="flex-1 gap-2 overflow-y-auto">
                <!-- Compte -->
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fas fa-user text-gray-700"></i>
                    </div>
                    <div>
                        <h3 class="font-medium">Compte</h3>
                        <p class="text-sm text-gray-500">Confidentialité, sécurité, changer de numéro</p>
                    </div>
                </div>

                <!-- Confidentialité -->
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fas fa-lock text-gray-700"></i>
                    </div>
                    <div>
                        <h3 class="font-medium">Confidentialité</h3>
                        <p class="text-sm text-gray-500">Blocage des contacts, messages éphémères</p>
                    </div>
                </div>
                 <!-- Stockage et données -->
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fas fa-database text-gray-700"></i>
                    </div>
                    <div>
                        <h3 class="font-medium">Discussion</h3>
                        <p class="text-sm text-gray-500">Utilisation du réseau, téléchargement auto</p>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fas fa-bell text-gray-700"></i>
                    </div>
                    <div>
                        <h3 class="font-medium">Notifications</h3>
                        <p class="text-sm text-gray-500">Sons des messages, groupes et appels</p>
                    </div>
                </div>

                <!-- Aide -->
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fas fa-question text-gray-700"></i>
                    </div>
                    <div>
                        <h3 class="font-medium">Aide</h3>
                        <p class="text-sm text-gray-500">Centre d'aide, contactez-nous</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 p-4 hover:bg-[#f0f2f5] cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[white] flex items-center justify-center">
                        <i class="fa fa-sign-out text-red-500 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-red-500">Déconnexion</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
}