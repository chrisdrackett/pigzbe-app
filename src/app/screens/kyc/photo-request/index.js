import React, {Component, Fragment} from 'react';
import Paragraph from 'app/components/paragraph';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

import ActionSheet from 'app/components/action-sheet';

import styles from './styles';

export default class PhotoRequest extends Component {
    state = {
        choosingDocument: false,
    }
    render() {
        const {onBack, onDocumentSelect, documents} = this.props;

        return (
            <StepModule
                title="Identity Check"
                onBack={onBack}
                icon="vip"
                pad
                content={
                    <Fragment>
                        <Paragraph>We now require a photo of your ID to do an identity check and confrim your details.</Paragraph>
                        <ActionSheet
                            open={this.state.choosingDocument}
                            options={documents.map(document => document.name)}
                            title="Select a document"
                            onRequestClose={() => this.setState({choosingDocument: false})}
                            onSelect={index => {
                                onDocumentSelect(index);
                                /*this.setState({
                                    choosingDocument: false,
                                });*/
                            }}
                        />
                    </Fragment>
                }
            >
                <Button
                    label="Next"
                    onPress={() => this.setState({choosingDocument: true})}
                />
            </StepModule>
        )
    }
}
