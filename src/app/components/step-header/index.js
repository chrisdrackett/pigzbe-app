import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import icons from './images';

const StepHeader = ({title, icon}) => (
    <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
        {!icons[icon] && <View style={{height: 108}} />}
    </View>
);

export default StepHeader;
