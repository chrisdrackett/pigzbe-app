import React, {Fragment} from 'react';
import {Image} from 'react-native';
import styles from './styles';

export default ({photo, size = 48}) => (
    <Fragment>
        {photo ? (
            <Image
                style={[styles.image, styles.photo, {
                    borderRadius: size / 2,
                    width: size,
                    height: size,
                }]}
                source={{uri: photo}}
            />
        ) : (
            <Image
                style={[styles.image, {
                    width: size,
                    height: size,
                }]}
                source={require('./images/kid.png')}
            />
        )}
    </Fragment>
);
