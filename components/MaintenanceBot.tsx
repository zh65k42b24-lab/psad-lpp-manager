'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  X,
  Send,
  MessageCircle,
  AlertCircle,
  Wrench,
  Phone,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionButtons?: { label: string; action: string }[];
}

interface MaintenanceBotProps {
  productCategory?: string;
  onClose: () => void;
}

const MAINTENANCE_RESPONSES: Record<string, string> = {
  DEFAULT: `Bienvenue au support MAD (Maintenance & Dépannage) PSAD.

Je peux vous aider sur :
• 🛏️ Lits médicalisés (moteur, électrique, réglages)
• 🏋️ Lève-personnes (hydraulique, sécurité)
• 🛏️ Matelas anti-escarres (gonflage, fuites)
• 🪑 Fauteuils releveurs (motorisation, télécommande)
• 🔧 Problèmes électriques ou mécaniques
• 📋 Signalement matériovigilance

Que puis-je faire pour vous ?`,

  LIT_PROBLEME: `**Diagnostic Lit Médicalisé**

Avant intervention, vérifiez :
1. ✓ Le lit est-il branché ? (vérifier prise + disjoncteur)
2. ✓ La télécommande a-t-elle des piles ? (remplacer les LR6)
3. ✓ Testez les positions (Fowler, Trendelenburg)
4. ✓ Vérifiez les bruits anormaux

**Si le problème persiste :**
→ Un technicien agréé interviendra sous 48h
→ Coût : couvert selon contrat maintenance
→ Déplacement : gratuit dans zone desserte`,

  LEVE_SECURITE: `**Lève-Personne : Checklist Sécurité**

⚠️ ARRÊTEZ l'utilisation immédiatement si :
• Le sling (harnais) est endommagé ou déchiré
• La charge affiche anormalement sur l'écran
• Bruits anormaux ou mouvements saccadés
• Fuite hydraulique visible

**Procédure d'urgence :**
1. Baissez doucement le patient (bouton BAISSE)
2. Appelez le 0XXX-XXX-XXX (Support 24/7)
3. Conservez le produit jusqu'à inspection

**Maintenance requise :** Vérification mensuelle obligatoire`,

  MATELAS_FUITE: `**Matelas Anti-Escarres : Fuite d'Air**

Symptômes :
• Matelas qui se dégonfle progressivement
• Cellules molles au toucher
• Patient enfonce anormalement

**Diagnostic rapide :**
1. Vérifiez le branchement électrique
2. Écoutez les sons (sifflement = fuite)
3. Vaporisez eau savonneuse pour localiser trou

**Solutions :**
• Petit trou (< 1mm) → Patch fourni en kit
• Gros dégât → Remplacement du matelas
• Électronique défaillante → Intervention technicien

**⚠️ Ne pas utiliser sans gonflage adéquat (risque escarres)**`,

  FAUTEUIL_MOTEUR: `**Fauteuil Releveur : Problème Moteur**

Types de pannes :
• 🔴 Moteur ne répond pas du tout
• 🟡 Mouvement lent ou saccadé  
• 🟡 Bruit fort ou grincement
• 🔴 Électronique affiche "E01" ou "E02"

**Avant appel :**
1. Débranchez 30 secondes puis rebranchez
2. Vérifiez câbles d'alimentation intacts
3. Testez depuis prise murale (pas rallonge)

**Intervention :**
• Remplacement complet du moteur si défaillance
• Durée : 1-2h avec technicien
• Pièces de remplacement : garantie 2 ans`,

  MATÉRIOVIGILANCE: `**Signalement Matériovigilance**

Vous avez observé :
• Dysfonctionnement du produit
• Risque de blessure
• Produit non conforme à la description

**Procédure déclaration :**
1. Notez date, heure et description précise
2. Photos du défaut si possible
3. Modèle et numéro de série
4. Envoyez à : vigilance@psad-france.fr

**Délai :** Déclaration < 30 jours obligatoire
**Confidentialité :** Données protégées (RGPD)`,
};

export function MaintenanceBot({ productCategory, onClose }: MaintenanceBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Message de bienvenue initial
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: MAINTENANCE_RESPONSES.DEFAULT,
        timestamp: new Date(),
        actionButtons: [
          { label: '🛏️ Problème lit', action: 'lit_probleme' },
          { label: '🏋️ Lève-personne', action: 'leve_securite' },
          { label: '🛏️ Fuite matelas', action: 'matelas_fuite' },
          { label: '🪑 Moteur fauteuil', action: 'fauteuil_moteur' },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleActionButtonClick = (action: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: action,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    processMessage(action);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    processMessage(input);
    setInput('');
  };

  const processMessage = (userInput: string) => {
    setIsLoading(true);

    setTimeout(() => {
      let responseKey = 'DEFAULT';

      if (
        userInput.toLowerCase().includes('lit') ||
        userInput === 'lit_probleme'
      ) {
        responseKey = 'LIT_PROBLEME';
      } else if (
        userInput.toLowerCase().includes('lève') ||
        userInput.toLowerCase().includes('leve') ||
        userInput === 'leve_securite'
      ) {
        responseKey = 'LEVE_SECURITE';
      } else if (
        userInput.toLowerCase().includes('matelas') ||
        userInput.toLowerCase().includes('fuite') ||
        userInput === 'matelas_fuite'
      ) {
        responseKey = 'MATELAS_FUITE';
      } else if (
        userInput.toLowerCase().includes('fauteuil') ||
        userInput.toLowerCase().includes('moteur') ||
        userInput === 'fauteuil_moteur'
      ) {
        responseKey = 'FAUTEUIL_MOTEUR';
      } else if (
        userInput.toLowerCase().includes('matériovigilance') ||
        userInput.toLowerCase().includes('vigilance') ||
        userInput === 'matériovigilance'
      ) {
        responseKey = 'MATÉRIOVIGILANCE';
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: MAINTENANCE_RESPONSES[responseKey],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-md h-[80vh] sm:h-auto sm:max-h-[700px] rounded-lg sm:rounded-lg flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">🤖 Assistant MAD</h3>
              <p className="text-sm text-white/80">Support Maintenance 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-psad-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
                <p
                  className={`text-xs mt-1.5 ${
                    msg.role === 'user'
                      ? 'text-white/70'
                      : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {/* Action Buttons */}
                {msg.actionButtons && (
                  <div className="mt-3 space-y-2">
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionButtonClick(btn.action)}
                        className="w-full text-left text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded transition-colors"
                      >
                        {btn.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 rounded-lg rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4 bg-white rounded-b-lg flex gap-2"
        >
          <input
            type="text"
            placeholder="Décrivez votre problème..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon-sm"
            variant="psad"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Emergency Contact */}
        <div className="p-3 bg-red-50 border-t border-red-200 text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            Urgence ? Appelez{' '}
            <a href="tel:0XXX000000" className="font-bold hover:underline">
              0XXX-000-000
            </a>
          </span>
        </div>
      </Card>
    </div>
  );
}
