import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import LEGALIS_2026_CORE from './docs/LEGALIS_2026_CORE.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const PORT = 1193;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));
// Initialiser la session dans soup.md
app.post('/api/conversations/create', (req, res) => {
    const { id, title } = req.body;
    const timestamp = new Date().toISOString();
    const entry = `\n\n# NOUVELLE SESSION [ID:${id}] - ${title} (${timestamp})\n==================================================\n`;
    
    fs.appendFile(path.join(__dirname, 'data/soup.md'), entry, (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Route pour renommer (Simulée pour l'instant)
app.put('/api/conversations/rename', (req, res) => {
    res.json({ success: true });
});

// Route pour supprimer (Simulée)
app.delete('/api/conversations/:id', (req, res) => {
    res.json({ success: true });
});
// Endpoint d'Inférence @gemLegalHash
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await getLegalisInference(prompt);
        res.json({ success: true, answer: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
app.post('/api/sync-soup', (req, res) => {
    const { message, role, agent } = req.body;
    const timestamp = new Date().toISOString();
    const entry = `\n[${timestamp}] [AGENT:${agent}] [${role.toUpperCase()}]: ${message}\n---`;

    fs.appendFile(path.join(__dirname, 'data/soup.md'), entry, (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});
async function getLegalisInference(userPrompt) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Tu es @gemLegalHash, l'ADN du projet LÉGALIS-FR 2026. 
                Savoir : ${JSON.stringify(LEGALIS_2026_CORE)}
                Missions : Justifier la réforme Art. 222-37, expliquer EuropaFi et calculer les revenus via fiscal_engine.`
            },
            { role: "user", content: userPrompt }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        max_tokens: 1024
    });
    return chatCompletion.choices[0].message.content;
}

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║ LÉGALIS-FR 2026 : KERNEL ACTIF                   ║
║ Port : ${PORT} (Seuil de pauvreté)                  ║
║ Modèle : Llama-3.1-8b-Instant via Groq LPU       ║
╚══════════════════════════════════════════════════╝`);
});