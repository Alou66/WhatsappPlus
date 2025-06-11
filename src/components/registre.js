export function createRegisterForm() {
    return `
        <div class="flex w-full flex-col items-center justify-center h-screen bg-gray-100">
            <form id="registerForm" class="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 class="text-2xl font-bold mb-6 text-center">Inscription WhatsApp</h2>
                <div class="mb-4">
                    <input type="text" id="firstName" placeholder="Prénom" class="w-full p-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <input type="text" id="lastName" placeholder="Nom" class="w-full p-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <input type="tel" id="phoneNumber" placeholder="Numéro de téléphone" class="w-full p-2 border rounded" required>
                </div>
                <div class="mb-6">
                    <input type="password" id="password" placeholder="Mot de passe" class="w-full p-2 border rounded" required>
                </div>
                <button type="submit" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    S'inscrire
                </button>
                <p class="mt-4 text-center">
                    Déjà inscrit? <a href="#" id="loginLink" class="text-green-500">Se connecter</a>
                </p>
            </form>
        </div>
    `;
}