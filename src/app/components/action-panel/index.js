import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Button from '../button';

export default ({title, label, onAdd, children, style}) => {
    const hasChildren = !!(children && Array.isArray(children) ? children.length : children);

    return (
        <View style={style}>
            <Text style={styles.title}>{title}</Text>
            {hasChildren ? (
                <Fragment>
                    <TouchableOpacity style={styles.plus} onPress={onAdd}>
                        <Image style={styles.plusIcon} source={require('./images/plus.png')} />
                    </TouchableOpacity>
                    {children}
                </Fragment>
            ) : (
                <View style={styles.add}>
                    <Button
                        label={label}
                        theme="light"
                        onPress={onAdd}
                    />
                </View>
            )}
        </View>
    );
};
