import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  id, 
  error, 
  className = '', 
  type = 'text',
  options = [],
  ...props 
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      
      {type === 'select' ? (
        <select id={id} className={`input-field ${error ? 'input-error' : ''}`} {...props}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea 
          id={id} 
          className={`input-field ${error ? 'input-error' : ''}`} 
          {...props} 
        />
      ) : (
        <input 
          type={type} 
          id={id} 
          className={`input-field ${error ? 'input-error' : ''}`} 
          {...props} 
        />
      )}
      
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
