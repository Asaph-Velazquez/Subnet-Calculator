import React, { useState } from 'react';
import InputIP from './js/components/InputIP';
import InputMask from './js/components/InputMask';
import InputSubnetMask from './js/components/InputSubnetMask';
import InputVLSM from './js/components/InputVLSM';
import Resultados from './js/components/Resultados';
import calcularSubred, { calcularVLSM } from './js/utils/calculos';
import './App.css';
import Instructions from './js/components/Instructions';

function App() {
  const [resultados, setResultados] = useState(null);
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState('');
  const [subnetMask, setSubnetMask] = useState(null);
  const [mode, setMode] = useState('traditional'); // 'traditional' o 'vlsm'
  const [vlsmSubnets, setVlsmSubnets] = useState([]);

  const handleCalculate = () => {
    if (mode === 'traditional') {
      const resultadosCalculados = calcularSubred(ip, mask, subnetMask);
      setResultados(resultadosCalculados);
    } else {
      const resultadosCalculados = calcularVLSM(ip, mask, vlsmSubnets);
      setResultados(resultadosCalculados);
    }
  };

  const handleVolver = () => {
    setResultados(null);
  };

  const toggleMode = () => {
    setMode(mode === 'traditional' ? 'vlsm' : 'traditional');
    setResultados(null);
  };

  const renderInputFields = () => (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setMode('traditional')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'traditional'
              ? 'bg-gradient-to-r from-light-blue to-blue-500 text-white shadow-lg'
              : 'bg-dark-blue/30 text-text-light hover:bg-dark-blue/50'
          }`}
        >
          Modo Tradicional
        </button>
        <button
          onClick={() => setMode('vlsm')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'vlsm'
              ? 'bg-gradient-to-r from-light-blue to-blue-500 text-white shadow-lg'
              : 'bg-dark-blue/30 text-text-light hover:bg-dark-blue/50'
          }`}
        >
          Modo VLSM
        </button>
      </div>

      <div className="space-y-4">
        <InputIP
          label="Dirección IP"
          value={ip}
          onChange={setIp}
        />
        <InputSubnetMask
          label="Máscara"
          value={mask}
          onChange={setMask}
        />
      {mode === 'traditional' ? (
          <InputSubnetMask
            label="Máscara de Subred"
            value={subnetMask}
            onChange={setSubnetMask}
          />
      ) : (
        <InputVLSM onSubnetsChange={setVlsmSubnets} />
      )}
        <button
          onClick={handleCalculate}
          className="w-full py-3 px-6 bg-gradient-to-r from-light-blue to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
        Calcular
      </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-medium-blue to-dark-blue">
      {/* Efecto de partículas de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Título con efecto de brillo */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-blue to-blue-400 mb-4">
            Calculadora IP y VLSM
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-light-blue to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className={`grid ${resultados ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Panel izquierdo */}
          <div className="bg-medium-blue/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border-blue/30">
              <Instructions />
            <div className="mt-8 space-y-6">
              <p className="text-text-light text-lg font-medium">
                Por favor, ingresa los datos requeridos para calcular las subredes:
              </p>
              {renderInputFields()}
            </div>
              </div>

          {/* Panel derecho (resultados) */}
          {resultados && (
            <div className="bg-medium-blue/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border-blue/30">
              <button
                onClick={handleVolver}
                className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-light-blue text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Volver a Configuración
              </button>
              <Resultados data={resultados} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;