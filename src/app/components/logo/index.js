import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

export default () => (
    <Image style={styles.logo} source={require('./images/pigzbe_logo.png')} />
);
