export function createLoginForm() {
    return `
        <div class="flex w-full flex-col items-center justify-center h-screen bg-gray-100">
            <form id="loginForm" class="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 class="text-2xl font-bold mb-6 text-center">Connexion WhatsApp</h2>
                <div class="mb-4">
                    <input type="tel" id="loginPhone" placeholder="Numéro de téléphone" class="w-full p-2 border rounded" required>
                </div>
                <div class="mb-6">
                    <input type="password" id="loginPassword" placeholder="Mot de passe" class="w-full p-2 border rounded" required>
                </div>
                <button type="submit" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Se connecter
                </button>
                <p class="mt-4 text-center">
                    Pas encore inscrit? <a href="#" id="registerLink" class="text-green-500">S'inscrire</a>
                </p>
            </form>
        </div>
    `;
}