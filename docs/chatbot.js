import { DataManager } from './DataManager.js';

export class LegalisChatbot {
    constructor() {
        this.isOpen = false;
        this.currentAgent = "juriste";
        this.history = JSON.parse(localStorage.getItem('legalis_chat_history')) || [];
        this.render();
        this.initEventListeners();
    }

    render() {
        if (document.getElementById('chatbot-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'chatbot-modal';
        modal.innerHTML = `
            <div class="chatbot-container">
                <aside class="chat-sidebar">
                    <button id="new-chat" class="btn-sidebar-main">+ Nouvelle Session</button>
                    <div class="sidebar-section">
                        <h3>HISTORIQUE</h3>
                        <ul id="chat-history-list">${this.renderHistory()}</ul>
                    </div>
                    <div class="sidebar-section">
                        <h3>AGENTS SPÉCIALISÉS</h3>
                        <ul id="agent-selector">
                            <li data-agent="juriste" class="active">⚖️ Juriste Expert</li>
                            <li data-agent="economiste">📈 Économiste EuropaFi</li>
                            <li data-agent="sante">🏥 Expert Santé/RDR</li>
                        </ul>
                    </div>
                </aside>
                <div class="chat-main">
                    <header class="chat-header">
                        <div class="agent-info">
                            <span class="status-dot"></span>
                            <span id="active-agent-label">Agent Juridique</span>
                        </div>
                        <button id="close-chat" class="close-btn">×</button>
                    </header>
                    <div id="chat-messages" class="chat-display">
                        <div class="msg-bot">Bonjour. Je suis l'intelligence dédiée au projet i-5049. Comment puis-je vous éclairer sur la réforme ?</div>
                    </div>
                    <div class="chat-footer">
                        <input type="text" id="chat-input" placeholder="Posez votre question...">
                        <button id="chat-send">ENVOYER</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }

    initEventListeners() {
        document.getElementById('trigger-chat').addEventListener('click', () => this.toggleModal());
        document.getElementById('close-chat').addEventListener('click', () => this.toggleModal());
        document.getElementById('chat-send').addEventListener('click', () => this.handleSend());
        document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleSend(); });

        // Dans initEventListeners()
// Dans initEventListeners() de chatbot.js

// Action : Nouvelle Session (Correction de la fermeture)
document.getElementById('new-chat').addEventListener('click', async () => {
    const title = prompt("Titre de la consultation :", "Session " + new Date().toLocaleTimeString());
    if (title) {
        const id = await DataManager.createChat(title);
        // On vide l'affichage sans recharger la page
        document.getElementById('chat-messages').innerHTML = `
            <div class="msg-system">Nouvelle session initialisée [ID:${id}]</div>
            <div class="msg-bot">Bonjour. Je suis à votre écoute pour cette nouvelle consultation.</div>
        `;
        // Mise à jour de l'historique visuel
        this.saveToHistory(title);
    }
});

        // Action : Clic sur l'historique pour recharger
        document.getElementById('chat-history-list').addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const sessionTitle = e.target.innerText;
                this.appendSystemMessage(`Reprise de la session : ${sessionTitle}`);
                // Ici, on pourrait ajouter un fetch pour récupérer les anciens messages
            }
        });
        document.querySelectorAll('#agent-selector li').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('#agent-selector li').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentAgent = e.currentTarget.dataset.agent;
                document.getElementById('active-agent-label').innerText = e.currentTarget.innerText;
            });
        });
    }
// AJOUT DE LA MÉTHODE MANQUANTE
    appendSystemMessage(text) {
        const display = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'msg-system'; // Style défini dans chatbot.css
        div.innerText = text;
        display.appendChild(div);
        display.scrollTop = display.scrollHeight;
    }
    toggleModal() {
        const modal = document.getElementById('chatbot-modal');
        this.isOpen = !this.isOpen;
        modal.style.display = this.isOpen ? 'block' : 'none';
    }

    async handleSend() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        this.appendMessage('user', text);
        DataManager.syncToSoup('user', text, this.currentAgent);
        input.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text, agent: this.currentAgent })
            });
            const data = await response.json();
            this.appendMessage('bot', data.answer);
            DataManager.syncToSoup('bot', data.answer, this.currentAgent);
            this.saveToHistory(text);
        } catch (err) {
            this.appendMessage('bot', "Erreur de liaison Kernel.");
        }
    }

    appendMessage(role, text) {
        const display = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = role === 'user' ? 'msg-user' : 'msg-bot';
        div.innerText = text;
        display.appendChild(div);
        display.scrollTop = display.scrollHeight;
    }

    renderHistory() {
        return this.history.map(item => `<li>${item.substring(0, 20)}...</li>`).join('') || "<li>Aucune session</li>";
    }

    saveToHistory(text) {
        this.history.unshift(text);
        if (this.history.length > 5) this.history.pop();
        localStorage.setItem('legalis_chat_history', JSON.stringify(this.history));
        document.getElementById('chat-history-list').innerHTML = this.renderHistory();
    }
}