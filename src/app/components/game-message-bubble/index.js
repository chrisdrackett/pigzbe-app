
import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

const tail = require('./images/tail.png');
const tailTop = require('./images/tail-blue.png');

export default ({content, top = false, style = {}, textStyle = {}, tailStyle = {}}) => (
    <View>
        <View style={[styles.boxOuter, style]}>
            <View style={[styles.boxInner, top ? styles.boxInnerTop : null]}>
                <View style={styles.textContainer}>
                    {typeof content === 'string' &&
                        <Text style={[styles.text, top ? styles.textTop : null, textStyle]}>
                            {content}
                        </Text>
                    }
                    {typeof content !== 'string' &&
                        content
                    }
                </View>
            </View>
        </View>
        {!top &&
            <Image
                style={[styles.tail, tailStyle]}
                source={tail}
                resizeMode="contain"
            />
        }
        {top &&
            <View style={styles.tailContainer}>
                <Image
                    style={styles.tailTop}
                    source={tailTop}
                    resizeMode="contain"
                />
            </View>
        }
    </View>
);
