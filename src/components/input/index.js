import React from 'react';
import { randomValue } from '../../utils/util';


class InputElement extends React.Component {
  render() {
    const styles = {
      width: `${randomValue({ min: 100, max: 300 })}px`,
      height: `${randomValue({ min: 20, max: 30 })}px`,
      borderWidth: `${randomValue({ min: 0.5, max: 1 })}px`,
      borderRadius: `${randomValue({ max: 3 })}px`,
      borderStyle: 'solid',
      padding: `${randomValue({ max: 5 })}px`,
      opacity: `${randomValue({ max: 1 })}`,
      // color: randomValue({type: 'color'}),
      // borderColor: randomValue({type: 'color'}),
    };
    const imgStyles = {
      maxWidth: '300px',
      maxHeight: '50px',
    }
    return (
      <div>
        <div className="element-outer">
          <span>{randomValue({ type: 'string', min: 4 })} : </span>
          <span className="element-container" data-name="input">
            {
              randomValue({ max: 10 }) > 3 ?
                (
                  // css 样式
                <input style={styles}
                  placeholder={randomValue({ max: 10 }) > 4 ? '' : randomValue({ type: 'string' })}
                ></input>)
                : (
                  // 图片
                  <img style={imgStyles} src={require(`./img/${Math.floor(Math.random() * 16)}.png`)} alt='input'></img>
                )
            }
          </span>
        </div>
      </div>
    );
  }
}

export default InputElement;
