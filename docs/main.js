/**
 * PROJECT : LÉGALIS-FR 2026
 * MODULE  : main.js
 * ROLE    : Contrôleur d'interface et moteur d'inférence (Frontend)
 */

import LEGALIS_2026_CORE from './LEGALIS_2026_CORE.js';
import { LegalisChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
    const legalBot = new LegalisChatbot();
    initNavigation();
    initSimulateur();
    updateCountdown();
});

/**
 * 1. GESTION DE LA NAVIGATION (SPA)
 */
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    links.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');

            // Mise à jour de l'état actif des liens
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Affichage de la section cible
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) sec.classList.add('active');
            });
        });
    });
}

/**
 * 2. SIMULATEUR FISCAL (MOTEUR KERNEL)
 */
function initSimulateur() {
    const slider = document.getElementById('volume-slider');
    const pibRes = document.getElementById('pib-res');
    const healthRes = document.getElementById('health-res');

    if (slider) {
        slider.addEventListener('input', (e) => {
            const volumeMilliards = parseFloat(e.target.value) * 1000000000;
            const impact = LEGALIS_2026_CORE.fiscal_engine.calculateTaxRevenue(volumeMilliards);

            // Mise à jour dynamique de l'UI
            pibRes.innerText = `+${(e.target.value * 0.12).toFixed(2)}%`;
            healthRes.innerText = `${(impact.repartition.sante_prevention / 1000000).toFixed(0)} M€`;
        });
    }
}

/**
 * 3. INTERFACE CHAT (@gemLegalHash via GROQ/Express)
 */
function initChat() {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');

    const sendMessage = async () => {
        const text = userInput.value.trim();
        if (!text) return;

        // Affichage message utilisateur
        appendMessage('user', text);
        userInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text })
            });
            const data = await response.json();
            
            if (data.success) {
                appendMessage('bot', data.answer);
            } else {
                appendMessage('bot', "Erreur système : Impossible de joindre l'instance @gemLegalHash.");
            }
        } catch (err) {
            appendMessage('bot', "Le serveur local (Port 1193) semble hors-ligne.");
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

function appendMessage(role, text) {
    const chatOutput = document.getElementById('chat-output');
    const msg = document.createElement('p');
    msg.className = role === 'bot' ? 'bot-msg' : 'user-msg';
    msg.innerHTML = `<strong>${role.toUpperCase()} :</strong> ${text}`;
    chatOutput.appendChild(msg);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

/**
 * 4. COMPTE À REBOURS (LOGIQUE TEMPORELLE)
 */
function updateCountdown() {
    const targetDate = new Date('March 31, 2026 00:00:00').getTime();
    const countdownEl = document.getElementById('countdown');

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (distance < 0) {
            clearInterval(timer);
            countdownEl.innerText = "EXPÉRIMENTATION TERMINÉE - DÉCISION REQUISE";
        } else {
            countdownEl.innerText = `${days}j ${hours}h AVANT FIN MORATOIRE ANSM`;
        }
    }, 1000);
}