import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import ConfirmCopy from '../../src/app/components/confirm-copy';
import Modal from '../../src/app/components/modal';
import Button from '../../src/app/components/button';
import Title from '../../src/app/components/title';
import Paragraph from '../../src/app/components/paragraph';
import ConfirmSend from '../../src/app/components/confirm-send';
import Progress from '../../src/app/components/progress';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 40,
};


storiesOf('Modal')
    .add('default view', () => (
        <View style={style}>
            <Modal>
                <Title dark>Lorem ipsum</Title>
                <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
                <Button
                    label={'Lorem ipsum'}
                    onPress={() => {}}
                />
            </Modal>
        </View>
    ))
    .add('confirm copy', () => (
        <View style={style}>
            <ConfirmCopy
                title={'Secret Key'}
                content={'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('howdy', () => (
        <View style={style}>
            <Modal>
                <Title dark>Howdy!</Title>
                <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                <Paragraph style={{marginBottom: 40}}>If you’re an *ICO, Airdrop, Bounty* or VIP, you can do this via settings.</Paragraph>
                <Button
                    label={'Good to know!'}
                    onPress={() => {}}
                />
                <Button
                    theme="outline"
                    label={'Go to settings'}
                    onPress={() => {}}
                />
            </Modal>
        </View>
    ))
    .add('confirm send', () => (
        <View style={style}>
            <ConfirmSend
                name={'Ella'}
                amount={'40'}
                onYes={() => {}}
                onNo={() => {}}
            />
        </View>
    ))
    .add('progress', () => (
        <View style={style}>
            <Progress
                title="Transfer in progress"
                text="Sending *40 Wollo* to Ella"
                buttonLabel="Close"
                onPress={() => {}}
                complete={false}
                error={null}
                active={true}
            />
        </View>
    ))
    .add('progress complete', () => (
        <View style={style}>
            <Progress
                title="Success!"
                text="*40 Wollo* has successfully been sent to Ella"
                buttonLabel="Close"
                onPress={() => {}}
                complete={true}
                error={null}
                active={true}
            />
        </View>
    ));
