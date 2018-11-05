import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import styles from './styles';

const getWidth = () => Dimensions.get('window').width;

export default class Container extends Component {
    state = {
        width: getWidth()
    }

    static defaultProps = {
        scroll: true,
        onScroll: () => {},
    }

    onLayout = () => this.setState({width: getWidth()})

    render() {
        const {children, style, scroll, onScroll} = this.props;
        const {width} = this.state;

        return (
            <View style={[styles.container, {width: width}, style]} onLayout={this.onLayout}>
                {scroll ? (
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                        style={styles.scroll}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.scrollContainer}>
                        {children}
                    </ScrollView>
                ) : (
                    children
                )}
            </View>
        );
    }
}
