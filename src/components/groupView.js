// import { afficherContacts, chargerContacts } from "./contactLogique";
// import { createDiscussion } from "./discussion";

export function createGroupView(contacts) {
    return `
        <div class="discussion-panel w-[30%] flex flex-col border-r border-[#959797]">
            <div class="h-[60px] flex items-center gap-4 p-5 border-b">
                <i id="backToDiscussions" class="fas fa-close text-[20px] text-gray-800 cursor-pointer"></i>
                <div class="text-[20px]">Ajouter des membres au groupe</div>
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
            <div id="groupContactsList" class="flex-1 overflow-y-auto">
                ${contacts.map(contact => `
                    <div class="contact-select-item flex items-center gap-3 px-4 py-3 hover:bg-[#f0f2f5] cursor-pointer">
                        <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            ${contact.prenom[0]}${contact.nom[0]}
                        </div>
                        <div class="flex-1">
                            <h3 class="font-medium text-[#111b21]">${contact.prenom} ${contact.nom}</h3>
                            <p class="text-sm text-[#667781]">${contact.numero}</p>
                        </div>
                        <div class="contact-checkbox w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                    </div>
                `).join('')}
            </div>
            <div class="p-4 flex items-center justify-center">
                <button id="createGroupButton" 
                        class="w-[50px] h-[50px] bg-green-500 text-white rounded-full opacity-50 cursor-not-allowed flex items-center justify-center"
                        disabled>
                    <i class="fas fa-arrow-right text-[20px]"></i> 
                </button>
            </div>
        </div>
    `;
}
