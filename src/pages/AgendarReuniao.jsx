import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { GlobalStyles, LogoVA, Header, Footer, ContactModal } from '../Shared';
import { useSiteLayout } from '../useSiteLayout';
import { CALENDLY_URL } from '../data';

export default function AgendarReuniao() {
  const { isScrolled, mobileMenuOpen, setMobileMenuOpen, isContactModalOpen, setIsContactModalOpen, openContactModal } = useSiteLayout();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <Header
        openContactModal={openContactModal}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isScrolled={isScrolled}
      />

      <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-up">
            <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-semibold mb-10 transition-colors">
              <ArrowLeft size={16} /> Voltar ao Início
            </Link>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              Agende uma <span className="text-blue-500 text-glow-blue">Chamada Gratuita</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
              Vamos falar sobre o seu negócio e o que um website à medida pode fazer por si. Uma conversa real sobre os seus objetivos.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Chamada de 30 Minutos</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Vamos abordar os seus objetivos, a sua marca e que tipo de website vai funcionar melhor para o seu negócio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">O Que Esperar</h3>
                  <ul className="text-gray-400 text-sm font-light leading-relaxed space-y-1 list-disc list-inside">
                    <li>Revisão da sua visão e ideias</li>
                    <li>Conselhos honestos sobre o que o seu site precisa</li>
                    <li>Informação sobre prazos, preços e processo</li>
                    <li>Sem qualquer compromisso</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Prefere Saltar a Chamada?</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Sem problema.{' '}
                    <button onClick={openContactModal} className="text-blue-500 hover:text-blue-400 underline font-semibold">
                      Preencha o formulário rápido
                    </button>{' '}
                    e entraremos em contacto diretamente.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-gray-300 text-sm italic font-light leading-relaxed">
                "Eu trato da tecnologia, tu geres o teu negócio. Agenda uma chamada e vamos descobrir exatamente o que o teu site precisa para começar a trazer mais clientes."
              </p>
              <div className="flex items-center gap-3">
                <LogoVA className="w-10 h-10 text-blue-500" />
                <div>
                  <p className="text-white font-bold text-sm">Valentim Lopes</p>
                  <p className="text-gray-500 text-xs">Co-Fundador, V/A Digital</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden min-h-[700px] animate-fade-up animate-delay-1">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
