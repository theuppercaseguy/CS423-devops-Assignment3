import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function ZipcodeEntry(props) {
  const [zipcode, setZipcode] = useState(props.zipcode)

  const handleClick = () => {
    let tax;
    // Look up tax per zipcode and return the updated value
    props.onChangeTax({zipcode, tax});
  }

  return (
    <div>
      <h4>Enter your zipcode:</h4>
      <input
        type="text"
        value={zipcode}
        onChange={e => setZipcode(e.target.value)}
      />
      <button onClick={() => handleClick()} >
        Set Zipcode
          </button>
      <p>place for errors</p>
    </div>
  );
}

ZipcodeEntry.propTypes = {
  onChangeTax: PropTypes.func.isRequired
};

export default ZipcodeEntry
