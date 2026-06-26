import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, Zap, Search, Rocket, CheckCircle,
  Phone, Eye, Star, Calendar, Monitor, Camera, Compass,
  MousePointerClick, Palette, Headphones, ChevronLeft, ChevronRight, ChevronDown, Quote
} from 'lucide-react';

/* ── ESTILOS GLOBAIS E ANIMAÇÕES PREMIUM ─────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@200;300;400;500;600;700;800&display=swap');
    
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 120px; 
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #050505;
      color: #f8fafc;
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    .font-display {
      font-family: 'Montserrat', sans-serif;
      letter-spacing: -0.02em;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-delay-1 { animation-delay: 0.15s; }
    .animate-delay-2 { animation-delay: 0.3s; }

    .premium-hover {
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .premium-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
      border-color: rgba(255,255,255,0.1);
      background-color: #161616;
    }

    .project-card:hover .project-overlay { opacity: 1; }
    .project-card:hover img { transform: scale(1.07); }
    
    .text-glow-blue {
      text-shadow: 0 0 25px rgba(59, 130, 246, 0.8);
    }
  `}</style>
);

/* ── COMPONENTE DO LOGO (V + A GEOMÉTRICO) ─────────────── */
const LogoVA = ({ className = "w-14 h-14" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M8 10 L16 30 L24 10 L32 30" />
    <path d="M20 20 L28 20" />
  </svg>
);

/* ── DADOS DA AGÊNCIA ─────────────────────── */
const SERVICES = [
  { icon: Monitor, title: "Websites Customizados", desc: "Criação de raiz, gerência contínua ou renovação total para uma presença online de excelência." },
  { icon: Camera, title: "Conteúdo & Audiovisual", desc: "Produção de foto/vídeo e design para finalizar o seu website e dominar as redes sociais." },
  { icon: Compass, title: "Estratégia & Direção", desc: "Desenhamos a estratégia de crescimento exata e o rumo criativo para destacar a sua marca." },
  { icon: MousePointerClick, title: "Tráfego Pago (Ads)", desc: "Set-ups completos de campanhas de alta conversão no Google e Facebook Ads para atrair clientes." },
  { icon: Palette, title: "Rebranding Premium", desc: "Reestruturação total da sua identidade visual para comunicar luxo e autoridade no mercado." },
  { icon: Headphones, title: "Suporte & Manutenção", desc: "Tratamos das questões técnicas, backups e segurança para que foque apenas no seu negócio." },
];

const PORTFOLIO = [
  { id: 1, title: "Villa Aurora", category: "Alojamento de Luxo & Reservas", desc: "Site de apresentação para um alojamento privado de luxo em Malta, com galeria imersiva, quartos, comodidades, avaliações e sistema de reserva direta.", url: "https://villa-silk.vercel.app/", img: "/villa.webp" },
  { id: 2, title: "Óptica 13", category: "E-commerce & Serviços Óticos", desc: "Website para óptica com agendamento de exames de optometria gratuitos, catálogo de marcas premium e quiz de estilo interativo.", url: "https://optica13.shop/", img: "/optica13.webp" },
  { id: 3, title: "Willchair", category: "Landing Page de Startup", desc: "Página de apresentação de um projeto de empreendedorismo: um kit modular híbrido-elétrico que transforma qualquer cadeira de rodas manual numa elétrica, a uma fração do custo do mercado.", url: "https://willchair.vercel.app/", img: "/willchair.webp" },
  { id: 4, title: "Cenawrld", category: "E-commerce de Moda & Streetwear", desc: "Loja online de streetwear urbano com identidade visual forte, coleções para homem e mulher e checkout otimizado.", url: "https://cenawrld.com/", img: "/cenawrld.webp" },
  { id: 5, title: "Corte & Calma", category: "Marcações Online — Barbearia", desc: "Website para barbearia em Lisboa com sistema de reservas, apresentação de packs, equipa e contacto direto por WhatsApp.", url: "https://corte-e-calma-1.vercel.app/", img: "/corte-e-calma.webp" },
  { id: 6, title: "Lumina", category: "Clínica de Estética & Beleza", desc: "Website para clínica de tratamentos estéticos no Chiado, com marcação de consultas, lista de preços e prova social com centenas de avaliações.", url: "https://lumina-sigma-weld.vercel.app/", img: "/lumina.webp" },
];

const PROCESS = [
  { step: "01", title: "Estratégia", desc: "Alinhamos a visão, estudamos o seu mercado e definimos o caminho para o sucesso." },
  { step: "02", title: "Design", desc: "Criamos protótipos de alta fidelidade focados na experiência e conversão do utilizador." },
  { step: "03", title: "Código", desc: "Transformamos o design em realidade com código robusto, rápido e imaculado." },
  { step: "04", title: "Lançamento", desc: "Testes rigorosos e implementação final. O seu novo site fica online para o mundo." },
];

/* ── EQUIPA ── */
const TEAM = [
  {
    name: "Afonso",
    role: "Co-Fundador, Diretor Criativo & Audiovisual",
    image: "/afonso.webp",
    bio: "Ex-estudante de Arquitetura, sou Designer Gráfico, Web Designer e fundador de uma marca de roupa própria, projeto onde levei a criatividade ao limite ao organizar e produzir um evento para 950 pessoas. Esta experiência no 'terreno' deu-me a visão 360° necessária para entender o que realmente atrai e retém um público.\n\nTrago para a agência o equilíbrio entre a estética rigorosa e a estratégia que atrai clientes. Como fotógrafo e videógrafo freelance, asseguro pessoalmente toda a produção e pós-produção de conteúdos, garantindo que cada projeto tenha um acabamento premium e inovador."
  },
  {
    name: "Valentim",
    role: "Co-Fundador, Estratégia & Lead Developer",
    image: "/valentim.webp",
    bio: "Sou o Valentim, estudante de Economia no ISEG e apaixonado por inovação e tecnologia. Com uma forte veia empreendedora, desenvolvi um projeto de impacto focado numa cadeira de rodas híbrida que me permitiu ganhar perspetiva internacional e contactar com mercados em vários países. Em paralelo à estratégia económica, especializei-me no desenvolvimento web através de código, criando plataformas rápidas, otimizadas e focadas na experiência do utilizador.\n\nAtualmente, aplico esta visão analítica e competências técnicas na agência, ajudando negócios a traduzirem os seus objetivos em soluções digitais de alto impacto."
  }
];

const TESTIMONIALS = [
  { name: "Vida Cafe", text: "The site feels warm and premium, and our online orders jumped immediately. Jack organized everything so customers find the menu and location fast." },
  { name: "Vines Hair Studio", text: "Jack nailed the look and kept the booking flow simple. The team page and service layout have been a huge upgrade for us." },
  { name: "Vines33", text: "Our product brand finally has a site that feels legit. The visuals, layout, and CTA flow are exactly what we needed to convert." },
  { name: "Ponch Blendz", text: "Fast turnaround and clean design. The site looks modern and customers can find our booking info instantly." },
  { name: "Tandy's Window Services", text: "Our new website finally matches the quality of our work. It brought in more quote requests within the first week." },
  { name: "CE Jewelry", text: "The site feels luxury without being overdone. Customers stay longer and the product pages are easy to browse." }
];

const BUDGET_OPTIONS = [
  { value: "<500", label: "Menos de 500€" },
  { value: "500-1500", label: "500€ - 1.500€" },
  { value: "1500-3000", label: "1.500€ - 3.000€" },
  { value: ">3000", label: "Mais de 3.000€" },
];

/* ── DROPDOWN CUSTOMIZADO ──────────────────────────────────── */
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-blue-500 bg-transparent text-left transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      >
        <span className={selected ? "text-white" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-up" style={{ animationDuration: '0.2s' }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                value === opt.value
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── MODAL "VAMOS CONSTRUIR O SEU WEBSITE" ──────────────────── */
const ContactModal = ({ open, onClose }) => {
  const [hasWebsite, setHasWebsite] = useState(null);
  const [budget, setBudget] = useState(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Vamos Construir o Seu Website
        </h2>
        <p className="text-gray-400 font-light mb-8">
          Formulário rápido. Respondemos em menos de 24 horas.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Nome Completo</label>
            <input type="text" placeholder="João Silva" className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-0 outline-none transition-all" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Email</label>
            <input type="email" placeholder="joao@empresa.com" className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-0 outline-none transition-all" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Número de Telefone</label>
            <input type="tel" placeholder="+351 912 345 678" className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-0 outline-none transition-all" required />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Fale-nos do seu projeto</label>
            <textarea rows="3" placeholder="Descreva o seu negócio, o que precisa que o site faça, ideias que tenha, etc." className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none" required></textarea>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-white">
              Já tem um website atual? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasWebsite('sim')}
                className={`py-3 rounded-xl border font-semibold transition-all ${
                  hasWebsite === 'sim'
                    ? 'border-blue-500 text-white bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-white/15 text-gray-400 hover:border-white/30'
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setHasWebsite('nao')}
                className={`py-3 rounded-xl border font-semibold transition-all ${
                  hasWebsite === 'nao'
                    ? 'border-blue-500 text-white bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-white/15 text-gray-400 hover:border-white/30'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-white">
              Orçamento do Projeto <span className="text-red-500">*</span>
            </label>
            <CustomSelect
              options={BUDGET_OPTIONS}
              value={budget}
              onChange={setBudget}
              placeholder="Selecione o seu orçamento"
            />
          </div>

          <button type="submit" className="w-full py-4 bg-blue-500 text-white rounded-full font-bold text-base hover:bg-blue-600 transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Enviar Mensagem <ArrowRight size={18} />
          </button>

          <p className="text-center text-gray-500 text-sm">
            Sem necessidade de pagamento. Entraremos em contacto em menos de 24 horas.
          </p>
        </form>
      </div>
    </div>
  );
};

/* ── COMPONENTE PRINCIPAL ───────────────────────────────────── */
export default function AgencyPortfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTeamSlide, setActiveTeamSlide] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000); 
    return () => clearInterval(timer);
  }, [activeTeamSlide]);

  const handleNavClick = () => setMobileMenuOpen(false);
  const nextSlide = () => setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));
  const prevSlide = () => setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0));

  const openContactModal = () => {
    setMobileMenuOpen(false);
    setIsContactModalOpen(true);
  };

  return (
    <>
      <GlobalStyles />
      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* ── MENU HEADER ── */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header 
          className={`pointer-events-auto transition-all duration-500 rounded-full px-6 py-2 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border ${
            isScrolled 
              ? 'w-full max-w-5xl bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10' 
              : 'w-full max-w-5xl bg-[#0a0a0a]/50 backdrop-blur-md border-white/5'
          }`}
        >
          <a href="#home" className="flex items-center text-white hover:opacity-80 transition-opacity">
            <LogoVA className="w-12 h-12" />
          </a>

          <nav className="hidden md:flex items-center gap-8 font-medium text-[14px] text-gray-300">
            <a href="#home" className="hover:text-white transition-colors duration-300">Início</a>
            <a href="#services" className="hover:text-white transition-colors duration-300">Serviços</a>
            <a href="#portfolio" className="hover:text-white transition-colors duration-300">Portefólio</a>
            <a href="#team" className="hover:text-white transition-colors duration-300">A Equipa</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={openContactModal} className="hidden md:block bg-blue-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              Começar Website
            </button>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </header>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl py-6 px-6 flex flex-col gap-6 font-medium text-gray-300">
          <a href="#home" onClick={handleNavClick} className="hover:text-white transition-colors">Início</a>
          <a href="#services" onClick={handleNavClick} className="hover:text-white transition-colors">Serviços</a>
          <a href="#portfolio" onClick={handleNavClick} className="hover:text-white transition-colors">Portefólio</a>
          <a href="#team" onClick={handleNavClick} className="hover:text-white transition-colors">A Equipa</a>
          <button onClick={openContactModal} className="text-left text-white mt-2 pb-2 border-b border-white/20">Começar Website</button>
        </div>
      )}

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
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-[15px] hover:bg-white/5 transition-all flex items-center gap-2">
              <Calendar size={18} /> Agendar Reunião
            </button>
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
            <a
              href="#"
              className="inline-flex items-center gap-2 px-10 py-4 bg-blue-500 text-white rounded-full font-bold text-[15px] hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Ver Portefólio Completo <ArrowRight size={18} />
            </a>
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

      {/* ── SECÇÃO: TESTEMUNHOS ── */}
