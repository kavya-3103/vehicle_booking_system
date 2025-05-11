import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Step1UserName = ({ formData, handleChange, nextStep }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter both first and last name');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box
        width="100%"
        maxWidth="400px"
        padding={5}
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow={3}
      >
        <Typography variant="h5" gutterBottom align="center">
          What is your name?
        </Typography>

        <Box marginBottom={2}>
          <Typography variant="body1" marginBottom={1}>
            First Name
          </Typography>
          <TextField
            label="Enter First Name"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </Box>

        <Box marginBottom={2}>
          <Typography variant="body1" marginBottom={1}>
            Last Name
          </Typography>
          <TextField
            label="Enter Last Name"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </Box>

        {error && (
          <Typography color="error" marginBottom={2}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          fullWidth
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step1UserName;
