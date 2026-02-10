import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const GeminiAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Olá. Sou o concierge da JP Engine. Como podemos elevar a experiência digital da sua marca hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Corrected initialization to use process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Você é o concierge da JP Engine, um estúdio de design e engenharia criativa de alta performance liderado pelo João Pedro (JP).
          
          DADOS DO JP:
          - Formação: Bacharel em Ciência da Computação pela UTFPR.
          - Experiência: 8+ anos no mercado global.
          - Especialidade: UI/UX Premium, Sistemas Customizados e Performance.
          
          CONTATOS REAIS (Sempre ofereça se o usuário quiser falar com o JP):
          - WhatsApp: 35 99884-2525
          - Instagram: @jp_engine (https://www.instagram.com/jp_engine)
          - LinkedIn: https://www.linkedin.com/in/joao-pedro-9a1328247/
          
          DIRETRIZES:
          - Sua linguagem é sofisticada, técnica porém acessível.
          - Destaque que a formação na UTFPR garante que o design não é apenas bonito, mas tecnicamente impecável.
          - Se alguém quiser contratar, incentive a chamar no WhatsApp ou seguir no Instagram para ver os bastidores.`,
        }
      });

      // Use the .text property directly from the response
      const botText = response.text || 'Desculpe, tive um pequeno lapso. Poderia repetir?';
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Estou com dificuldades de conexão, mas você pode falar diretamente com o JP no WhatsApp: 35 99884-2525' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[550px] bg-[#0d0d0d] border border-white/10 rounded-[32px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Concierge JP</h4>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300'}`}>
                   {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-[20px] flex gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5">
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-5 py-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Diga olá..."
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="text-white disabled:opacity-20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};