import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Button from '../button';

const Inner = ({onAdd, children, label, boxButton}) => {
    const hasChildren = !!(children && Array.isArray(children) ? children.length : children);

    console.log(onAdd, children, label, boxButton);

    if (hasChildren) {
        return (
            <Fragment>
                <TouchableOpacity style={styles.plus} onPress={onAdd}>
                    <Image style={styles.plusIcon} source={require('./images/plus.png')} />
                </TouchableOpacity>
                {children}
            </Fragment>
        );
    }

    if (boxButton) {
        return (
            <TouchableOpacity onPress={onAdd}>
                <View style={styles.box}>
                    <Text style={styles.boxAddText}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.add}>
            <Button
                label={label}
                theme="light"
                onPress={onAdd}
            />
        </View>
    );
};

export default ({title, label, onAdd, children, style, boxButton}) => (
    <View style={style}>
        <Text style={styles.title}>{title}</Text>
        <Inner
            children={children}
            label={label}
            boxButton={boxButton}
            onAdd={onAdd}
        />
    </View>
);
