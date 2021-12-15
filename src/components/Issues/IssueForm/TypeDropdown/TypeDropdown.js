import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TypeDropdown = ({ handleChange, type, name }) => {
  // const [type, setType] = useState('Public');

  // const handleChange = (event) => {
  //   setType(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
          name={name}
        >
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TypeDropdown;
