// Form3.tsx
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { saveForm3, setStep } from '../store/slices/onboardingSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const Form3 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboarding.form3);
  const [errors, setErrors] = useState({ occupation: '', company: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const occupation = form.get('occupation') as string;
    const company = form.get('company') as string;

    const newErrors = {
      occupation: !occupation ? 'Occupation is required' : '',
      company: !company ? 'Company is required' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(saveForm3({ occupation, company }));
      dispatch(setStep(4));
    }
  };

  const handleBack = () => {
    dispatch(setStep(2));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '20px', border: '2px solid white', padding: '2rem' }}>
      <h2 style={{ color: 'black' }}>Step 3: Professional Details</h2>
      <div>
        <label style={{ color: 'black' }}>Occupation</label>
        <input
          name="occupation"
          defaultValue={formData.occupation}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            border: '1px solid #ccc',
          }}
        />
        {errors.occupation && <p style={{ color: 'red' }}>{errors.occupation}</p>}
      </div>
      <div>
        <label style={{ color: 'black' }}>Company</label>
        <input
          name="company"
          defaultValue={formData.company}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            border: '1px solid #ccc',
          }}
        />
        {errors.company && <p style={{ color: 'red' }}>{errors.company}</p>}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form3;