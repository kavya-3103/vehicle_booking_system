import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography, Box } from '@mui/material';

const Step3VehicleType = ({ formData, handleChange, nextStep }) => {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicles/types?wheels=${formData.wheels}`)
      .then(res => res.json())
      .then(data => setTypes(data))
      .catch(err => console.error(err));
  }, [formData.wheels]);

  const handleNext = () => {
    if (!formData.vehicleTypeId) {
      setError('Please select a vehicle type');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      padding={5}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="400px"
        padding={3}
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow={3}
      >
        <Typography variant="h5" gutterBottom>
          Select Vehicle Type
        </Typography>

        <FormControl component="fieldset" error={!!error} fullWidth>
          <FormLabel component="legend">Vehicle Type</FormLabel>
          <RadioGroup
            value={formData.vehicleTypeId}
            onChange={(e) => handleChange('vehicleTypeId', e.target.value)}
          >
            {types.map(type => (
              <FormControlLabel
                key={type.id}
                value={String(type.id)}
                control={<Radio />}
                label={type.name}
              />
            ))}
          </RadioGroup>
          {error && <Typography color="error">{error}</Typography>}
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          style={{ marginTop: '20px' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step3VehicleType;
