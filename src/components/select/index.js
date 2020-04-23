import React from 'react';
import { randomValue } from '../../utils/util';


class Element extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({min: 100, max: 200})}px`,
      height: `${randomValue({min: 20, max: 30})}px`,
      borderWidth: `${randomValue({min: 1, max: 2}) / 2}px`,
      borderRadius: `${randomValue({max: 8})}px`,
      borderStyle: 'solid',
      padding: `${randomValue({max: 5})}px`,
      // opacity: `${randomValue({min: 1, max: 3}) / 3}`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    const imgStyles = {
      maxWidth: '200px',
      maxHeight: '30px',
    }
    return (
      <div>
        <div className="element-outer">
          <span>{randomValue({ type: 'string', min: 4 })} : </span>
          <span className="element-container" data-name="select">
            {
              randomValue({ max: 10 }) > 5 ?
                (
                  // css 样式
                  <select style={styles}
                  >
                    <option value="" disabled selected>
                      {randomValue({max: 10}) > 5 ? '' : randomValue({type: 'string'})}
                    </option>
                  </select>)
                : (
                  // 图片
                  <img style={imgStyles} src={require(`./img/${Math.floor(Math.random() * 22)}.png`)} alt='input'></img>
                )
            }
            
          </span>
        </div>
      </div>
    );
  }
}

export default Element;
