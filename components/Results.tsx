import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface Metric {
  label: string;
  value: string;
}

interface Result {
  icon: string;
  title: string;
  description: string;
  metrics: Metric[];
  category: string;
  categoryColor: string;
}

const resultsData: Result[] = [
  {
    icon: '👨‍🏫',
    title: 'Professor Gameficado',
    description: 'E-commerce de conteúdo educativo que utiliza gamificação para engajar professores e alunos.',
    metrics: [
      { label: 'Cliques', value: '8.200' },
      { label: 'CPC Médio', value: 'R$0,05' },
      { label: 'Investimento', value: 'R$448,69' },
    ],
    category: 'Meta Ads',
    categoryColor: 'bg-blue-500',
  },
  {
    icon: '📘',
    title: 'Aprender Para Crescer',
    description: 'E-commerce de materiais educativos focado no desenvolvimento infantil e aprendizado.',
    metrics: [
      { label: 'Cliques', value: '6.458' },
      { label: 'CPC Médio', value: 'R$0,08' },
      { label: 'Investimento', value: 'R$521,02' },
    ],
    category: 'Meta Ads',
    categoryColor: 'bg-blue-500',
  },
  {
    icon: '🧠',
    title: 'Mente Lúdica',
    description: 'E-commerce de jogos e atividades para o desenvolvimento cognitivo e criativo.',
    metrics: [
      { label: 'Custo p/ Conversa', value: 'R$1,30' },
      { label: 'Conversas', value: '92' },
      { label: 'Investimento', value: 'R$119,67' },
    ],
    category: 'Meta Ads',
    categoryColor: 'bg-blue-500',
  },
  {
    icon: '🚀',
    title: 'Sky Party',
    description: 'Festa com temática geek no Rio de Janeiro, buscando divulgação e venda de ingressos através de anúncios no Google.',
    metrics: [
      { label: 'Cliques', value: '48' },
      { label: 'CPC Médio', value: 'R$0,87' },
      { label: 'Investimento', value: 'R$41,92' },
    ],
    category: 'Google Ads',
    categoryColor: 'bg-green-500',
  },
  {
    icon: '🎨',
    title: 'Shaka Tattoo',
    description: 'Estúdio de tatuagem que buscou agendamentos de novos clientes através de campanhas no WhatsApp.',
    metrics: [
      { label: 'Conversas', value: '8' },
      { label: 'Custo p/ Conversa', value: 'R$13,75' },
      { label: 'Investimento', value: 'R$109,99' },
    ],
    category: 'Meta Ads',
    categoryColor: 'bg-blue-500',
  },
  {
    icon: '💻',
    title: 'Quark IT Studio',
    description: 'Campanhas para nossa agência, focadas na captação de leads para criação de sites e marketing.',
    metrics: [
      { label: 'Custo p/ Conversa', value: 'R$3,06' },
      { label: 'Conversas', value: '141' },
      { label: 'Investimento', value: 'R$431,56' },
    ],
    category: 'Meta Ads',
    categoryColor: 'bg-blue-500',
  },
];

const MetricDisplay: React.FC<{ metric: Metric; isHighlighted: boolean }> = ({ metric, isHighlighted }) => {
  if (isHighlighted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-slate-800/50 dark:via-dark-surface dark:to-slate-800/50 rounded-lg p-4 flex flex-col justify-center text-center ring-2 ring-quark-pink/50 dark:ring-quark-blue/50 shadow-md">
        <p className="text-3xl font-extrabold bg-gradient-to-r from-quark-blue to-quark-pink bg-clip-text text-transparent leading-tight">{metric.value}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-yellow-400 text-sm" aria-hidden="true">★</span>
          <p className="text-xs font-bold text-quark-blue dark:text-quark-pink" title={metric.label}>{metric.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 dark:bg-dark-bg/50 rounded-lg p-3 flex items-baseline justify-between text-left">
      <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">{metric.label}</p>
      <p className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{metric.value}</p>
    </div>
  );
};


const ResultCard: React.FC<{ result: Result; bestMetrics: { [key: string]: string } }> = ({ result, bestMetrics }) => {
    const sortedMetrics = [...result.metrics].sort((a, b) => {
        const aIsHighlighted = a.label !== 'Investimento' && bestMetrics[a.label] === a.value;
        const bIsHighlighted = b.label !== 'Investimento' && bestMetrics[b.label] === b.value;
        if (aIsHighlighted && !bIsHighlighted) return -1;
        if (!aIsHighlighted && bIsHighlighted) return 1;
        return 0;
    });

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 border border-light-border dark:border-dark-border h-full">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl mt-1" role="img" aria-label="ícone do card">{result.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{result.title}</h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{result.description}</p>
                    </div>
                </div>

                {/* Metrics List */}
                <div className="my-auto flex flex-col gap-3 py-4">
                    {sortedMetrics.map((metric, index) => {
                        const isHighlighted = metric.label !== 'Investimento' && bestMetrics[metric.label] === metric.value;
                        return <MetricDisplay key={index} metric={metric} isHighlighted={isHighlighted} />;
                    })}
                </div>
                
                {/* Footer/Badge */}
                <div className="mt-auto text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${result.categoryColor} bg-opacity-70`}>{result.category}</span>
                </div>
            </div>
        </div>
    );
};


const Results: React.FC = () => {
  const allResults = [...resultsData, ...resultsData];

  const getBestMetricValues = (results: Result[]): { [key: string]: string } => {
    const parseValue = (valueStr: string): number => {
      return parseFloat(valueStr.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    };

    const metricsToTrack: { [key: string]: { higherIsBetter: boolean; bestValue: number; bestString: string } } = {
        'Cliques': { higherIsBetter: true, bestValue: -Infinity, bestString: '' },
        'Conversas': { higherIsBetter: true, bestValue: -Infinity, bestString: '' },
        'Custo p/ Conversa': { higherIsBetter: false, bestValue: Infinity, bestString: '' },
        'CPC Médio': { higherIsBetter: false, bestValue: Infinity, bestString: '' },
    };

    results.forEach(result => {
        result.metrics.forEach(metric => {
            const tracker = metricsToTrack[metric.label];
            if (tracker) {
                const currentValue = parseValue(metric.value);
                if (!isNaN(currentValue)) {
                    if (tracker.higherIsBetter && currentValue > tracker.bestValue) {
                        tracker.bestValue = currentValue;
                        tracker.bestString = metric.value;
                    } else if (!tracker.higherIsBetter && currentValue < tracker.bestValue) {
                        tracker.bestValue = currentValue;
                        tracker.bestString = metric.value;
                    }
                }
            }
        });
    });
    
    const bestValues: { [key: string]: string } = {};
    Object.keys(metricsToTrack).forEach(key => {
        bestValues[key] = metricsToTrack[key].bestString;
    });

    return bestValues;
  };

  const bestMetrics = getBestMetricValues(resultsData);

  return (
    <section id="results" className="py-20 sm:py-28 bg-stone-100 dark:bg-dark-bg">
      <div className="max-w-full mx-auto px-0">
        <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center mb-4">
              <ChartBarIcon className="h-12 w-12 text-quark-blue" />
          </div>
          <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Resultados Reais</h2>
          <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">Veja o impacto que geramos para negócios como o seu.</p>
        </div>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {allResults.map((result, index) => (
              <div key={index} className="flex-shrink-0 w-[calc(90vw)] sm:w-[380px] md:w-[420px] px-4 py-4">
                <ResultCard result={result} bestMetrics={bestMetrics} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;