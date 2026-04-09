import React from 'react';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Input.css';

const Input = ({
  label,
  id,
  error,
  className = '',
  type = 'text',
  options = [],
  voiceKey,   // translation key to speak aloud when mic is pressed
  ...props
}) => {
  const { speak, t } = useLanguage();

  const handleVoice = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.classList.add('speaking');
    speak(voiceKey || label);
    setTimeout(() => btn.classList.remove('speaking'), 2000);
  };

  const displayLabel = label;

  return (
    <div className={`input-group ${className}`}>
      <div className="input-label-row">
        {displayLabel && (
          <label htmlFor={id} className="input-label">{displayLabel}</label>
        )}
        {(voiceKey || label) && (
          <button
            type="button"
            className="voice-btn"
            onClick={handleVoice}
            title="Voice guidance"
            aria-label={`Voice guidance for ${displayLabel}`}
          >
            <Volume2 size={13} />
          </button>
        )}
      </div>

      {type === 'select' ? (
        <select
          id={id}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        >
          <option value="">{t('selectOption')}</option>
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

      {error && <span className="error-text">⚠ {error}</span>}
    </div>
  );
};

export default Input;
