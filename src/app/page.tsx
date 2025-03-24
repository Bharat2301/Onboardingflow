'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { setStep } from './store/slices/onboardingSlice';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';
import Form3 from './forms/Form3';
import Form4 from './forms/Form4';
import Form5 from './forms/Form5';

export default function Home() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.onboarding.step);
  const isCompleted = useSelector((state: RootState) => 
    state.onboarding.form5.termsAccepted && state.onboarding.form5.preferences.length > 0
  );

  const handleStepClick = (step: number) => {
    dispatch(setStep(step));
  };

  const renderForm = () => {
    if (isCompleted) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#28a745' }}>Onboarding Completed Successfully!</h2>
          <p>Your information has been saved.</p>
          <button 
            onClick={() => dispatch(setStep(1))}
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Start Over
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1: return <Form1 />;
      case 2: return <Form2 />;
      case 3: return <Form3 />;
      case 4: return <Form4 />;
      case 5: return <Form5 />;
      default: return <Form1 />;
    }
  };

  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4, 5];
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        {steps.map(step => (
          <button
            key={step}
            onClick={() => handleStepClick(step)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentStep === step ? '#667eea' : '#e0e0e0',
              color: currentStep === step ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: currentStep === step ? 'bold' : 'normal'
            }}
          >
            {step}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        {renderForm()}
      </div>
      {!isCompleted && renderStepIndicator()}
    </div>
  );
}