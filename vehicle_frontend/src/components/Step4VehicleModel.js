import React, { useState, useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';

const Step4VehicleModel = ({ formData, handleChange, nextStep }) => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicles?typeId=${formData.vehicleTypeId}`)
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, [formData.vehicleTypeId]);

  const handleNext = () => {
    if (!formData.vehicleId) {
      setError('Please select a vehicle model');
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
          Select Vehicle Model
        </Typography>

        <FormControl component="fieldset" error={!!error} fullWidth>
          <FormLabel component="legend">Vehicle Model</FormLabel>
          <RadioGroup
            value={formData.vehicleId}
            onChange={(e) => handleChange('vehicleId', e.target.value)}
          >
            {vehicles.map((vehicle) => (
              <FormControlLabel
                key={vehicle.id}
                value={String(vehicle.id)}
                control={<Radio />}
                label={vehicle.modelName}
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

export default Step4VehicleModel;