<section id="testimonials" className="py-24 md:py-32 px-6 bg-black border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16 animate-fade-up">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
        What My <span className="text-blue-500 text-glow-blue">Clients</span> Are Saying
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {TESTIMONIALS.map((item, idx) => (
        <div key={idx} className="bg-[#0d0d0d] rounded-2xl border border-white/5 p-8 flex flex-col relative transition-all duration-300 hover:border-blue-500/30 group">
          {/* Ícone de Aspas e Estrelas */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill="#3b82f6" className="text-blue-500" />
              ))}
            </div>
            <Quote size={24} className="text-blue-500/20 group-hover:text-blue-500 transition-colors duration-300" />
          </div>

          {/* Texto do Testemunho */}
          <p className="text-gray-300 text-[15px] leading-relaxed font-light mb-8 flex-1">
            "{item.text}"
          </p>

          {/* Linha divisória subtil */}
          <div className="border-t border-white/5 pt-4">
            <h4 className="text-white font-display font-bold text-sm tracking-wide">
              {item.name}
            </h4>
          </div>
        </div>
      ))}
    </div>

    {/* Botão See More Testimonials */}
    <div className="flex justify-center mt-12">
      <button className="px-8 py-3 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-full font-medium text-sm transition-all duration-300">
        See More Testimonials
      </button>
    </div>
  </div>
</section>

      {/* ── A EQUIPA ── */}
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
            <div className="absolute top-[112px] md:top-[128px] left-0 md:left-4 right-0 md:right-4 flex justify-between px-2 md:px-0 z-30 pointer-events-none transform -translate-y-1/2">
              <button onClick={prevSlide} className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-[#0a0a0a]/60 hover:bg-blue-500 hover:border-blue-500 transition-colors backdrop-blur-md shadow-lg">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-[#0a0a0a]/60 hover:bg-blue-500 hover:border-blue-500 transition-colors backdrop-blur-md shadow-lg">
                <ChevronRight size={24} />
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

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex justify-start items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
            <LogoVA className="w-12 h-12" />
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-600 font-bold">
            © {new Date().getFullYear()} V/A Digital. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-widest font-bold text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Termos</a>
          </div>
        </div>
      </footer>
    </>
  );
}
