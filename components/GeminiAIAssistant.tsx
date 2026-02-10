
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { GoogleGenAI, Chat } from '@google/genai';

export const GeminiAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Bem-vindo à JP Engine.\n\nComo podemos elevar a experiência digital da sua marca hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatInstance = useMemo(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é o concierge de luxo da JP Engine.
        
        REGRAS DE FORMATAÇÃO E ESTILO (ESTRITAS):
        - NUNCA use markdown (asteriscos ** para negrito, _ para itálico ou # para títulos).
        - Use texto em formato padrão (evite CAIXA ALTA excessiva).
        - Use parágrafos curtos e bem espaçados para facilitar a leitura.
        - Use bullet points elegantes (•) para listar diferenciais ou etapas.
        - Não mencione links, números de telefone ou @ de redes sociais como texto puro; foque em descrever a ação de clicar nos botões de contato que o sistema disponibilizará automaticamente abaixo da sua mensagem.
        - Seu tom é industrial, sofisticado, técnico e extremamente profissional.
        
        CONTEÚDO ESTRUTURADO:
        1. Saudação cordial e de elite.
        2. Explicação técnica concisa sobre nossa abordagem em engenharia e design de alta performance.
        3. Convite estratégico para uma consultoria.

        DADOS DA MARCA:
        - Fundador: João Pedro (JP), Engenheiro de Software pela UTFPR.
        - Especialidades: Interfaces de Luxo, Performance Crítica, Arquiteturas Escaláveis.
        
        Termine sempre incentivando o uso dos botões de WhatsApp ou Instagram para agendamento.`,
      }
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await chatInstance.sendMessage({ message: userMsg });
      let botText = result.text || 'O sistema reportou uma latência incomum. Poderia reenviar sua solicitação?';
      
      // Limpeza robusta de markdown caso o modelo ignore as instruções
      botText = botText
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/###/g, '')
        .replace(/##/g, '')
        .replace(/#/g, '')
        .replace(/__/g, '')
        .replace(/_/g, '');
      
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Assistant Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'STATUS: INTERRUPÇÃO TÉCNICA.\n\nPara garantir a continuidade do atendimento, recomendamos estabelecer conexão direta via nossos canais estratégicos.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-110 transition-all active:scale-95 group relative"
        >
          <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 group-hover:opacity-40"></div>
          <MessageSquare className="w-7 h-7 relative z-10" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[460px] h-[680px] bg-[#080809] border border-white/10 rounded-[36px] flex flex-col shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
          {/* Header */}
          <div className="p-7 border-b border-white/5 flex items-center justify-between bg-white/[0.01] backdrop-blur-3xl shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-white font-black text-sm tracking-tight uppercase">JP Concierge</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Engine v4.6 active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/5 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-7 space-y-8 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.02),transparent)]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[92%] p-6 rounded-[32px] text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-white text-black font-bold rounded-tr-none' 
                  : 'bg-[#121214] border border-white/[0.08] text-slate-200 rounded-tl-none whitespace-pre-wrap'
                }`}>
                   {m.text}
                   
                   {m.role === 'bot' && (
                     m.text.toLowerCase().includes('whatsapp') || 
                     m.text.toLowerCase().includes('instagram') || 
                     m.text.toLowerCase().includes('agendamento') ||
                     m.text.toLowerCase().includes('consultoria') ||
                     m.text.toLowerCase().includes('contato')
                   ) && (
                     <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                        <a 
                          href="https://wa.me/5535998842525" 
                          target="_blank" 
                          className="flex items-center justify-between bg-[#1d1d1f] hover:bg-[#25D366]/10 border border-white/5 hover:border-[#25D366]/30 p-4 rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center text-white">
                              <MessageCircle size={18} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-[#25D366] transition-colors">WhatsApp Estratégico</span>
                          </div>
                          <ExternalLink size={14} className="opacity-20 group-hover:opacity-100" />
                        </a>
                        
                        <a 
                          href="https://instagram.com/jp_engine" 
                          target="_blank" 
                          className="flex items-center justify-between bg-[#1d1d1f] hover:bg-pink-500/10 border border-white/5 hover:border-pink-500/30 p-4 rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                              <Instagram size={18} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-pink-400 transition-colors">Instagram Engine</span>
                          </div>
                          <ExternalLink size={14} className="opacity-20 group-hover:opacity-100" />
                        </a>
                     </div>
                   )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#121214] border border-white/[0.08] p-6 rounded-[32px] rounded-tl-none flex items-center gap-3">
                  <Loader2 size={16} className="text-white animate-spin" />
                  <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Processando...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-7 bg-black/40 border-t border-white/5 shrink-0">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus-within:border-white/30 transition-all shadow-inner">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Solicitar diagnóstico..."
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-700 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-xl disabled:opacity-5 hover:scale-105 transition-all active:scale-95 shadow-xl"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-[1px] w-4 bg-slate-800"></div>
              <p className="text-[8px] text-slate-700 uppercase font-black tracking-[0.5em]">
                JP ENGINE CORE AI
              </p>
              <div className="h-[1px] w-4 bg-slate-800"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
