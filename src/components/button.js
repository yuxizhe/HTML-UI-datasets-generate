import React from 'react';
import { randomValue } from '../utils/util';

// import Text from './text';

class InputElement extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({min: 80, max: 150})}px`,
      height: `${randomValue({min: 20, max: 40})}px`,
      borderWidth: `${randomValue({min: 1, max: 2}) / 2}px`,
      borderRadius: `${randomValue({max: 6})}px`,
      borderStyle: 'solid',
      borderColor: randomValue({max: 10}) > 3 ? 'black' : randomValue({type: 'color'}),
      opacity: `${randomValue({min: 1, max: 3}) / 3}`,
      background: randomValue({max: 10}) > 3 ? 'white' : randomValue({type: 'color'}),
      // padding: `${randomValue({max: 5})}px`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    return (
      <div className="element-container" data-name="button">
        <button style={styles}
        >
          <span>{randomValue({type: 'string', min: 2, max: 4 })}</span>
        </button>
      </div>
    );
  }
}

export default InputElement;
