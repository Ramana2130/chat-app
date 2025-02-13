import React from 'react';

const GenderCheck = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex mt-3'>
      <div className='form-control'>
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'male' ? 'selected' : ''
          }`}
        >
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')} // Corrected function call
          />
        </label>
      </div>
      <div className='form-control'>
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'female' ? 'selected' : ''
          }`}
        >
          <span className='label-text'>Female</span>
          <input
            type='checkbox'
            className='checkbox border-slate-900'
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')} // Corrected function call
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheck;
