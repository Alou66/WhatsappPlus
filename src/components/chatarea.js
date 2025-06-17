import { sendMessage, getMessages } from './messageLogique.js';

export async function createChatArea(contact = null) {
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

    const messages = await getMessages(contact.numero);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // Modifier la première partie où les messages sont affichés initialement
    const messagesList = messages.map(msg => `
        <div class="flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'} mb-4">
            <div class="max-w-[60%] ${msg.senderId === currentUser.id ? 'bg-[#128C7E]' : 'bg-white'} rounded-lg p-3 shadow">
                <p class="${msg.senderId === currentUser.id ? 'text-white' : 'text-[#111b21]'}">${msg.content}</p>
                <p class="${msg.senderId === currentUser.id ? 'text-gray-200' : 'text-gray-500'} text-xs text-right">
                    ${new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    `).join('');

    const chatAreaHTML = `
        <div class="w-[64%] areaa flex flex-col">
            <!-- En-tête du chat -->
            <div class="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-l border-[#e9edef]">
                <div class="flex items-center gap-3 cursor-pointer">
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
            <div id="messagesContainer" class="flex-1 bg-[#efeae2] overflow-y-auto p-4" 
                 style="background-image: url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png');">
                ${messagesList}
            </div>

            <!-- Zone de saisie -->
            <div class="h-[62px] bg-[#f0f2f5] flex items-center gap-2 px-4">
                <div class="flex items-center gap-4 text-[#54656f]">
                    <i class="far fa-smile text-xl cursor-pointer hover:text-[#202020]"></i>
                    <i class="fas fa-paperclip text-xl cursor-pointer hover:text-[#202020]"></i>
                </div>
                <form id="messageForm" class="flex-1 flex items-center gap-2">
                    <input 
                        type="text" 
                        id="messageInput" 
                        placeholder="Tapez un message" 
                        class="w-full py-2 px-4 rounded-lg border-none focus:outline-none bg-white"
                    >
                    <button type="submit" class="fas fa-paper-plane text-xl text-[#54656f] cursor-pointer hover:text-[#202020]"></button>
                </form>
            </div>
        </div>
    `;

    // Après le rendu, ajouter les événements
    setTimeout(() => {
        const messageForm = document.getElementById('messageForm');
        const messagesContainer = document.getElementById('messagesContainer');
        
        messageForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = document.getElementById('messageInput');
            const content = input.value.trim();
            
            if (content) {
                try {
                    await sendMessage(content, contact.numero);
                    input.value = '';
                    // Recharger les messages
                    const newMessages = await getMessages(contact.numero);
                    messagesContainer.innerHTML = newMessages.map(msg => `
                        <div class="flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'} mb-4">
                            <div class="max-w-[60%] ${msg.senderId === currentUser.id ? 'bg-[#128C7E]' : 'bg-white'} rounded-lg p-3 shadow">
                                <p class="${msg.senderId === currentUser.id ? 'text-white' : 'text-[#111b21]'}">${msg.content}</p>
                                <p class="${msg.senderId === currentUser.id ? 'text-gray-200' : 'text-gray-500'} text-xs text-right">
                                    ${new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    `).join('');
                    
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } catch (error) {
                    console.error('Erreur lors de l\'envoi du message:', error);
                }
            }
        });
        
        // Scroll vers le bas au chargement
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 0);

    return chatAreaHTML;
}

// Ajouter cette nouvelle fonction
export async function createGroupChatArea(group) {
    return `
        <div class="w-[64%] areaa flex flex-col">
            <div class="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-l border-[#e9edef]">
                <div class="flex items-center gap-3 cursor-pointer">
                    <div class="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                        ${group.name[0]}
                    </div>
                    <div>
                        <h3 class="font-medium text-[#111b21]">${group.name}</h3>
                        <p class="text-sm text-[#667781]">${group.members.length} membres</p>
                    </div>
                </div>
                <div class="flex items-center gap-6 text-[#54656f]">
                    <i class="fas fa-search text-xl"></i>
                    <i class="fas fa-ellipsis-vertical text-xl"></i>
                </div>
            </div>

            <div id="groupMessagesContainer" class="flex-1 bg-[#efeae2] overflow-y-auto p-4"
                 style="background-image: url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png');">
                <!-- Les messages du groupe seront affichés ici -->
            </div>

            <div class="h-[62px] bg-[#f0f2f5] flex items-center gap-2 px-4">
                <div class="flex items-center gap-4 text-[#54656f]">
                    <i class="far fa-smile text-xl cursor-pointer hover:text-[#202020]"></i>
                    <i class="fas fa-paperclip text-xl cursor-pointer hover:text-[#202020]"></i>
                </div>
                <form id="groupMessageForm" class="flex-1 flex items-center gap-2">
                    <input type="text" 
                           id="groupMessageInput" 
                           placeholder="Tapez un message" 
                           class="w-full py-2 px-4 rounded-lg border-none focus:outline-none bg-white">
                    <button type="submit" class="fas fa-paper-plane text-xl text-[#54656f] cursor-pointer hover:text-[#202020]"></button>
                </form>
            </div>
        </div>
    `;
}
