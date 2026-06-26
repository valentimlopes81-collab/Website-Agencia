import { Monitor, Camera, Compass, MousePointerClick, Palette, Headphones } from 'lucide-react';

/* ── DADOS DA AGÊNCIA ─────────────────────── */
export const SERVICES = [
  { icon: Monitor, title: "Websites Customizados", desc: "Criação de raiz, gerência contínua ou renovação total para uma presença online de excelência." },
  { icon: Camera, title: "Conteúdo & Audiovisual", desc: "Produção de foto/vídeo e design para finalizar o seu website e dominar as redes sociais." },
  { icon: Compass, title: "Estratégia & Direção", desc: "Desenhamos a estratégia de crescimento exata e o rumo criativo para destacar a sua marca." },
  { icon: MousePointerClick, title: "Tráfego Pago (Ads)", desc: "Set-ups completos de campanhas de alta conversão no Google e Facebook Ads para atrair clientes." },
  { icon: Palette, title: "Rebranding Premium", desc: "Reestruturação total da sua identidade visual para comunicar luxo e autoridade no mercado." },
  { icon: Headphones, title: "Suporte & Manutenção", desc: "Tratamos das questões técnicas, backups e segurança para que foque apenas no seu negócio." },
];

export const PORTFOLIO = [
  { id: 1, title: "Villa Aurora", category: "Alojamento de Luxo & Reservas", desc: "Site de apresentação para um alojamento privado de luxo em Malta, com galeria imersiva, quartos, comodidades, avaliações e sistema de reserva direta.", url: "https://villa-silk.vercel.app/", img: "/villa.webp" },
  { id: 2, title: "Óptica 13", category: "E-commerce & Serviços Óticos", desc: "Website para óptica com agendamento de exames de optometria gratuitos, catálogo de marcas premium e quiz de estilo interativo.", url: "https://optica13.shop/", img: "/optica13.webp" },
  { id: 3, title: "Willchair", category: "Landing Page de Startup", desc: "Página de apresentação de um projeto de empreendedorismo: um kit modular híbrido-elétrico que transforma qualquer cadeira de rodas manual numa elétrica, a uma fração do custo do mercado.", url: "https://willchair.vercel.app/", img: "/willchair.webp" },
  { id: 4, title: "Cenawrld", category: "E-commerce de Moda & Streetwear", desc: "Loja online de streetwear urbano com identidade visual forte, coleções para homem e mulher e checkout otimizado.", url: "https://cenawrld.com/", img: "/cenawrld.webp" },
  { id: 5, title: "Corte & Calma", category: "Marcações Online — Barbearia", desc: "Website para barbearia em Lisboa com sistema de reservas, apresentação de packs, equipa e contacto direto por WhatsApp.", url: "https://corte-e-calma-1.vercel.app/", img: "/corte-e-calma.webp" },
  { id: 6, title: "Lumina", category: "Clínica de Estética & Beleza", desc: "Website para clínica de tratamentos estéticos no Chiado, com marcação de consultas, lista de preços e prova social com centenas de avaliações.", url: "https://lumina-sigma-weld.vercel.app/", img: "/lumina.webp" },
];

export const PROCESS = [
  { step: "01", title: "Estratégia", desc: "Alinhamos a visão, estudamos o seu mercado e definimos o caminho para o sucesso." },
  { step: "02", title: "Design", desc: "Criamos protótipos de alta fidelidade focados na experiência e conversão do utilizador." },
  { step: "03", title: "Código", desc: "Transformamos o design em realidade com código robusto, rápido e imaculado." },
  { step: "04", title: "Lançamento", desc: "Testes rigorosos e implementação final. O seu novo site fica online para o mundo." },
];

export const TEAM = [
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

export const TESTIMONIALS = [
  { name: "Optica 13", text: "The site feels warm and premium, and our online orders jumped immediately. Jack organized everything so customers find the menu and location fast." },
  { name: "cenawrld", text: "Jack nailed the look and kept the booking flow simple. The team page and service layout have been a huge upgrade for us." },
  { name: "fillerdoq", text: "Our product brand finally has a site that feels legit. The visuals, layout, and CTA flow are exactly what we needed to convert." },
  { name: "Willchair", text: "Fast turnaround and clean design. The site looks modern and customers can find our booking info instantly." },
];

// Placeholder até teres uma conta Calendly/Cal.com — substitui pelo link real.
export const CALENDLY_URL = "https://calendly.com/va-digital/chamada-30-min";

export const BUDGET_OPTIONS = [
  { value: "<500", label: "Menos de 500€" },
  { value: "500-1500", label: "500€ - 1.500€" },
  { value: "1500-3000", label: "1.500€ - 3.000€" },
  { value: ">3000", label: "Mais de 3.000€" },
];
