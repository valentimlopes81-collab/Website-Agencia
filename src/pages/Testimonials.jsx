import { ArrowRight, Quote, Star } from 'lucide-react';
import { GlobalStyles, LogoVA, Header, Footer, ContactModal } from '../Shared';
import { useSiteLayout } from '../useSiteLayout';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const { isScrolled, mobileMenuOpen, setMobileMenuOpen, isContactModalOpen, setIsContactModalOpen, openContactModal } = useSiteLayout();

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

      <section className="pt-48 pb-24 md:pt-56 md:pb-32 px-6 overflow-hidden relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-up">
            <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">Clientes Satisfeitos</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              Os Nossos <span className="text-blue-500 text-glow-blue">Testemunhos</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              O que dizem as marcas e negócios que já confiaram em nós para construir a sua presença online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-8 flex flex-col relative transition-all duration-300 hover:border-blue-500/30 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} fill="#3b82f6" className="text-blue-500" />
                    ))}
                  </div>
                  <Quote size={24} className="text-blue-500/20 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
                <p className="text-gray-300 text-[15px] leading-relaxed font-light mb-8 flex-1">
                  "{item.text}"
                </p>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-display font-bold text-sm tracking-wide">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-up">
            <Quote size={32} className="text-blue-500/30 mx-auto mb-6" />
            <p className="text-white text-2xl md:text-3xl font-display font-light italic leading-relaxed mb-4">
              "Tudo vale a pena se a alma não é pequena."
            </p>
            <p className="text-blue-500 font-semibold tracking-widest uppercase text-xs">— Fernando Pessoa</p>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl mb-16 animate-fade-up">
            <div className="border-l-4 border-blue-500 p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-4">A Nossa Filosofia</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light italic">
                "Somos uma agência focada em criar websites à medida, aliando as últimas tendências de design ao que realmente gera resultados e atrai clientes. Mas não ficamos pelo código: acompanhamos o crescimento do seu negócio através da gestão e produção de conteúdos para redes sociais, rebranding e ilustração caso necessário. Do desenvolvimento técnico à estratégia criativa, estamos sempre disponíveis para elevar a sua presença digital através de sistemas que funcionam."
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col items-center animate-fade-up">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 text-glow-blue mb-6">
              Vamos construir algo de que se orgulhe e possa mostrar.
            </h3>
            <LogoVA className="w-16 h-16 text-white mb-6 transition-transform hover:scale-110 duration-500" />
            <button onClick={openContactModal} className="inline-flex items-center gap-2 px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105">
              Começar o seu Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
