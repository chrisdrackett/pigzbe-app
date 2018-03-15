import React from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff0000',
        margin: 10,
        padding: 10
    },
    title: {
        color: '#fff',
        fontSize: 18
    }
});

export default () => (
    <View style={styles.container}>
        <Text style={styles.title}>Platform.OS {Platform.OS}</Text>
        <Text style={styles.title}>Desktop specific component</Text>
    </View>
);
