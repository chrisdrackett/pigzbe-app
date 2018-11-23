import React, {Fragment} from 'react';
import {View, TouchableOpacity} from 'react-native';
import GameMessageBubble from 'app/components/game-message-bubble';
import GameNotification from 'app/components/game-notification';
import styles from './styles';

export default ({
    kid,
    pigzbe,
    clouds,
    wolloCounter,
    tourType,
    tourStep,
    closeSecondTimeTour,
    onAdvanceTour
}) => {
    if (tourType === 'secondTime') {
        return (
            <TouchableOpacity style={styles.tourContainer} onPress={closeSecondTimeTour}>
                {tourStep === 0 &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content="Yay, you're back!"
                        />
                    </View>
                }
            </TouchableOpacity>
        );
    }
    if (tourType === 'firstTime') {
        return (
            <TouchableOpacity
                style={[
                    styles.tourContainer,
                    tourStep >= 3 ? styles.tourContainerFaded : null,
                ]}
                onPress={onAdvanceTour}>
                {tourStep === 0 &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content={`Welcome ${kid.name}. I'm Pigzbe, your piggy companion...`}
                        />
                    </View>
                }
                {tourStep === 1 &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content="I think we are going to be great friends."
                        />
                    </View>
                }
                {tourStep === 2 &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content="Before we begin, I thought I should show you around."
                        />
                    </View>
                }
                {tourStep === 3 &&
                    <Fragment>
                        {wolloCounter}
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="Your trees show you how much you have saved."
                            />
                        </View>
                    </Fragment>
                }
                {tourStep === 4 &&
                    <Fragment>
                        {clouds === null ? (
                            <View style={styles.clouds}>
                                <View style={{alignSelf: 'center'}}>
                                    <GameNotification
                                        amount={10}
                                        memo="Description"
                                        onActivateCloud={() => {}}
                                    />
                                </View>
                            </View>
                        ) : clouds}
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="Pocket money, tasks or gifts will be shown as clouds."
                            />
                        </View>
                    </Fragment>
                }
                {tourStep === 5 &&
                    <View style={styles.bubble} pointerEvents="none">
                        <GameMessageBubble
                            content="Tap your first cloud to begin!"
                        />
                    </View>
                }
                {pigzbe}
            </TouchableOpacity>
        );
    }
    return null;
};
