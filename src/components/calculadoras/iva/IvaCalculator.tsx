import React, { useState, useCallback } from 'react';

interface CalculationResult {
  baseAmount: number;
  ivaAmount: number;
  totalAmount: number;
}

export function IvaCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'addIva' | 'removeIva'>('addIva');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const IVA_RATE = 0.19;

  const calculateIva = useCallback(() => {
    const numAmount = parseFloat(amount.replace(/[^\d.-]/g, ''));
    
    if (isNaN(numAmount)) {
      setResult(null);
      return;
    }

    let baseAmount: number;
    let ivaAmount: number;
    let totalAmount: number;

    if (calculationType === 'addIva') {
      baseAmount = numAmount;
      ivaAmount = baseAmount * IVA_RATE;
      totalAmount = baseAmount + ivaAmount;
    } else {
      totalAmount = numAmount;
      baseAmount = totalAmount / (1 + IVA_RATE);
      ivaAmount = totalAmount - baseAmount;
    }

    setResult({
      baseAmount,
      ivaAmount,
      totalAmount
    });
  }, [amount, calculationType]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmount(value);
      setResult(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 max-w-xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Calculadora de IVA
        </h2>
        <div className="bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1 rounded-full">
          19% IVA
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Tipo de cálculo */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            ¿Qué deseas hacer?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCalculationType('addIva')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                calculationType === 'addIva'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Agregar IVA
            </button>
            <button
              onClick={() => setCalculationType('removeIva')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                calculationType === 'removeIva'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Quitar IVA
            </button>
          </div>
        </div>

        {/* Monto */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-3 block">
            {calculationType === 'addIva' ? 'Monto sin IVA' : 'Monto con IVA'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <span className="text-gray-500 sm:text-lg px-4">$</span>
            </div>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="block w-full pl-12 pr-16 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
              style={{ paddingLeft: '2.5rem' }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="text-gray-400 text-sm px-4">CLP</span>
            </div>
          </div>
        </div>

        {/* Botón calcular */}
        <button
          onClick={calculateIva}
          disabled={!amount}
          className={`
            w-full py-4 px-6 rounded-xl text-lg font-semibold
            transition-all duration-300 transform
            ${amount 
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span className="flex items-center justify-center gap-2">
            <svg 
              className={`w-5 h-5 ${amount ? 'group-hover:translate-x-0.5' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
              />
            </svg>
            Calcular
          </span>
        </button>

        {/* Resultados */}
        {result && (
          <div className="mt-8 space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Monto Neto</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(result.baseAmount)}
                </p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-sm font-medium text-teal-700 mb-1">IVA (19%)</p>
                <p className="text-xl font-bold text-teal-700">
                  {formatCurrency(result.ivaAmount)}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-dashed">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-4 text-white">
                <p className="text-sm font-medium mb-1">Monto Total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(result.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}