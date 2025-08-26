import React from 'react';

interface PortfolioItem {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags: string[];
  url: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Website da Quark IT',
    category: 'Website Institucional',
    imageUrl: 'https://i.imgur.com/XQQCN3M.png',
    description: 'Nosso cartão de visitas digital. Um site institucional focado em performance, design moderno e na apresentação clara de nossos serviços e resultados.',
    tags: ['React', 'Vite', 'UI/UX'],
    url: 'https://quarkit.vercel.app',
  },
  {
    title: 'Combo Primeira Leitura',
    category: 'Landing Page',
    imageUrl: 'https://i.imgur.com/LDPk6Ve.png',
    description: 'Criação de uma landing page encantadora para o lançamento de 6 livros infantis. O design lúdico e interativo foi projetado para cativar pais e educadores.',
    tags: ['React', 'Vite', 'Meta Ads', 'Landing Page', 'Campanha para WhatsApp'],
    url: 'https://aprender-para-crescer.vercel.app',
  },
  {
    title: 'Site Barbearia Novo Styllo',
    category: 'Website',
    imageUrl: 'https://i.imgur.com/qe4urRA.png',
    description: 'Um site de alto impacto para fortalecer a presença online da barbearia. Apresenta o ambiente e serviços, convertendo visitantes em clientes fiéis.',
    tags: ['React', 'Vite', 'Website', 'Google Meu Negócio', 'Botão para WhatsApp'],
    url: 'https://barbearianovostyllo.vercel.app',
  },
];

const tagColors: { [key: string]: string } = {
  'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Vite': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'TailwindCSS': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
  'UI/UX': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
  'Landing Page': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Meta Ads': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  'Website': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  'Google Meu Negócio': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Campanha para WhatsApp': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  'Botão para WhatsApp': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};


const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
  <div className="group animate-fade-in-up bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-light-border dark:border-dark-border">
    <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver projeto ${item.title}`}>
      <div className="relative overflow-hidden aspect-video">
        <img className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" src={item.imageUrl} alt={item.title} />
      </div>
    </a>
    <div className="p-6">
      <p className="text-sm font-semibold text-quark-blue dark:text-quark-pink">{item.category}</p>
      <h3 className="mt-1 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{item.title}</h3>
      <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary h-20">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map(tag => (
          <span 
            key={tag} 
            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[tag] || tagColors.default}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6">
         <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-quark-blue hover:opacity-90 transition-opacity shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100">
            Ver Projeto
          </a>
      </div>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Nosso Portfólio de Sites e Landing Pages</h2>
          <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">Designs modernos e funcionais que encantam clientes.</p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;