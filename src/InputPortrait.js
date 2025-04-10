import React from 'react';
import { motion } from 'framer-motion';
import { FaRegEdit} from 'react-icons/fa';

const InputPortrait = ({
  label,
  name,
  type = "number",
  value,
  onChange,
  onClear,
  step,
  placeholder,
  image // <- nova prop para imagem
}) => {
return (
    <motion.div
        className="bg-white shadow-xl rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
        {/* Cabeçalho com imagem customizada ou ícone padrão */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 flex items-center space-x-3">
            {image ? (
                <img src={image} alt={label} className="w-8 h-8" />
            ) : (
                <FaRegEdit className="text-white text-xl" />
            )}
            <h3 className="text-white text-lg font-bold">{label}</h3>
        </div>

        {/* Área do input */}
        <div className="relative p-4">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                step={step}
                placeholder={placeholder}
                className="w-full py-3 pl-4 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            />
        </div>
    </motion.div>
);
};

export default InputPortrait;
