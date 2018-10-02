import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
// import GameWollo from '../game-wollo';
// import GameCloudFlow from '../game-cloud-flow';
import GameCloud from '../game-cloud';

export default ({amount, memo, hash, onActivateCloud, type}) => (
    <View>
        <View style={styles.wrapper}>
            {/*<GameCloudFlow
                type={type}
                name={memo}
                changeStatus={this.changeStatus}
                status={this.state.status}
                value={amount}
            />*/}
            <GameCloud type={type} value={amount} name={memo} callback={() => onActivateCloud({amount, memo, hash, type}) } />
            {/*<Image style={styles.cloud} source={require('./images/cloud.png')} />
            <View style={styles.amount}>
                <GameWollo small value={amount} />
            </View>
            <Text style={styles.text}>{memo}</Text>*/}
        </View>
    </View>
);
