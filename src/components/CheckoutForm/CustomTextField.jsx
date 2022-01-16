import React from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput=({ name, label }) =>{
  const { control } = useForm();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
      control={control}
        as={TextField}
        defaultValue=""
        name={name}
        label={label}
        fullWidth
        required
        error={isError}
      />
    </Grid>
  );
}

export default FormInput;