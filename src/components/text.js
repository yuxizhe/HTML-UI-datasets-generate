import React from 'react';
import { randomValue } from '../utils/util';


class Element extends React.Component {
  render() {
    const styles = {
      fontSize: `${randomValue({min: 10, max: 15})}px`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    // const styles2 = {

    // }
    return (
      <span style={styles}>{randomValue({type: 'string', min: 5, max: this.props.length || 15 })}</span>
    );
  }
}

export default Element;
