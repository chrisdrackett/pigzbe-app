import React, {Fragment} from 'react';
import {Image} from 'react-native';
import styles from './styles';

export default ({photo, large}) => (
    <Fragment>
        {photo ? (
            <Image
                style={[large ? styles.image__large : styles.image, styles.photo, large ? styles.photo__large : null]}
                source={{uri: photo}}
            />
        ) : (
            <Image
                style={[styles.image, large ? styles.image__large : null]}
                source={require('./images/kid.png')}
            />
        )}
    </Fragment>
);
