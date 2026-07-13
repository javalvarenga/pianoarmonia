import React from 'react';
import './Selector.css';

class Selector extends React.Component {
  render() {
    return (
      <div className="selector-container">
        <label htmlFor="selector">Selector:</label>
        <select id="selector" className="vintage-selector">
          <option value="option1">Opción 1</option>
          <option value="option2">Opción 2</option>
          <option value="option3">Opción 3</option>
        </select>
      </div>
    );
  }
}

export default Selector;