import React from 'react';

import Input from './input';
import Button from './button';
import Select from './select';
import Checkbox from './checkbox';

import { randomValue } from '../utils/util';

const components = [Button, Select, Input, Checkbox]

class RandomComponent extends React.Component {
  render() {
    const RandomElement = randomValue({list: components});
    return <RandomElement />;
  }
}

export default RandomComponent;
