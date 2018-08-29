import React from 'react';
import {View, Modal} from 'react-native';
import styles from './styles';
import Loader from 'app/components/loader';

export default ({
    loading,
    message,
}) => {
    if (loading) {
        return (
            <Modal
                animationType="fade"
                transparent={true} 
                visible={loading}
                onRequestClose={() => {}}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Loader
                        loading={loading}
                        message={message}
                        light={true}
                    />
                </View>
            </Modal>
        );
    }
    return null;
};
