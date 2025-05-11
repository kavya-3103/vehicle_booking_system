import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography, Box } from '@mui/material';

const Step2WheelSelection = ({ formData, handleChange, nextStep }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!formData.wheels) {
      setError('Please select number of wheels');
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
          Select Number of Wheels
        </Typography>

        <FormControl component="fieldset" error={!!error} fullWidth>
          <FormLabel component="legend">Number of Wheels</FormLabel>
          <RadioGroup
            value={formData.wheels}
            onChange={(e) => handleChange('wheels', e.target.value)}
          >
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
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

export default Step2WheelSelection;
