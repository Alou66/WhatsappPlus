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