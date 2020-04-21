import React from 'react';
import { randomValue } from '../utils/util';


class Element extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({min: 100, max: 200})}px`,
      height: `${randomValue({min: 20, max: 30})}px`,
      borderWidth: `${randomValue({min: 1, max: 2}) / 2}px`,
      borderRadius: `${randomValue({max: 8})}px`,
      borderStyle: 'solid',
      padding: `${randomValue({max: 5})}px`,
      opacity: `${randomValue({min: 1, max: 3}) / 3}`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    return (
      <div className="element-container" data-name="select">
        <select style={styles}
        >
          <option value="" disabled selected>{randomValue({type: 'string'})}</option>
        </select>
      </div>
    );
  }
}

export default Element;
