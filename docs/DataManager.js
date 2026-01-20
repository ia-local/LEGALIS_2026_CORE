/**
 * ROLE : Gestion de la persistance (Local et Serveur)
 */
export const DataManager = {
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
    async createChat(title) {
        const id = Date.now();
        await fetch('/api/conversations/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title })
        });
        return id;
    },

    // Supprimer l'historique local et serveur
    async deleteChat(id) {
        await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
        this.clearLocalHistory();
    },
    clearLocalHistory() {
        localStorage.removeItem('legalis_chat_history');
        window.location.reload();
    }
};
