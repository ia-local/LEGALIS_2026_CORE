/**
 * ROLE : Gestion de la persistance (Local et Serveur)
 */
export const DataManager = {
    // Synchronise chaque message dans soup.md
    async syncToSoup(role, message, agent) {
        try {
            await fetch('/api/sync-soup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, message, agent })
            });
        } catch (error) {
            console.error("Échec de la synchronisation soup.md", error);
        }
    },

    // Crée une nouvelle session physique dans soup.md
    async createChat(title) {
        const id = Date.now();
        try {
            await fetch('/api/conversations/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, title })
            });
            return id;
        } catch (error) {
            console.error("Erreur création session", error);
        }
    },

    // Supprime une session (API + Local)
    async deleteChat(id) {
        try {
            await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
            this.clearLocalHistory();
        } catch (error) {
            console.error("Erreur suppression session", error);
        }
    },
// Dans DataManager.js
clearLocalHistory() {
    localStorage.removeItem('legalis_chat_history');
    // On ne recharge plus la page, on laisse le chatbot vider son propre état
    console.log("Historique local purgé.");
}
};