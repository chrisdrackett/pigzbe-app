
import React, { Component } from 'react'
import {View, Text} from 'react-native';
import {loadExchange} from 'app/actions';
import Loader from 'app/components/loader';
import Button from 'app/components/button';
import styles from './styles';

const withLoadExchange = (WrappedComponent) => {
    return class extends Component {
        state = {
            loaded: null,
        }
        componentDidMount() {
            this.handleLoad(); 
        }

        handleLoad = async () => {
            this.setState({
                loaded: null,
            });
            const loaded = await this.props.dispatch(loadExchange());
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
}

export default withLoadExchange;
