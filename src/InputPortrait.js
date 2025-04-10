import React from 'react';
import { motion } from 'framer-motion';
import { FaRegEdit } from 'react-icons/fa';


const InputPortrait = ({
  label,
  name,
  type = "number",
  value,
  onChange,
  step,
  placeholder,
  image, // nova prop para imagem
  unit   // nova prop para unidade de medida
}) => {
  return (
    <motion.div
      className="bg-white shadow-xl rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cabeçalho customizado */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 flex items-center justify-between">
        {/* Grupo com ícone/imagem e label */}
        <div className="flex items-center space-x-3">
          {image ? (
            <img
              src={image}
              alt={label}
              className="w-8 h-8 object-cover"
            />
          ) : (
            <FaRegEdit className="text-white text-xl" />
          )}
          <h3 className="text-white text-lg font-bold">{label}</h3>
        </div>
        {/* Bloco para a unidade de medida com borda e padding */}
        {unit && (
          <div className="flex items-center">
            <div className="px-3 py-1 bg-white text-blue-600 border-blue-300 rounded-xl shadow-xl text-sm font-medium">
              {unit}
            </div>
          </div>
        )}
      </div>

      {/* Área do input */}
      <div className="p-4">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          step={step}
          placeholder={placeholder}
          className="w-full py-3 px-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-colors duration-200"
        />
      </div>
    </motion.div>
  );
};

export default InputPortrait;
