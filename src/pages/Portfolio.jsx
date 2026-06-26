import { ArrowRight, Eye } from 'lucide-react';
import { GlobalStyles, Header, Footer, ContactModal } from '../Shared';
import { useSiteLayout } from '../useSiteLayout';
import { PORTFOLIO } from '../data';

export default function Portfolio() {
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-up">
            <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">Trabalhos Realizados</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              O Nosso <span className="text-blue-500 text-glow-blue">Portefólio</span> Completo
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Cada site é codificado à medida, otimizado para mobile e desenhado para crescer com a marca. Explore os projetos que já levámos ao mundo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PORTFOLIO.map((work) => (
              <div key={work.id} className="premium-hover bg-[#111] rounded-2xl border border-white/5 overflow-hidden flex flex-col group">
                <div className="relative h-64 md:h-72 overflow-hidden bg-[#222]">
                  <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-2">{work.category}</p>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{work.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light flex-1 mb-8">{work.desc}</p>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-blue-500 hover:border-blue-500 transition-all duration-300"
                  >
                    <Eye size={16} /> Ver Site
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col items-center mt-24 animate-fade-up">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 text-glow-blue mb-6">
              O seu projeto pode ser o próximo da lista.
            </h3>
            <button onClick={openContactModal} className="inline-flex items-center gap-2 px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105">
              Começar o meu Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
