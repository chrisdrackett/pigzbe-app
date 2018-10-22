
import React, { Component } from 'react'
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {loadExchange} from 'app/actions';
import Loader from 'app/components/loader';
import Button from 'app/components/button';
import styles from './styles';

const withLoadExchange = (WrappedComponent) => {
    class WithLoadExchange extends Component {
        state = {
            loaded: null,
        }
        componentDidMount() {
            const inBackground = this.props.exchange !== null;
            this.handleLoad(inBackground);
        }

        handleLoad = async (inBackground = false) => {
            if (inBackground) {
                this.setState({
                    loaded: true,
                });
                this.props.dispatch(loadExchange());
            } else {
                this.setState({
                    loaded: null,
                });
                const loaded = await this.props.dispatch(loadExchange());
                this.setState({
                    loaded,
                });
            }
        }
    
        render() {
            if (this.state.loaded) {
                return <WrappedComponent {...this.props} />;
            }
            if (this.state.loaded === null) {
                return (
                    <Loader
                        loading={true}
                        message={"Loading exchange..."}
                    />
                )
            }
            return (
                <View style={styles.container}>
                        <Text style={styles.text}>Failed to load exchange rates. Please check your internet connection.</Text>
                        <Button
                            label="Try again"
                            theme="light"
                            onPress={this.handleLoad}
                        />
                </View>
            );
        }
    }

    return connect(
        (state) => ({
            exchange: state.exchange.exchange,
        })
    )(WithLoadExchange);
}

export default withLoadExchange;
