'use client';

import { useDispatch, useSelector } from 'react-redux';
import { saveForm2, setStep } from '../store/slices/onboardingSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const Form2 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboarding.form2);
  const [errors, setErrors] = useState({ degree: '', university: '', year: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const degree = form.get('degree') as string;
    const university = form.get('university') as string;
    const year = Number(form.get('year'));

    const newErrors = {
      degree: !degree ? 'Degree is required' : '',
      university: !university ? 'University is required' : '',
      year: !year || year < 1950 || year > new Date().getFullYear() ? 'Enter a valid year' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(saveForm2({ degree, university, year }));
      dispatch(setStep(3));
    }
  };

  const handleBack = () => {
    dispatch(setStep(1));
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
      <h2 style={{ color: 'black' }}>Step 2: Educational Details</h2>
      <div>
        <label style={{ color: 'black' }}>Degree</label>
        <input
          name="degree"
          defaultValue={formData.degree}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
          }}
        />
        {errors.degree && <p style={{ color: 'red' }}>{errors.degree}</p>}
      </div>
      <div>
        <label style={{ color: 'black' }}>University</label>
        <input
          name="university"
          defaultValue={formData.university}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
          }}
        />
        {errors.university && <p style={{ color: 'red' }}>{errors.university}</p>}
      </div>
      <div>
        <label style={{ color: 'black' }}>Passing Year</label>
        <input
          type="number"
          name="year"
          defaultValue={formData.year || ''}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
          }}
        />
        {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form2;