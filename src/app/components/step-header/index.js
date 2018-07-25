import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import icons from './images';

const StepHeader = ({title, icon}) => {

    console.log(icons);
    console.log(icons[icon]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {icons[icon] && <Image style={styles.image} source={icons[icon]} />}
        </View>
    );
};

export default StepHeader;
