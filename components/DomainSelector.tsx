
import React from 'react';
import { Domain, DOMAINS } from '../types';

interface DomainSelectorProps {
  selectedDomain: Domain | null;
  onSelectDomain: (domain: Domain) => void;
}

const DomainSelector: React.FC<DomainSelectorProps> = ({ selectedDomain, onSelectDomain }) => {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-medium text-slate-400 mb-2">1. Select a Domain</h2>
      <div className="flex flex-wrap gap-2">
        {DOMAINS.map((domain) => (
          <button
            key={domain}
            onClick={() => onSelectDomain(domain)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
              ${selectedDomain === domain
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DomainSelector;
