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
    }

    onLayout = () => {
        this.setState({width: getWidth()});
    }

    render() {
        const {children, style, scroll} = this.props;
        const {width} = this.state;

        return (
            <View style={[styles.container, {width: width}, style]} onLayout={this.onLayout}>
                {scroll ? (
                    <ScrollView
                        bounces={false}
                        style={{flex: 1}}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-between'
                        }}>
                        {children}
                    </ScrollView>
                ) : (
                    children
                )}
            </View>
        );
    }
}
