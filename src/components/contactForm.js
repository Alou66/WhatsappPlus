export function createContactForm() {
    return `
        <div id="contactFormModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">Ajouter un contact</h2>
                <form id="addContactForm">
                    <div class="mb-4">
                        <input type="text" id="contactPrenom" placeholder="Prénom" 
                            class="w-full p-2 border rounded" 
                            >
                    </div>
                    <div class="mb-4">
                        <input type="text" id="contactNom" placeholder="Nom" 
                            class="w-full p-2 border rounded"
                            >
                    </div>
                    <div class="mb-4">
                        <input type="tel" id="contactNumero" placeholder="Numéro de téléphone" 
                            class="w-full p-2 border rounded"
                            >
                    </div>
                    <div class="flex justify-end gap-2">
                        <button type="button" id="annulerContact" class="px-4 py-2 bg-gray-200 rounded">Annuler</button>
                        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}