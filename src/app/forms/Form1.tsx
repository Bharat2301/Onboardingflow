'use client';

import { useDispatch, useSelector } from 'react-redux';
import { saveForm1, setStep } from '../store/slices/onboardingSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const Form1 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.onboarding.form1);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    message: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateWebsite = (website: string) => {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(website);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;
    const email = form.get('email') as string;
    const website = form.get('website') as string;
    const message = form.get('message') as string;

    const newErrors = {
      firstName: !firstName ? 'First name is required' : '',
      lastName: !lastName ? 'Last name is required' : '',
      email: !email ? 'Email is required' : !validateEmail(email) ? 'Invalid email format' : '',
      website: !website ? 'Website is required' : !validateWebsite(website) ? 'Invalid website URL' : '',
      message: !message ? 'Message is required' : message.length < 10 ? 'Message must be at least 10 characters' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(saveForm1({ firstName, lastName, email, website, message }));
      dispatch(setStep(2));
    }
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
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#87CEEB', // Sky blue background
        color: 'black' // Black text
      }}
    >
      <h2 style={{ color: 'black', textAlign: 'center' }}>Step 1: Personal Information</h2>
      
      <div>
        <label style={{ color: 'black', marginBottom: '0.25rem', display: 'block' }}>First Name</label>
        <input
          name="firstName"
          defaultValue={formData.firstName}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            width: '100%',
            border: 'none',
          }}
        />
        {errors.firstName && <p style={{ color: 'red', marginTop: '0.25rem' }}>{errors.firstName}</p>}
      </div>

      <div>
        <label style={{ color: 'black', marginBottom: '0.25rem', display: 'block' }}>Last Name</label>
        <input
          name="lastName"
          defaultValue={formData.lastName}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            width: '100%',
            border: 'none',
          }}
        />
        {errors.lastName && <p style={{ color: 'red', marginTop: '0.25rem' }}>{errors.lastName}</p>}
      </div>

      <div>
        <label style={{ color: 'black', marginBottom: '0.25rem', display: 'block' }}>Email</label>
        <input
          name="email"
          defaultValue={formData.email}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            width: '100%',
            border: 'none',
          }}
        />
        {errors.email && <p style={{ color: 'red', marginTop: '0.25rem' }}>{errors.email}</p>}
      </div>

      <div>
        <label style={{ color: 'black', marginBottom: '0.25rem', display: 'block' }}>Website</label>
        <input
          name="website"
          defaultValue={formData.website}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            width: '100%',
            border: 'none',
          }}
        />
        {errors.website && <p style={{ color: 'red', marginTop: '0.25rem' }}>{errors.website}</p>}
      </div>

      <div>
        <label style={{ color: 'black', marginBottom: '0.25rem', display: 'block' }}>Message</label>
        <textarea
          name="message"
          defaultValue={formData.message}
          style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '5px',
            color: 'black',
            width: '100%',
            border: 'none',
            minHeight: '100px',
          }}
        />
        {errors.message && <p style={{ color: 'red', marginTop: '0.25rem' }}>{errors.message}</p>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button 
          type="submit"
          style={{
            padding: '0.5rem 2rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Form1;