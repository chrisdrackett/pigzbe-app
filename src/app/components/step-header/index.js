import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import icons from './images';
import Title from '../title';

const StepHeader = ({title, icon, children}) => (
    <View style={styles.container}>
        {title && <Title>{title}</Title>}
        {children && <View style={[styles.noImage, (icons[icon] && !title) ? styles.noTitle : null]}>{children}</View>}
        {(!icons[icon] && !children) && <View style={styles.image}/>}
        {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
    </View>
);

export default StepHeader;
