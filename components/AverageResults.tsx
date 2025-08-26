import React from 'react';
import { CursorArrowRaysIcon } from './icons/CursorArrowRaysIcon';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons/ChatBubbleOvalLeftEllipsisIcon';
import { TagIcon } from './icons/TagIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';
import { UserIcon } from './icons/UserIcon';
import { EyeIcon } from './icons/EyeIcon';

// Data from Results.tsx for calculation
const resultsData = [
    {
        metrics: [
            { label: 'Cliques', value: '8.200' },
            { label: 'CPC Médio', value: 'R$0,05' },
            { label: 'Investimento', value: 'R$448,69' },
        ],
    },
    {
        metrics: [
            { label: 'Cliques', value: '6.458' },
            { label: 'CPC Médio', value: 'R$0,08' },
            { label: 'Investimento', value: 'R$521,02' },
        ],
    },
    {
        metrics: [
            { label: 'Custo p/ Conversa', value: 'R$1,30' },
            { label: 'Conversas', value: '92' },
            { label: 'Investimento', value: 'R$119,67' },
        ],
    },
    {
        metrics: [
            { label: 'Conversas', value: '8' },
            { label: 'Custo p/ Conversa', value: 'R$13,75' },
            { label: 'Investimento', value: 'R$109,99' },
        ],
    },
    {
        metrics: [
            { label: 'Custo p/ Conversa', value: 'R$3,06' },
            { label: 'Conversas', value: '141' },
            { label: 'Investimento', value: 'R$431,56' },
        ],
    },
    {
        metrics: [
            { label: 'Cliques', value: '48' },
            { label: 'CPC Médio', value: 'R$0,87' },
            { label: 'Investimento', value: 'R$41,92' },
        ],
    },
];

const parseValue = (valueStr: string): number => {
  return parseFloat(valueStr.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
};

const calculateAverages = () => {
    let totalClicks = 0;
    let totalConversations = 0;
    let totalInvestment = 0;
    let clickInvestment = 0;
    let conversationInvestment = 0;

    resultsData.forEach(result => {
        let hasClicks = false;
        let hasConversations = false;
        let investment = 0;

        result.metrics.forEach(metric => {
            const value = parseValue(metric.value);
            if (!isNaN(value)) {
                if (metric.label === 'Cliques') {
                    totalClicks += value;
                    hasClicks = true;
                } else if (metric.label === 'Conversas') {
                    totalConversations += value;
                    hasConversations = true;
                } else if (metric.label === 'Investimento') {
                    investment = value;
                }
            }
        });

        totalInvestment += investment;
        if (hasClicks) {
            clickInvestment += investment;
        }
        if (hasConversations) {
            conversationInvestment += investment;
        }
    });

    const averageCostPerConversation = totalConversations > 0 ? conversationInvestment / totalConversations : 0;
    const averageCostPerClick = totalClicks > 0 ? clickInvestment / totalClicks : 0;

    return {
        totalClicks,
        totalConversations,
        averageCostPerConversation,
        totalInvestment,
        averageCostPerClick,
    };
};

const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(Math.round(num));
const formatCurrency = (num: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);

const HeroStatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => {
    return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-quark-blue to-quark-pink p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center animate-fade-in-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 mb-8">
            <div className="flex-shrink-0 text-white mb-4">
                {icon}
            </div>
            <div>
                <p className="text-5xl md:text-6xl font-extrabold text-white">{value}</p>
                <p className="mt-2 text-lg font-semibold text-blue-100">{label}</p>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string; }> = ({ icon, label, value, color }) => {
    const colorClasses = {
        blue: { border: 'border-t-quark-blue', bg: 'bg-quark-blue/10', text: 'text-quark-blue' },
        pink: { border: 'border-t-quark-pink', bg: 'bg-quark-pink/10', text: 'text-quark-pink' },
        teal: { border: 'border-t-teal-500', bg: 'bg-teal-500/10', text: 'text-teal-500' },
        purple: { border: 'border-t-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-500' },
        green: { border: 'border-t-green-500', bg: 'bg-green-500/10', text: 'text-green-500' },
        orange: { border: 'border-t-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500' },
    };
    const currentTheme = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <div className={`bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 ${currentTheme.border} animate-fade-in-up h-full`}>
            <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full mb-4 ${currentTheme.bg}`}>
                <div className={currentTheme.text}>{icon}</div>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-light-text-primary dark:text-dark-text-primary whitespace-nowrap">{value}</p>
            <p className="mt-2 text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">{label}</p>
        </div>
    );
};

const AverageResults: React.FC = () => {
    const { totalClicks, totalConversations, averageCostPerConversation, averageCostPerClick } = calculateAverages();
    
    const heroStat = {
        icon: <EyeIcon className="h-20 w-20" />,
        label: 'Visualizações de nossos anúncios',
        value: '+1.500.000',
    };

    const stats = [
        {
            icon: <CursorArrowRaysIcon className="h-8 w-8" />,
            label: 'Total de Cliques Gerados',
            value: formatNumber(totalClicks),
            color: 'blue',
        },
        {
            icon: <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />,
            label: 'Total de Conversas Iniciadas',
            value: formatNumber(totalConversations),
            color: 'pink',
        },
        {
            icon: <UserIcon className="h-8 w-8" />,
            label: 'Clientes Atendidos no Brasil',
            value: '+50',
            color: 'orange',
        },
        {
            icon: <TagIcon className="h-8 w-8" />,
            label: 'Custo Médio por Clique',
            value: formatCurrency(averageCostPerClick),
            color: 'teal',
        },
        {
            icon: <TagIcon className="h-8 w-8" />,
            label: 'Custo Médio por Conversa',
            value: formatCurrency(averageCostPerConversation),
            color: 'purple',
        },
        {
            icon: <BanknotesIcon className="h-8 w-8" />,
            label: 'Valor total gerenciado',
            value: '+R$50.000',
            color: 'green',
        },
    ];

    return (
        <section id="stats" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">Nossos Números Consolidados</h2>
                    <p className="mt-4 text-xl text-light-text-secondary dark:text-dark-text-secondary">O resumo do nosso impacto, em números.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <HeroStatCard 
                        icon={heroStat.icon}
                        label={heroStat.label}
                        value={heroStat.value}
                    />
                    {stats.map((stat) => (
                        <StatCard 
                            key={stat.label} 
                            icon={stat.icon} 
                            label={stat.label} 
                            value={stat.value} 
                            color={stat.color} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AverageResults;