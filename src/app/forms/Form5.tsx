'use client';

import { useDispatch, useSelector } from 'react-redux';
import { saveForm5, setStep, resetForms } from '../store/slices/onboardingSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const Form5 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboarding.form5);
  const [errors, setErrors] = useState({ preferences: '', termsAccepted: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const preferences = form.getAll('preferences') as string[];
    const termsAccepted = form.get('termsAccepted') === 'on';

    const newErrors = {
      preferences: preferences.length === 0 ? 'Select at least one preference' : '',
      termsAccepted: !termsAccepted ? 'You must accept the terms' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(saveForm5({ preferences, termsAccepted }));
      dispatch(resetForms());
      dispatch(setStep(1));
    }
  };

  const handleBack = () => {
    dispatch(setStep(4));
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        borderRadius: '20px', 
        border: '2px solid white', 
        padding: '2rem',
        backgroundColor: '#87CEEB', // Sky blue background
        color: 'black' // Black text
      }}
    >
      <h2 style={{ color: 'black' }}>Step 5: Preferences</h2>
      <div>
        <label style={{ color: 'black' }}>Preferences (select all that apply)</label>
        <div>
          <label style={{ color: 'black' }}>
            <input 
              type="checkbox" 
              name="preferences" 
              value="email" 
              defaultChecked={formData.preferences.includes('email')} 
            /> Email Updates
          </label>
          <label style={{ color: 'black' }}>
            <input 
              type="checkbox" 
              name="preferences" 
              value="sms" 
              defaultChecked={formData.preferences.includes('sms')} 
            /> SMS Updates
          </label>
          <label style={{ color: 'black' }}>
            <input 
              type="checkbox" 
              name="preferences" 
              value="news" 
              defaultChecked={formData.preferences.includes('news')} 
            /> Newsletter
          </label>
        </div>
        {errors.preferences && <p style={{ color: 'red' }}>{errors.preferences}</p>}
      </div>
      <div>
        <label style={{ color: 'black' }}>
          <input 
            type="checkbox" 
            name="termsAccepted" 
            defaultChecked={formData.termsAccepted} 
          /> I accept the terms and conditions
        </label>
        {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted}</p>}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          type="button" 
          onClick={handleBack}
          style={{
            padding: '0.5rem 2rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#808080',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
        <button 
          type="submit"
          style={{
            padding: '0.5rem 2rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Finish
        </button>
      </div>
    </form>
  );
};

export default Form5;