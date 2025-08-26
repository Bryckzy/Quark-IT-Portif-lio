import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="bg-light-surface dark:bg-dark-surface">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
          <span className="block">Pronto para crescer online?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-light-text-secondary dark:text-dark-text-secondary">
          Vamos conversar sobre como a Quark IT pode ajudar o seu negócio a alcançar o próximo nível.
        </p>
        <a
          href="#contact"
          className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-full shadow-sm text-lg font-semibold text-white bg-quark-blue hover:opacity-90 transition-opacity sm:w-auto"
        >
          Fale com a Quark IT agora
        </a>
      </div>
    </section>
  );
};

export default CTA;