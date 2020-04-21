import React from 'react';
import { randomValue } from '../utils/util';


class InputElement extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({min: 100, max: 400})}px`,
      height: `${randomValue({min: 20, max: 30})}px`,
      borderWidth: `${randomValue({min: 1, max: 2}) / 2}px`,
      borderRadius: `${randomValue({max: 5})}px`,
      borderStyle: 'solid',
      padding: `${randomValue({max: 5})}px`,
      opacity: `${randomValue({min: 1, max: 3}) / 3}`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    return (
      <div className="element-container" data-name="input">
        <input style={styles}
          placeholder={randomValue({type: 'string'})}
        ></input>
      </div>
    );
  }
}

export default InputElement;
