import React, {Component, Fragment} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import images from './images';
import Modal from 'react-native-modal';
import IconButton from 'app/components/icon-button';

export default class GameDevice extends Component {
    state = {
        modalOpen: false,
    }

    onOpen = () => this.setState({modalOpen: true})

    onClose = () => this.setState({modalOpen: false})

    render() {
        const {scanning, connected} = this.props;
        const source = connected ? images.connected : scanning ? images.scanning : images.idle;
        return (
            <Fragment>
                <TouchableOpacity
                    onPress={this.onOpen}
                    style={styles.wrapper}>
                    <Image style={styles.image} source={source}/>
                    <Text style={styles.text}>CONNECT DEVICE</Text>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.modalOpen}
                    style={{margin: 0}}
                    backdropOpacity={0.35}
                    backdropColor="rgb(0, 50, 120)"
                    onBackButtonPress={this.onClose}
                >
                    <View style={styles.overlay}>
                        <View style={styles.outerContainer}>
                            <View style={styles.container}>
                                <Text style={styles.text}>CONNECT DEVICE</Text>
                            </View>
                            <IconButton
                                style={{position: 'absolute', top: 32, right: 32}}
                                icon="crossBlue"
                                size={20}
                                padding={16}
                                onPress={this.onClose}
                            />
                        </View>
                    </View>
                </Modal>
            </Fragment>
        );
    }
}
