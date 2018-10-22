
import React, { Component } from 'react'
import {View, Text} from 'react-native';
import {initialize} from 'app/actions';
import Loader from 'app/components/loader';

const withInitialize = (WrappedComponent) => {
    return class extends Component {
        state = {
            loaded: null,
        }
        componentDidMount() {
            this.handleLoad(); 
        }

        async handleLoad() {
            const loaded = await this.props.dispatch(initialize());
            this.setState({
                loaded,
            });
        }
    
        render() {
            if (this.state.loaded) {
                return <WrappedComponent {...this.props} />;
            }
            if (this.state.loaded === null) {
                return (
                    <Loader
                        loading={true}
                        message={"Initializing..."}
                    />
                )
            }
            return (
                <View>
                    <Text>Failed to initialize. Retry?</Text>
                </View>
            );
        }
    }
}

export default withInitialize;
