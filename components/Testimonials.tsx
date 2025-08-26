import React from 'react';

interface Testimonial {
  quote: string;
  company: string;
  avatarInitials: string;
  metric: {
    value: string;
    label: string;
  };
}

const testimonials: Testimonial[] = [
  {
    quote: 'O investimento em anúncios foi a melhor decisão que tomamos. Com um CPC baixíssimo, alcançamos milhares de pessoas e nossas vendas dispararam. A Quark IT foi essencial!',
    company: 'Aprender Para Crescer',
    avatarInitials: 'APC',
    metric: {
      value: 'R$0,08',
      label: 'CPC Médio',
    },
  },
  {
    quote: 'Nunca imaginei que um site faria tanta diferença. Agora, a barbearia é encontrada facilmente no Google e os clientes chegam elogiando nosso profissionalismo online.',
    company: 'Barbearia Novo Styllo',
    avatarInitials: 'BNS',
    metric: {
      value: '+40%',
      label: 'Novos Clientes via Google',
    },
  },
  {
    quote: 'A estratégia de anúncios superou nossas expectativas. Alcançamos mais de 8 mil professores com um custo por clique incrivelmente baixo. A Quark IT entendeu nosso público e entregou resultados fantásticos.',
    company: 'Professor Gameficado',
    avatarInitials: 'PG',
    metric: {
      value: 'R$0,05',
      label: 'CPC Médio',
    },
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg animate-fade-in-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-light-border dark:border-dark-border h-full flex flex-col">
      <div className="flex items-center mb-6">
          <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-quark-blue to-quark-pink flex items-center justify-center text-white font-bold text-xl">
            {testimonial.avatarInitials}
          </div>
          <div className="ml-4">
            <p className="font-bold text-light-text-primary dark:text-dark-text-primary text-lg">{testimonial.company}</p>
          </div>
      </div>
      <blockquote className="relative flex-grow flex flex-col">
        <div className="mb-6 border-l-4 border-quark-blue/50 dark:border-quark-pink/50 pl-4">
            <p className="text-3xl font-extrabold bg-gradient-to-r from-quark-blue to-quark-pink bg-clip-text text-transparent">{testimonial.metric.value}</p>
            <p className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mt-1">{testimonial.metric.label}</p>
        </div>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary italic">
            “{testimonial.quote}”
        </p>
      </blockquote>
    </div>
);


const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">O Que Nossos Clientes Dizem</h2>
          <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">A satisfação de quem confia em nosso trabalho.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;