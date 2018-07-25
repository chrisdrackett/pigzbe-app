import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import icons from './images';

const StepHeader = ({title, icon, children}) => (
    <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
        {!icons[icon] && <View style={styles.noImage}>{children}</View>}
    </View>
);

export default StepHeader;
