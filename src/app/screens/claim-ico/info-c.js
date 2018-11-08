import React, {Component, Fragment} from 'react';
import StepWrapper from '../../components/step-wrapper';
import OrderedList from '../../components/ordered-list';
import Paragraph from '../../components/paragraph';
import {SCREEN_CLAIM_ICO_ENTER_KEYS} from '../../constants';

export default class InfoC extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO_ENTER_KEYS)

    render() {
        return (
            <StepWrapper
                title={'Your Eidoo Wallet Address'}
                onNext={this.onNext}
                onBack={this.onBack}
                content={(
                    <Fragment>
                        <Paragraph>Next up in the Eidoo app.</Paragraph>
                        <OrderedList
                            items={[
                                'Go to *Your Assets*',
                                'Select the *Wollo* asset from the list',
                                'Tap the *Address* button below the balance at the top of the screen',
                                'Tap the *COPY TO CLIPBOARD* button to copy your wallet address. (you will paste in the next step)'
                            ]}
                        />
                    </Fragment>
                )}
            />
        );
    }
}
