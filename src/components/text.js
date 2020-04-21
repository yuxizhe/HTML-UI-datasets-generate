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
      <div className="element-container no-margin" data-name="text">
        <span style={styles}>{randomValue({type: 'string', max: this.props.length || 8 })}</span>{}
      </div>
    );
  }
}

export default Element;
