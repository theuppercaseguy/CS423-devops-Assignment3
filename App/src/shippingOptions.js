import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import './App.css';

function ShippingOptions(props) {
  const [shipping, setShipping] = useState(0)

  const handleChange = (event, value) => {
    setShipping(parseInt(value));
    props.onChangeValue(parseInt(value))
  }

  return (
    <div>
      <h4>Choose your delivery option:</h4>
      <RadioGroup
        row
        aria-label="delivery"
        data-testid="delivery_option_id"
        name="delivery"
        value={shipping}
        onChange={(event, value) => handleChange(event, value)}
      >
        <FormControlLabel value={0} control={<Radio inputProps={{"data-testid": `radio-button-free`}} />} label="Free 10 day shipping" />
        <FormControlLabel value={500} control={<Radio inputProps={{"data-testid": `radio-button-2day`}} />} label="$5.00 2-day shipping" />
        <FormControlLabel value={2000} control={<Radio inputProps={{"data-testid": `radio-button-overnight`}} />} label="$20.00 overnight shipping" />
      </RadioGroup>
    </div>
  );
}

ShippingOptions.propTypes = {
  onChangeValue: PropTypes.func.isRequired
};

export default ShippingOptions
