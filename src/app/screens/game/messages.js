import React, {Fragment} from 'react';
import {View, TouchableOpacity} from 'react-native';
import GameMessageBubble from 'app/components/game-message-bubble';
import styles from './styles';

export default ({
    showTapFirstCloud,
    showAskParent,
    showTapCloudOrTree,
    parentNickname,
    hideAskParent,
}) => (
    <Fragment>
        {showTapFirstCloud &&
        <View style={styles.bubble}>
            <GameMessageBubble
                content="Tap your first cloud to begin!"
            />
        </View>
        }
        {showAskParent &&
        <TouchableOpacity style={styles.bubble} onPress={hideAskParent}>
            <GameMessageBubble
                content={`Why not ask ${parentNickname} to set you some tasks?`}
            />
        </TouchableOpacity>
        }
        {showTapCloudOrTree &&
        <View style={styles.bubble}>
            <GameMessageBubble
                content="Select a cloud or tap your tree to manage your Wollo"
            />
        </View>
        }
    </Fragment>
);
