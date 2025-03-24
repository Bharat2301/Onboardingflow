// Form4.tsx
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { saveForm4, setStep } from '../store/slices/onboardingSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const Form4 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboarding.form4);
  const [errors, setErrors] = useState({ phone: '', emergencyContact: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = form.get('phone') as string;
    const emergencyContact = form.get('emergencyContact') as string;

    const newErrors = {
      phone: !phone ? 'Phone is required' : !/^\d{10}$/.test(phone) ? 'Invalid phone number' : '',
      emergencyContact: !emergencyContact ? 'Emergency contact is required' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(saveForm4({ phone, emergencyContact }));
      dispatch(setStep(5));
    }
  };

  const handleBack = () => {
    dispatch(setStep(3));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '20px', border: '2px solid white', padding: '2rem' }}>
      <h2 style={{ color: 'black' }}>Step 4: Contact Details</h2>
      <div>
        <label style={{ color: 'black' }}>Phone Number</label>
        <input
          name="phone"
          defaultValue={formData.phone}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            border: '1px solid #ccc',
          }}
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
      </div>
      <div>
        <label style={{ color: 'black' }}>Emergency Contact</label>
        <input
          name="emergencyContact"
          defaultValue={formData.emergencyContact}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            border: '1px solid #ccc',
          }}
        />
        {errors.emergencyContact && <p style={{ color: 'red' }}>{errors.emergencyContact}</p>}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form4;