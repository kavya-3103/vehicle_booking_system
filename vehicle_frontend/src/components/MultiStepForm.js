import React, { useState } from 'react';
import Step1UserName from './Step1UserName';
import Step2WheelSelection from './Step2WheelSelection';
import Step3VehicleType from './Step3VehicleType';
import Step4VehicleModel from './Step4VehicleModel';
import Step5BookingDates from './Step5BookingDates';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleTypeId: '',
    vehicleId: '',
    startDate: '',
    endDate: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Convert vehicleId to integer if it's not already
      const updatedFormData = {
        ...formData,
        vehicleId: parseInt(formData.vehicleId, 10)
      };

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData)
      });
      const result = await response.json();
      alert(result.message || 'Booking submitted');
        setStep(1);
        // Optional: Reset form data too
    setFormData({
      firstName: '',
      lastName: '',
      wheels: '',
      vehicleTypeId: '',
      vehicleId: '',
      startDate: '',
      endDate: ''
    });
    } catch (error) {
      alert('Error submitting booking');
    }
  };

  const stepProps = { formData, handleChange, nextStep, prevStep };

  switch (step) {
    case 1: return <Step1UserName {...stepProps} />;
    case 2: return <Step2WheelSelection {...stepProps} />;
    case 3: return <Step3VehicleType {...stepProps} />;
    case 4: return <Step4VehicleModel {...stepProps} />;
    case 5: return <Step5BookingDates {...stepProps} handleSubmit={handleSubmit} />;
    default: return <h2>Invalid Step</h2>;
  }
};

export default MultiStepForm;
