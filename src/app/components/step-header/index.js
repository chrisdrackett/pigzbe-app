import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import icons from './images';
import Title from '../title';

const StepHeader = ({title, icon, children}) => (
    <View style={styles.container}>
        <Title>{title}</Title>
        {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
        {!icons[icon] && <View style={styles.noImage}>{children}</View>}
    </View>
);

export default StepHeader;
