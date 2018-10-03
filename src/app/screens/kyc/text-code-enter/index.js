import React, {Component, Fragment} from 'react';
import {View, Dimensions} from 'react-native';

import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import InputBoxes from 'app/components/input-boxes';

const boxes = 6;
const space = 8;
const boxW = Math.min(50, (Dimensions.get('window').width * 0.8875 - 40 - space * (boxes - 1)) / boxes);

export default class TextCodeEnter extends Component {
    state = {
        textCode: '',
    }
    render() {
        const {onNext, onBack} = this.props;

        return (
            <StepModule
                title="Enter your Token Code"
                icon="code"
                content={
                    <Fragment>
                        <Paragraph>
                            Lipsum dolor es.
                        </Paragraph>
                        
                        <View style={{marginTop: 50}}>
                            <InputBoxes
                                boxes={boxes}
                                onFulfill={textCode => {
                                    this.setState({textCode});
                                }}
                                boxSize={{width: boxW, height: 44}}
                                space={space}
                            />
                        </View>
                    </Fragment>
                }   
                onBack={onBack}
                pad
            >
                <View>
                    <Button
                        label="Next"
                        onPress={() => onNext(this.state.textCode)}
                    />
                </View>
            </StepModule>
        );
    }
}
