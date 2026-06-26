import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Search, Rocket, CheckCircle,
  Phone, Eye, Star, Calendar, ChevronLeft, ChevronRight, Quote
} from 'lucide-react';
import { GlobalStyles, LogoVA, Header, Footer, ContactModal } from '../Shared';
import { useSiteLayout } from '../useSiteLayout';
import { SERVICES, PORTFOLIO, PROCESS, TEAM } from '../data';

export default function Home() {
  const layout = useSiteLayout();
  const { isScrolled, mobileMenuOpen, setMobileMenuOpen, isContactModalOpen, setIsContactModalOpen, openContactModal } = layout;
  const [activeTeamSlide, setActiveTeamSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, [activeTeamSlide]);

  const nextSlide = () => setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));
  const prevSlide = () => setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));

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

      {/* ── HERO SECTION ── */}
      <section id="home" className="pt-48 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden relative min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full animate-fade-up relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium mb-10">
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/google.png" alt="Selo" className="w-full h-full object-contain" />
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="#facc15" className="text-yellow-400" />)}
            </div>
            <span className="hidden sm:inline">De confiança para múltiplas empresas em todo o país</span>
            <span className="sm:hidden">Múltiplas empresas confiam</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 text-white leading-[1.15] text-center">
            O Seu Website de Sonho.<br/>
            Live em <span className="text-blue-500 text-glow-blue">10</span> Dias ou Menos.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light text-center">
            Websites profissionais, personalizados e codificados para atrair visitantes e transformá-los em clientes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-20 w-full">
            <button onClick={openContactModal} className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2 hover:scale-105">
              Começar Agora <ArrowRight size={18} />
            </button>
            <Link to="/agendar" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-[15px] hover:bg-white/5 transition-all flex items-center gap-2">
              <Calendar size={18} /> Agendar Reunião
            </Link>
            <a href="#portfolio" className="px-8 py-4 bg-white text-black rounded-full font-bold text-[15px] hover:bg-gray-200 transition-all">
              Ver Portefólio
            </a>
          </div>

          <div className="flex flex-col items-center w-full max-w-2xl animate-fade-up animate-delay-2">
            <div className="border-l-2 border-blue-500 pl-6 md:pl-8 text-left w-full mb-10">
              <p className="text-gray-400 italic text-lg md:text-xl font-light leading-relaxed">
                "Nós tratamos da tecnologia, tu geres o teu negócio. Vamos construir algo de que te orgulhes e que possas mostrar sem dores de cabeça."
              </p>
            </div>
            <LogoVA className="w-16 h-16 text-white mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://instagram.com/teu-link" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#111] border border-white/10 text-white font-medium text-sm flex items-center gap-2 hover:bg-[#1a1a1a] transition-all hover:border-blue-500">
                <img src="/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                Segue-nos no Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTEFÓLIO ── */}
      <section id="portfolio" className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4">
              O Nosso <span className="text-blue-500 text-glow-blue">Portefólio</span>
            </h2>
            <p className="text-gray-400 text-lg font-light">
              Cada site é codificado à medida, otimizado para mobile e desenhado para crescer com a marca.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {PORTFOLIO.map((work) => (
              <div key={work.id} className="premium-hover bg-[#111] rounded-2xl border border-white/5 overflow-hidden flex flex-col group">
                <div className="relative h-48 overflow-hidden bg-[#222]">
                  <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-1">{work.category}</p>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{work.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light flex-1 mb-6">{work.desc}</p>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-blue-500 hover:border-blue-500 transition-all duration-300"
                  >
                    <Eye size={15} /> Ver Site
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center animate-fade-up">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-10 py-4 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Ver Portefólio Completo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="services" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-6">
              Tudo o que <span className="text-blue-500 text-glow-blue">Precisa</span>, Tudo num <span className="text-blue-500 text-glow-blue">Único Lugar</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Do design ao lançamento e suporte contínuo, tratamos de todos os aspetos digitais da sua marca para que se possa focar a 100% em gerir o seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, i) => (
              <div key={i} className="premium-hover bg-[#111] p-8 rounded-2xl border border-white/5 group flex items-start gap-6 relative overflow-hidden">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <srv.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">{srv.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Serviços */}
          <div className="text-center flex flex-col items-center mt-16 animate-fade-up">
            <LogoVA className="w-16 h-16 text-white mb-6 transition-transform hover:scale-110 duration-500" />
            <button onClick={openContactModal} className="inline-flex items-center gap-2 px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105">
              Começar o meu Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PORQUE PRECISAS DE UM WEBSITE ── */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-6">
              Porque Todos os Negócios <span className="text-blue-500 text-glow-blue">Precisam</span> de um Website
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Não se trata apenas de ter um site. Trata-se de se destacar, atrair mais clientes e construir algo intemporal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Search, title: "Visibilidade no Google", desc: "Apareça quando alguém pesquisa pelos seus serviços na sua área. Mais olhos no seu site significa mais clientes a descobrir, ligar e escolher-lhe a si em vez de concorrentes que não aparecem online." },
              { icon: Zap, title: "Mais Clientes", desc: "Novos clientes encontram-no e contactam-no através do seu próprio site, 24/7. O seu website trabalha sem parar para atrair leads, responder a perguntas e converter visitantes em clientes pagantes, mesmo enquanto dorme." },
              { icon: Star, title: "Primeira Impressão Profissional", desc: "As pessoas julgam o seu negócio em segundos. Um website personalizado garante que aparenta ser profissional, credível e estabelecido. A primeira impressão define se alguém pega no telefone ou passa à frente." },
              { icon: Phone, title: "Contacto e Pedidos Fáceis", desc: "Sem mensagens perdidas em DMs ou textos. Os clientes contactam-no diretamente pelo site com formulários, sistemas de marcação ou chamadas diretas. Cada pedido é captado, organizado e pronto para fechar." },
              { icon: Rocket, title: "Eleve a Sua Marca", desc: "O seu próprio domínio, o seu próprio look, o seu próprio espaço não partilhado com concorrentes. Construa capital de marca real que aumenta o valor do negócio e faz com que se destaque num mercado saturado." },
              { icon: CheckCircle, title: "Investimento Real", desc: "Todos os custos do website alojamento e manutenção incluídos são 100% dedutíveis como despesa de negócio. O seu site paga-se a si próprio ao gerar nova receita e ao reduzir a sua carga fiscal." },
            ].map((item, i) => (
              <div key={i} className="premium-hover bg-[#111] p-6 rounded-2xl border border-white/5 group flex items-start gap-4 relative overflow-hidden">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center flex flex-col items-center animate-fade-up">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 text-glow-blue mb-6">
              Pronto para ter uma presença online que realmente funciona?
            </h3>
            <LogoVA className="w-16 h-16 text-white mb-6 transition-transform hover:scale-110 duration-500" />
            <button onClick={openContactModal} className="inline-flex items-center gap-2 px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105">
              Começar o meu Website <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── COMO TRABALHAMOS ── */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center animate-fade-up">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">O Nosso Processo</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-20 text-white leading-tight">
            Do conceito ao lançamento <br/><span className="text-gray-400 font-medium">sem dores de cabeça.</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-10 right-10 h-[1px] bg-white/10 z-0" />
            {PROCESS.map((proc, i) => (
              <div key={i} className="relative z-10 text-center flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-xl font-bold text-white mb-8 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors duration-500 shadow-xl">
                  {proc.step}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{proc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A EQUIPA / TESTEMUNHOS ── */}
      <section id="team" className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16 animate-fade-up">
            <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">A Equipa</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              A Mente Por Trás <br/>
              <span className="text-gray-400 font-medium">da Máquina.</span>
            </h2>
          </div>

          <div className="relative w-full mb-8">
            <div className="absolute top-[112px] md:top-[128px] left-0 md:-left-6 right-0 md:-right-6 flex justify-between px-2 md:px-0 z-30 pointer-events-none transform -translate-y-1/2">
              <button onClick={prevSlide} className="pointer-events-auto w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-white bg-[#0a0a0a]/80 hover:bg-blue-500 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] hover:scale-110">
                <ChevronLeft size={26} />
              </button>
              <button onClick={nextSlide} className="pointer-events-auto w-14 h-14 rounded-full border-2 border-blue-500 flex items-center justify-center text-white bg-[#0a0a0a]/80 hover:bg-blue-500 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] hover:scale-110">
                <ChevronRight size={26} />
              </button>
            </div>

            <div className="grid">
              {TEAM.map((person, idx) => (
                <div
                  key={idx}
                  className={`col-start-1 row-start-1 flex flex-col items-center transition-all duration-1000 ease-in-out ${
                    activeTeamSlide === idx ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="relative w-56 h-56 md:w-64 md:h-64 mb-8 flex-shrink-0">
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

            <div className="flex justify-center gap-3 mt-6 relative z-20">
              {TEAM.map((_, idx) => (
                <button key={idx} onClick={() => setActiveTeamSlide(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTeamSlide === idx ? 'bg-blue-500 w-8' : 'bg-white/20 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl mb-12 animate-fade-up">
            <div className="border-l-4 border-blue-500 p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-4">A Nossa Filosofia</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light italic">
                "Somos uma agência focada em criar websites à medida, aliando as últimas tendências de design ao que realmente gera resultados e atrai clientes. Mas não ficamos pelo código: acompanhamos o crescimento do seu negócio através da gestão e produção de conteúdos para redes sociais, rebranding e ilustração caso necessário. Do desenvolvimento técnico à estratégia criativa, estamos sempre disponíveis para elevar a sua presença digital através de sistemas que funcionam."
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-12 animate-fade-up">
            <Link
              to="/testemunhos"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border border-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Ver Todos os Testemunhos <ArrowRight size={18} />
            </Link>
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
