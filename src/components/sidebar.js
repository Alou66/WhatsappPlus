export function createSidebar() {
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
                <div class="w-[50px] h-[50px] border border-black rounded-full bg-slate-400 text-center">profil</div>
                <i id="logoutBtn" class="fas fa-right-from-bracket text-[25px] text-red-500 cursor-pointer hover:text-red-800"></i>
            </div>
        </div>
    `;
}

// function generateChatList() {
//     const chats = [
//         { name: 'John Doe', message: 'Hello, how are you?', time: '10:30', img: 'https://via.placeholder.com/150' },
//         { name: 'Jane Smith', message: 'Can we meet tomorrow?', time: '09:15', img: 'https://via.placeholder.com/150' },
//     ];

//     return chats.map(chat => `
//         <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#f0f2f5] cursor-pointer">
//             <img src="${chat.img}" alt="${chat.name}" class="w-12 h-12 rounded-full">
//             <div class="flex-1 border-b border-[#e9edef] pb-2">
//                 <div class="flex justify-between items-center">
//                     <h3 class="font-medium text-[#111b21]">${chat.name}</h3>
//                     <span class="text-xs text-[#667781]">${chat.time}</span>
//                 </div>
//                 <p class="text-sm text-[#667781] truncate">${chat.message}</p>
//             </div>
//         </div>
//     `).join('');
// }