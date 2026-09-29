import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

const whatsappUrl = `https://wa.me/5547997924851?text=${encodeURIComponent(
  'Olá! Encontrei a JP Engine pelo site e gostaria de conversar sobre um projeto.'
)}`;

export const GeminiAIAssistant: React.FC = () => (
  <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:right-8">
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a JP Engine pelo WhatsApp"
      title="Chamar no WhatsApp"
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black md:h-14 md:w-14"
    >
      <WhatsAppIcon className="h-9 w-9 transition-transform group-hover:scale-105" />
    </a>
  </div>
);
