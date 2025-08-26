import React from 'react';

interface Service {
  icon: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
  priceDetail?: string;
  priceNoteSymbol?: string;
  plans?: {
      price: string;
      detail: string;
      highlight?: boolean;
      save?: string;
  }[];
  quoteButton?: boolean;
}

const services: Service[] = [
  {
    icon: '🖥️',
    name: 'Criação de Site Profissional',
    description: 'Um site moderno, rápido e otimizado para celulares, projetado para converter visitantes em clientes.',
    features: ["Design Responsivo", "Otimizado para SEO", "Carregamento Rápido"],
    price: 'R$150',
    priceNoteSymbol: '*',
  },
  {
    icon: '📍',
    name: 'Google Meu Negócio',
    description: 'Otimizamos seu perfil para você ser encontrado no Google Maps e na busca local com destaque.',
    features: ["Destaque no Mapa", "Atraia Clientes Locais", "Gerencie Avaliações"],
    price: 'R$150',
  },
  {
    icon: '🚀',
    name: 'SEO (Otimização para Google)',
    description: 'Apareça nas primeiras posições do Google quando seus clientes procurarem por seus serviços.',
    features: ["Melhor Ranking", "Tráfego Orgânico", "Análise de Concorrência"],
    price: 'R$200',
    priceDetail: '/ ano'
  },
  {
    icon: '📢',
    name: 'Campanhas Meta / Google Ads',
    description: 'Criamos e gerenciamos até 10 campanhas de anúncios para atrair clientes qualificados de forma rápida.',
    features: ["Resultados Imediatos", "Segmentação Precisa", "Relatórios Detalhados"],
    plans: [
        { price: 'R$99,90', detail: 'mensal' },
        { price: 'R$899,90', detail: 'anual', highlight: true, save: 'Economize R$298,90!' },
    ],
  },
  {
    icon: '📱',
    name: 'Gestão de Redes Sociais',
    description: 'Construímos e gerenciamos sua presença nas redes sociais, criando conteúdo que engaja e converte seguidores em clientes.',
    features: ["Criação de Conteúdo Relevante", "Gerenciamento de Postagens", "Análise de Métricas", "Engajamento com o Público"],
    priceNoteSymbol: '**',
    plans: [
        { price: 'R$250', detail: 'mensal' },
        { price: 'R$1699,90', detail: 'anual', highlight: true, save: 'Economize R$1300,10!' },
    ],
  },
  {
    icon: '⚙️',
    name: 'Infraestrutura Digital Personalizada',
    description: 'Criamos e otimizamos sistemas, APIs e infraestrutura de nuvem sob medida para a sua necessidade de negócio.',
    features: ["Sistemas Escaláveis", "APIs Robustas", "Otimização de Performance", "Consultoria Técnica"],
    quoteButton: true,
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg p-8 flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up border border-light-border dark:border-dark-border">
    {/* Header: Icon, Name, Description */}
    <div className="flex-shrink-0">
        <span className="text-5xl" role="img" aria-label={`Ícone de ${service.name}`}>{service.icon}</span>
        <h3 className="mt-6 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{service.name}</h3>
        <p className="mt-2 text-base text-light-text-secondary dark:text-dark-text-secondary">{service.description}</p>
    </div>
    
    {/* Body: Features (this will grow) */}
    <div className="flex-grow pt-8">
      <ul className="text-left space-y-3 text-sm text-light-text-secondary dark:text-dark-text-secondary border-t border-light-border dark:border-dark-border pt-8">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Footer: Price or Button */}
    <div className="flex-shrink-0 w-full mt-8">
      {service.quoteButton ? (
        <a href="https://wa.me/5511911221418" target="_blank" rel="noopener noreferrer" className="inline-block w-full px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-quark-blue hover:opacity-90 transition-opacity shadow-lg">
          Peça seu Orçamento
        </a>
      ) : service.plans ? (
        <div className="space-y-4">
          {service.plans.map((plan, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 relative ${plan.highlight ? 'border-quark-pink dark:border-quark-blue ring-2 ring-offset-2 ring-offset-light-surface dark:ring-offset-dark-surface ring-quark-pink dark:ring-quark-blue' : 'border-light-border dark:border-dark-border'}`}>
               {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-quark-blue to-quark-pink text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  MAIS VANTAJOSO
                </span>
              )}
              <div className="whitespace-nowrap">
                <span className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary">
                    {plan.price}
                    {plan.detail === 'mensal' && service.priceNoteSymbol}
                </span>
                <span className="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary ml-1">{plan.detail}</span>
              </div>
              {plan.save && <span className="block text-sm font-semibold text-green-600 dark:text-green-400 mt-1">{plan.save}</span>}
            </div>
          ))}
        </div>
      ) : (
         <div className="bg-stone-100 dark:bg-dark-bg/50 rounded-lg p-4">
            <div className="whitespace-nowrap">
                <span className="text-4xl font-extrabold text-light-text-primary dark:text-dark-text-primary">
                    {service.price}{service.priceNoteSymbol}
                </span>
                {service.priceDetail && 
                    <span className="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary ml-2">{service.priceDetail}</span>
                }
            </div>
         </div>
      )}
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Nossos Serviços</h2>
          <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">Soluções completas para sua presença online.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
        <div className="mt-12 text-left max-w-3xl mx-auto space-y-2">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                * O valor para criação de sites é um ponto de partida. Projetos com funcionalidades complexas (e-commerce, sistemas de membros) ou integrações personalizadas estão sujeitos a um orçamento detalhado.
            </p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                ** O valor para Gestão de Redes Sociais é inicial e pode variar com a quantidade de conteúdo, número de plataformas e frequência de engajamento com o público.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Services;