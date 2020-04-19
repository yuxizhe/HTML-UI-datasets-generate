import React from 'react';
import { randomValue } from '../utils/util';


class InputElement extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({min: 50, max: 200})}px`,
      height: `${randomValue({min: 20, max: 30})}px`,
      borderWidth: `${randomValue({min: 1, max: 3})}px`,
      borderRadius: `${randomValue({max: 8})}px`,
      borderStyle: 'solid',
      padding: `${randomValue({max: 5})}px`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    return (
      <div className="element-container">
        <input style={styles}
          placeholder={randomValue({type: 'string'})}
        ></input>
      </div>
    );
  }
}

export default InputElement;
