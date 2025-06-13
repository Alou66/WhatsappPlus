export function createChatArea(contact = null) {
    if (!contact) {
        return `
            <div class="w-[64%] areaa flex flex-col bg-[#f0f2f5] justify-center items-center gap-9">  
                <div class="text-center">
                    <img src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg" 
                         alt="WhatsApp" class="w-96"/>
                </div>
                <div class="text-[32px] text-[#41525d] font-light">WhatsApp Web</div>
                <div class="text-center text-[#667781]">
                    Envoyez et recevez des messages sans avoir à garder votre téléphone connecté.<br>
                    Utilisez WhatsApp sur un maximum de 4 appareils et 1 téléphone simultanément.
                </div>
                <div class="fixed bottom-[40px] text-[#8696a0] text-sm">
                    <i class="fas fa-lock text-[12px]"></i> 
                    Vos messages personnels sont chiffrés de bout en bout
                </div> 
            </div>
        `;
    }

    const chatAreaHTML = `
        <div class="w-[64%] areaa flex flex-col">
            <!-- En-tête du chat -->
            <div class="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-l border-[#e9edef]">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#DFE5E7] flex items-center justify-center text-[#54656f]">
                        ${contact.prenom[0]}${contact.nom[0]}
                    </div>
                    <div>
                        <h3 class="font-medium text-[#111b21]">${contact.prenom} ${contact.nom}</h3>
                        <p class="text-sm text-[#667781]">Cliquez ici pour obtenir les informations du contact</p>
                    </div>
                </div>
                <div class="flex items-center gap-6 text-[#54656f]">
                    <i class="fas fa-search text-xl"></i>
                    <i class="fas fa-ellipsis-vertical text-xl"></i>
                </div>
            </div>

            <!-- Zone des messages -->
            <div class="flex-1 bg-[#efeae2] overflow-y-auto p-4" 
                 style="background-image: url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png');">
                <!-- Les messages s'afficheront ici -->
            </div>

            <!-- Zone de saisie -->
            <div class="h-[62px] bg-[#f0f2f5] flex items-center gap-2 px-4">
                <div class="flex items-center gap-4 text-[#54656f]">
                    <i class="far fa-smile text-xl cursor-pointer hover:text-[#202020]"></i>
                    <i class="fas fa-paperclip text-xl cursor-pointer hover:text-[#202020]"></i>
                </div>
                <div class="flex-1 mx-2">
                    <input 
                        type="text" 
                        id="messageInput" 
                        placeholder="Tapez un message" 
                        class="w-full py-2 px-4 rounded-lg border-none focus:outline-none bg-white"
                        oninput="toggleSendIcon(this)"
                    >
                </div>
                <i id="sendIcon" class="fas fa-microphone text-xl text-[#54656f] cursor-pointer hover:text-[#202020]"></i>
            </div>
        </div>
    `;

    // Ajouter la fonction toggleSendIcon au window pour qu'elle soit accessible globalement
    window.toggleSendIcon = function(input) {
        const sendIcon = document.getElementById('sendIcon');
        if (input.value.trim() !== '') {
            sendIcon.className = 'fa-solid fa-paper-plane text-xl text-[#54656f] cursor-pointer hover:text-[#202020]';
        } else {
            sendIcon.className = 'fas fa-microphone text-xl text-[#54656f] cursor-pointer hover:text-[#202020]';
        }
    };

    return chatAreaHTML;
}
