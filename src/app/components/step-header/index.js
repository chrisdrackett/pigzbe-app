import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const getIconSource = (icon) => {
    switch (icon) {
        case 'tick':
            return require('./images/tick.png');
        default:
            return null;
    }
};

const StepHeader = ({title, icon}) => {

    const iconSource = getIconSource(icon);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {iconSource && <Image style={styles.image} source={iconSource} />}
        </View>
    );
};

export default StepHeader;
