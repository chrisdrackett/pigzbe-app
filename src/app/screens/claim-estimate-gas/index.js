import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import {
    getGasEstimate,
    appError,
} from 'app/actions';

export class ClaimEstimateGas extends Component {
    state = {
        estimatedCost: null,
        error: null,
    }

    async componentDidMount() {
        this.onEstimate();
    }

    onEstimate = async() => {
        this.setState({error: null});

        try {
            const {estimatedCost, estimatedCostUSD} = await this.props.dispatch(getGasEstimate());

            this.setState({
                estimatedCost: `${estimatedCost} ETH ($${estimatedCostUSD})`,
            });
        } catch (err) {
            console.log('getGasEstimate error:');
            console.log(err);
            this.setState({error: 'Could not get gas estimate'});
            this.props.dispatch(appError('Could not get gas estimate'));
        }
    }

    render() {
        const {
            icon = 'eidoo',
            onConfirm,
            onCancel
        } = this.props;

        const {
            estimatedCost,
            error
        } = this.state;

        return (
            <StepModule
                onBack={onCancel}
                plain
                pad
                icon={icon}
                justify={error ? 'flex-end' : 'space-between'}
                title="Claim your Wollo"
                loading={!estimatedCost && !error}
                loaderMessage="Please wait, estimating gas cost..."
                content={error ? null : `The estimated gas for this transaction is *${estimatedCost || ''}*`}
                error={error}
            >
                {!error && (
                    <Paragraph small>Click confirm to claim your Wollo tokens.</Paragraph>
                )}
                <View>
                    <Button
                        label={error ? 'Try again' : 'Confirm'}
                        onPress={error ? this.onEstimate : onConfirm}
                    />
                    <Button
                        label="Cancel"
                        theme="outline"
                        onPress={onCancel}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect()(ClaimEstimateGas);
