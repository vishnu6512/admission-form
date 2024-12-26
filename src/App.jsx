import { TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import './App.css'
import { useState } from 'react'

function App() {
  // State variables for form fields
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    course: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    mobile: false,
    email: false,
    gender: false,
    dob: false,
    course: false,
  });

  // Input validation logic
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length > 0;
      case "address":
        return value.trim().length > 0;
      case "mobile":
        return /^[0-9]{10}$/.test(value); // Validates 10-digit numbers
      case "email":
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value); // Valid email
      case "gender":
        return value !== "";
      case "dob":
        return value !== "";
      case "course":
        return value !== "";
      default:
        return true;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: !validateField(name, value) });
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    let valid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const isValid = validateField(key, formData[key]);
      newErrors[key] = !isValid;
      if (!isValid) valid = false;
    });

    setErrors(newErrors);

    if (valid) {
      alert(`Data stored successfully!\n\n${JSON.stringify(formData, null, 2)}`);
    } else {
      alert("Please fill in all fields correctly!");
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      name: "",
      address: "",
      mobile: "",
      email: "",
      gender: "",
      dob: "",
      course: "",
    });
    setErrors({
      name: false,
      address: false,
      mobile: false,
      email: false,
      gender: false,
      dob: false,
      course: false,
    });
  };

  return (
    <>
      <div style={{ width: '100%', minHeight: "100vh" }} className='d-flex justify-content-center align-items-center bg-dark'>
        <div className='bg-light p-5 rounded'>
          <h3>Student Registration Form</h3>
          <form className='mt-5' onSubmit={handleRegister}>
            {/* Name */}
            <div className='mb-3'>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='w-100'
                label="Name"
                variant="outlined"
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
              />
            </div>

            {/* Address */}
            <div className='mb-3'>
              <TextField
                name="address"
                value={formData.address}
                onChange={handleChange}
                className='w-100'
                label="Address"
                variant="outlined"
                error={errors.address}
                helperText={errors.address ? "Address is required" : ""}
              />
            </div>

            {/* Mobile */}
            <div className='mb-3'>
              <TextField
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className='w-100'
                label="Mobile"
                variant="outlined"
                error={errors.mobile}
                helperText={errors.mobile ? "Enter a valid 10-digit mobile number" : ""}
              />
            </div>

            {/* Email */}
            <div className='mb-3'>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='w-100'
                label="Email"
                variant="outlined"
                error={errors.email}
                helperText={errors.email ? "Enter a valid email address" : ""}
              />
            </div>

            {/* Gender */}
            <div className='mb-3'>
              <FormControl error={errors.gender}>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
                {errors.gender && <FormHelperText>Gender is required</FormHelperText>}
              </FormControl>
            </div>

            {/* Date of Birth */}
            <div className='mb-3'>
              <TextField
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className='w-100'
                variant="outlined"
                error={errors.dob}
                helperText={errors.dob ? "Date of birth is required" : ""}
              />
            </div>

            {/* Course */}
            <div className='mb-3'>
              <FormControl className='w-100' error={errors.course}>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Humanities">Humanities</MenuItem>
                </Select>
                {errors.course && <FormHelperText>Course selection is required</FormHelperText>}
              </FormControl>
            </div>

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                style={{ width: '50%', height: '70px' }}
                className='bg-dark'
              >
                Register
              </Button>
              <Button
                onClick={handleReset}
                variant="outlined"
                style={{ width: '50%', height: '70px' }}
                className='border border-dark text-dark'
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
