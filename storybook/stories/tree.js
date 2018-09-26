import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import Tree from '../../src/app/components/tree';

const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    height: Dimensions.get('window').height,
};

storiesOf('Game')
    .add('tree', () => (
        <View
            style={flexStyle}
        >
            <Tree
                value={30}
            />
        </View>
    ));
