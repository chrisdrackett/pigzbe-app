import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PixiView from './pixi-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default class PixiScreen extends Component {
    render() {
        console.log('==> props', Object.keys(this.props));
        return (
            <View style={styles.container}>
                <PixiView {...this.props}/>
            </View>
        );
    }
}
