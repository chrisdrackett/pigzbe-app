import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';

export default ({children}) => (
    <View style={styles.overlay}>
        <View>
            <Image source={require('./images/bird.png')} style={styles.bird}/>
            <View style={styles.container}>
                {children}
            </View>
        </View>
    </View>
);
