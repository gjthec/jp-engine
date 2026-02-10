
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Qual o tempo médio de entrega?",
      a: "Projetos institucionais costumam levar de 3 a 4 semanas. Sistemas complexos (SaaS/WMS) são divididos em fases, com o MVP pronto para uso em média entre 8 a 12 semanas."
    },
    {
      q: "Vocês dão suporte após o lançamento?",
      a: "Sim, todos os projetos incluem 3 meses de suporte técnico gratuito. Após esse período, oferecemos planos de manutenção preventiva e evolução contínua."
    },
    {
      q: "O código será meu?",
      a: "Com certeza. Após a conclusão do pagamento, o código fonte, documentação e infraestrutura são transferidos integralmente para a sua propriedade."
    }
  ];

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.q}</span>
                {open === idx ? <Minus className="text-blue-500" /> : <Plus className="text-blue-500" />}
              </button>
              {open === idx && (
                <div className="px-6 pb-6 text-slate-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
