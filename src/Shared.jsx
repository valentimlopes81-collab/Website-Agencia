import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { BUDGET_OPTIONS } from './data';

/* ── ESTILOS GLOBAIS E ANIMAÇÕES PREMIUM ─────────────────────── */
export const GlobalStyles = () => (
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
export const LogoVA = ({ className = "w-14 h-14" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M8 10 L16 30 L24 10 L32 30" />
    <path d="M20 20 L28 20" />
  </svg>
);

/* ── DROPDOWN CUSTOMIZADO ──────────────────────────────────── */
export const CustomSelect = ({ options, value, onChange, placeholder }) => {
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
export const ContactModal = ({ open, onClose }) => {
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

/* ── CABEÇALHO / NAVEGAÇÃO ──────────────────────────────────── */
export const Header = ({ openContactModal, mobileMenuOpen, setMobileMenuOpen, isScrolled }) => {
  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={`pointer-events-auto transition-all duration-500 rounded-full px-6 py-2 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border ${
            isScrolled
              ? 'w-full max-w-5xl bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10'
              : 'w-full max-w-5xl bg-[#0a0a0a]/50 backdrop-blur-md border-white/5'
          }`}
        >
          <Link to="/" className="flex items-center text-white hover:opacity-80 transition-opacity">
            <LogoVA className="w-12 h-12" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-[14px] text-gray-300">
            <Link to="/#home" className="hover:text-white transition-colors duration-300">Início</Link>
            <Link to="/#services" className="hover:text-white transition-colors duration-300">Serviços</Link>
            <Link to="/portfolio" className="hover:text-white transition-colors duration-300">Portefólio</Link>
            <Link to="/testemunhos" className="hover:text-white transition-colors duration-300">Testemunhos</Link>
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
          <Link to="/#home" onClick={handleNavClick} className="hover:text-white transition-colors">Início</Link>
          <Link to="/#services" onClick={handleNavClick} className="hover:text-white transition-colors">Serviços</Link>
          <Link to="/portfolio" onClick={handleNavClick} className="hover:text-white transition-colors">Portefólio</Link>
          <Link to="/testemunhos" onClick={handleNavClick} className="hover:text-white transition-colors">Testemunhos</Link>
          <button onClick={openContactModal} className="text-left text-white mt-2 pb-2 border-b border-white/20">Começar Website</button>
        </div>
      )}
    </>
  );
};

/* ── RODAPÉ ──────────────────────────────────────────────────── */
export const Footer = () => (
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
);
