'use client';

import React, { useState } from 'react';
import { MaintenanceBot } from './MaintenanceBot';
import { MessageCircle } from 'lucide-react';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">🤖 Assistance MAD</span>
        </button>
      )}
      {isOpen && <MaintenanceBot onClose={() => setIsOpen(false)} />}
    </>
  );
}
