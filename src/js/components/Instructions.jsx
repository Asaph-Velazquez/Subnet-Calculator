import React from 'react';

function Instructions() {
  return (
    <div className="space-y-6">
      <div className="bg-dark-blue/30 rounded-xl p-6 border border-border-blue/30">
        <p className="text-text-light leading-relaxed">
          ¡Bienvenido a nuestra Calculadora IP y VLSM! Esta herramienta te permite calcular y entender el direccionamiento IP y el subnetting. Con ella, puedes dividir una red en subredes más pequeñas y ver cómo se asignan las direcciones IP a cada subred.
          <br /><br />
          El subnetting es una técnica fundamental en redes que permite optimizar el uso de direcciones IP y mejorar la seguridad y el rendimiento de la red.
        </p>
      </div>

      <div className="bg-dark-blue/30 rounded-xl p-6 border border-border-blue/30">
        <h3 className="text-xl font-semibold text-light-blue mb-4">Guía de Uso Rápida</h3>
        <div className="space-y-3 text-text-muted">
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">1</span>
            <span><strong className="text-text-light">Selecciona el modo de cálculo</strong>: Subnetting tradicional o VLSM.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">2</span>
            <span><strong className="text-text-light">Ingresa una dirección IP válida</strong>: Usa el formato xxx.xxx.xxx.xxx, por ejemplo, 192.168.1.0.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">3</span>
            <span><strong className="text-text-light">Especifica la máscara de red</strong>: En notación CIDR, como /24.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">4</span>
            <span><strong className="text-text-light">Para subnetting tradicional</strong>: Ingresa una máscara de subred, por ejemplo, /26.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">5</span>
            <span><strong className="text-text-light">Para VLSM</strong>: Especifica el nombre y número de hosts para cada subred.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">6</span>
            <span><strong className="text-text-light">Haz clic en "Calcular"</strong>: Obtén detalles de las subredes, como dirección de red, broadcast y rango de hosts.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Instructions; 