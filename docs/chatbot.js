/**
 * PROJECT : LÉGALIS-FR 2026
 * MODULE  : chatbot.js
 * ROLE    : Gestionnaire de la Modal Agentique et de l'Inférence
 */

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
        // Suppression si déjà existant
        if (document.getElementById('chatbot-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'chatbot-modal';
        modal.innerHTML = `
            <div class="chatbot-container">
                <aside class="chat-sidebar">
                    <button id="new-chat" class="btn-sidebar-main">+ Nouvelle Session</button>
                    
                    <div class="sidebar-section">
                        <h3>HISTORIQUE</h3>
                        <ul id="chat-history-list">
                            ${this.renderHistory()}
                        </ul>
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
                        <input type="text" id="chat-input" placeholder="Décrivez votre demande ou question juridique...">
                        <button id="chat-send">ENVOYER</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    initEventListeners() {
        const trigger = document.getElementById('trigger-chat');
        const modal = document.getElementById('chatbot-modal');
        const closeBtn = document.getElementById('close-chat');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');
        const agentLinks = document.querySelectorAll('#agent-selector li');
        // Action : Nouvelle Conversation
        document.getElementById('new-chat').addEventListener('click', () => {
            if(confirm("Démarrer une nouvelle session ? L'historique local sera effacé.")) {
                DataManager.clearLocalHistory();
            }
        });
        // Toggle Modal
        trigger.addEventListener('click', () => this.toggleModal());
        closeBtn.addEventListener('click', () => this.toggleModal());

        // Sélection d'Agent
        agentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                agentLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                this.currentAgent = e.target.dataset.agent;
                document.getElementById('active-agent-label').innerText = e.target.innerText;
                this.appendSystemMessage(`Changement d'agent : Vous parlez maintenant à l'${e.target.innerText}.`);
            });
        });

        // Envoi de message
        sendBtn.addEventListener('click', () => this.handleSend());
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleSend(); });
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
    // Synchro Serveur (soup.md)
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
        // Synchro réponse Bot
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

    appendSystemMessage(text) {
        const display = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = 'msg-system';
        div.innerText = text;
        display.appendChild(div);
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