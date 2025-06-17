export function createGroupForm() {
    return `
        <div class="discussion-panel w-[30%] flex flex-col">
            <div class="h-[60px] flex items-center gap-4 p-5 ">
                <i id="backToGroupView" class="fas fa-arrow-left text-[20px] text-gray-800 cursor-pointer"></i>
                <div class="text-[20px]">Nouveau groupe</div>
            </div>
            <div class="p-4 flex flex-col gap-4">
                <div class="flex flex-col items-center gap-4">
                    <div class="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center text-2xl text-gray-600">
                        <i class="fas fa-camera"></i>
                    </div>
                    <div class="flex-1">
                        <input type="text" 
                               id="groupName" 
                               placeholder="Nom du groupe" 
                               class="w-full p-2 border rounded"
                               >
                    </div>
                </div>
                <div>
                    <textarea id="groupDescription" 
                            placeholder="Description du groupe" 
                            class="w-full p-2 border rounded h-24 resize-none"
                            ></textarea>
                </div>
                <!--<div class="mt-auto">
                    <button type="button" 
                            id="createGroupSubmit" 
                            class="w-full px-4 py-2 bg-green-500 text-white rounded">
                        Créer le groupe
                    </button>
                </div>--> 
                <div class="p-4 h-[340px] flex items-end justify-center">
                <button id="createGroupSubmit" 
                        class="w-[50px] h-[50px] bg-green-500 text-white rounded-full cursor-not-allowed flex items-center justify-center"
                        >
                    <i class="fas fa-check text-[20px]"></i> 
                </button>
            </div>    
    `;
}
               