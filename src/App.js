import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import InputPortrait from './InputPortrait'; // Nosso componente customizado
import './index.css';

// Função de simulação utilizando Runge-Kutta de 4ª ordem
function rungeKuttaSimulation(params) {
  const { m, k, Fc, x0, v0, T, dt } = params;
  const t = [];
  const x = [];
  const v = [];
  
  t.push(0);
  x.push(x0);
  v.push(v0);
  
  const N = Math.floor(T / dt);
  
  for (let i = 0; i < N; i++) {
    let xi = x[i];
    let vi = v[i];
    
    // k1
    let k1x = vi;
    let k1v = - (k / m) * xi - (Fc / m) * Math.sign(vi);
    
    // k2
    let x_temp = xi + (dt / 2) * k1x;
    let v_temp = vi + (dt / 2) * k1v;
    let k2x = v_temp;
    let k2v = - (k / m) * x_temp - (Fc / m) * Math.sign(v_temp);
    
    // k3
    x_temp = xi + (dt / 2) * k2x;
    v_temp = vi + (dt / 2) * k2v;
    let k3x = v_temp;
    let k3v = - (k / m) * x_temp - (Fc / m) * Math.sign(v_temp);
    
    // k4
    x_temp = xi + dt * k3x;
    v_temp = vi + dt * k3v;
    let k4x = v_temp;
    let k4v = - (k / m) * x_temp - (Fc / m) * Math.sign(v_temp);
    
    const xi_next = xi + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    const vi_next = vi + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    
    x.push(xi_next);
    v.push(vi_next);
    t.push((i + 1) * dt);
  }
  
  return { t, x, v };
}

function App() {
  const [params, setParams] = useState({
    m: 1,
    k: 10,
    Fc: 0.5,
    x0: 1,
    v0: 0,
    T: 10,
    dt: 0.01
  });
  const [data, setData] = useState({ t: [], x: [], v: [] });
  
  // Atualiza a simulação sempre que os parâmetros mudam
  useEffect(() => {
    const simData = rungeKuttaSimulation(params);
    setData(simData);
  }, [params]);
  
  // Manipula mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value === "" ? "" : parseFloat(value) }));
  };

  // Função para limpar o campo (define para 0)
  const handleClear = (name) => {
    setParams(prev => ({ ...prev, [name]: 0 }));
  };

  // Atualiza a simulação ao submeter o formulário
  const handleUpdate = (e) => {
    e.preventDefault();
    const simData = rungeKuttaSimulation(params);
    setData(simData);
  };

  // Variantes de animação para o container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.15 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50 py-10 px-4 md:px-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-playfair text-gray-800 drop-shadow-md">
          Sistema de Vibrações Mecânicas
        </h1>
      </header>
      
      {/* Área dos Gráficos */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1 bg-white rounded-xl shadow-2xl p-6 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
              Deslocamento x Tempo
            </h2>
            <Plot 
              data={[
                { x: data.t, y: data.x, type: 'scatter', mode: 'lines', name: 'Deslocamento', line: { color: '#2563EB', width: 3 } }
              ]}
              layout={{
                autosize: true,
                margin: { t: 40, b: 50, l: 50, r: 30 },
                xaxis: { title: { text: 'Tempo (s)', standoff: 10 }, tickfont: { size: 12 } },
                yaxis: { title: { text: 'Deslocamento (m)', standoff: 10 }, tickfont: { size: 12 } }
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "400px" }}
            />
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
              Velocidade x Tempo
            </h2>
            <Plot 
              data={[
                { x: data.t, y: data.v, type: 'scatter', mode: 'lines', name: 'Velocidade', line: { color: '#16A34A', width: 3 } }
              ]}
              layout={{
                autosize: true,
                margin: { t: 40, b: 50, l: 50, r: 30 },
                xaxis: { title: { text: 'Tempo (s)', standoff: 10 }, tickfont: { size: 12 } },
                yaxis: { title: { text: 'Velocidade (m/s)', standoff: 10 }, tickfont: { size: 12 } }
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      </section>

      {/* Formulário de Inputs - Inputs organizados como portraits */}
      <section>
        <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Parâmetros da Simulação
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputPortrait
              label="Massa"
              name="m"
              value={params.m}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              placeholder="kg"
              image="/weight.png" // Adicione a imagem correspondente
            />
            <InputPortrait
              label="Constante da Mola"
              name="k"
              value={params.k}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              image="/torsion.png" // Adicione a imagem correspondente
            />
            <InputPortrait
              label="Força de Coulomb"
              name="Fc"
              value={params.Fc}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              image="/skin.png" // Adicione a imagem correspondente
            />
            <InputPortrait
              label="Deslocamento Inicial"
              name="x0"
              value={params.x0}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              image="/measure.png" // Adicione a imagem correspondente
            />
            <InputPortrait
              label="Velocidade Inicial"
              name="v0"
              value={params.v0}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              image="/dashboard.png" // Adicione a imagem correspondente
            />
            <InputPortrait
              label="Tempo Total"
              name="T"
              value={params.T}
              onChange={handleChange}
              onClear={handleClear}
              step="0.1"
              image="/time.png"
              unit="s" // Adicione a unidade
            />
          </div>
          <div className="flex justify-center mt-8">            
          </div>
        </form>
      </section>
    </motion.div>
  );
}

export default App;
