import { ArrowRight, Quote } from 'lucide-react';
import { GlobalStyles, LogoVA, Header, Footer, ContactModal } from '../Shared';
import { useSiteLayout } from '../useSiteLayout';
import { TEAM } from '../data';

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
            <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">A Equipa</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              Os Nossos <span className="text-blue-500 text-glow-blue">Testemunhos</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Conheça as pessoas por trás da agência e a visão que move cada projeto.
            </p>
          </div>

          <div className="space-y-12 mb-20">
            {TEAM.map((person, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-up">
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-60 rounded-full z-0 transform scale-90"></div>
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-3xl relative z-10 border border-white/10 shadow-2xl"
                  />
                </div>
                <div className="w-full text-left bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-xl">
                  <div className="mb-6 border-b border-white/10 pb-6">
                    <h3 className="text-2xl font-display font-bold text-white mb-1">{person.name}</h3>
                    <p className="text-blue-500 font-semibold tracking-wide uppercase text-xs">{person.role}</p>
                  </div>
                  <div className="space-y-4">
                    <Quote size={30} className="text-blue-500/20 float-left mr-3 -mt-2" />
                    {person.bio.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
