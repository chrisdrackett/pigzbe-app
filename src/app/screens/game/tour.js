import React, {Component} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

export class GameTour extends Component {
    state = {
        targetX: 0,
        isGoalOverlayOpen: false,
        goalOverlayAddress: null,
        inIntroTour: true,
    }

    render() {
 

        return (
            <TouchableOpacity style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                padding: 30
            }}>
                <Text>tet</Text>
            </TouchableOpacity>
        );
    }
}
