import React, { useState, useEffect } from 'react';
import type { Banco } from '../../../types/contentful';

interface BankFilterProps {
  banks: Banco[];
}

export function BankFilter({ banks }: BankFilterProps) {
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    const handleReset = (event: CustomEvent) => {
      if (event.detail.type === 'banco') {
        setSelectedBank('');
      }
    };

    document.addEventListener('filter-reset', handleReset as EventListener);
    return () => document.removeEventListener('filter-reset', handleReset as EventListener);
  }, []);

  const handleBankChange = (bank: string) => {
    const newBank = selectedBank === bank ? '' : bank;
    setSelectedBank(newBank);
    
    const event = new CustomEvent('filter-change', {
      detail: { type: 'banco', value: newBank }
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => handleBankChange('')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedBank === ''
              ? 'bg-lime-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          Todos
        </button>
        {banks.map((bank) => (
          <button
            key={bank.nombreBanco}
            onClick={() => handleBankChange(bank.nombreBanco)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedBank === bank.nombreBanco
                ? 'bg-lime-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {bank.nombreBanco}
          </button>
        ))}
      </div>
    </div>
  );
}