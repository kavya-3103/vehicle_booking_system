import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Step5BookingDates = ({ formData, handleChange, handleSubmit }) => {
  const [error, setError] = useState('');

  const validateDates = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) {
      return 'Both dates are required.';
    }
    if (new Date(startDate) >= new Date(endDate)) {
      return 'Start date must be before end date.';
    }
    return '';
  };

  const handleFinalSubmit = () => {
    const validationError = validateDates();
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      handleSubmit();
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
          Select Booking Dates
        </Typography>

        <TextField
          label="Start Date"
          type="date"
          fullWidth
          value={formData.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="End Date"
          type="date"
          fullWidth
          value={formData.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />

        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Step5BookingDates;
