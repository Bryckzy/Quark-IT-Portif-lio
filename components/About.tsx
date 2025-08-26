import React from 'react';
import { AdjustmentsHorizontalIcon } from './icons/AdjustmentsHorizontalIcon';
import { BoltIcon } from './icons/BoltIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

const features = [
  {
    name: 'Estratégia Personalizada',
    description: 'Criamos planos de marketing e desenvolvimento únicos, alinhados com os objetivos do seu negócio para garantir o máximo impacto.',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: 'Tecnologia e Performance',
    description: 'Utilizamos as tecnologias mais modernas para construir sites e sistemas rápidos, seguros e com a melhor experiência para o usuário.',
    icon: BoltIcon,
  },
  {
    name: 'Resultados Mensuráveis',
    description: 'Focamos em métricas que importam. Acompanhamos e otimizamos cada etapa para garantir um crescimento real e sustentável.',
    icon: ChartBarIcon,
  },
];

const FeatureCard: React.FC<{ feature: typeof features[0] }> = ({ feature }) => (
  <div className="relative">
    <dt>
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-quark-blue to-quark-pink text-white shadow-lg">
        <feature.icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="ml-16 text-lg leading-6 font-bold text-light-text-primary dark:text-dark-text-primary">{feature.name}</p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-light-text-secondary dark:text-dark-text-secondary">{feature.description}</dd>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-base text-quark-blue dark:text-quark-pink font-semibold tracking-wide uppercase">Nossa Missão</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
              Impulsionamos o seu negócio no mundo digital.
            </p>
            <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">
              Na Quark IT, nossa paixão é ajudar pequenos negócios a prosperar. Transformamos sua visão em realidade digital com soluções que geram resultados concretos e sustentáveis, focando sempre na simplicidade e na eficiência.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <dl className="space-y-10">
              {features.map((feature) => (
                <FeatureCard key={feature.name} feature={feature} />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;