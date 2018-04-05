import React from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Platform.OS === 'web' ? 'red' : 'black',
        fontSize: 18
    }
});

export default () => (
    <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <Text>Lorem ipsum dolor sit amet</Text>
    </View>
);
