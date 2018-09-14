import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import icons from './images';
import Title from '../title';

export default ({title, icon, children}) => (
    <View style={styles.container}>
        {title && <Title style={styles.title}>{title}</Title>}
        <View style={[styles.wrapper, icons[icon] ? null : styles.noImage]}>
            {children}
        </View>
        {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
    </View>
);
