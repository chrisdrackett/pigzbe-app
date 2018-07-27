import React, {Fragment} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import StepModule from '../../src/app/components/step-module';
import Button from '../../src/app/components/button';
import Paragraph from '../../src/app/components/paragraph';
import images from '../../src/app/components/step-header/images';
import TextInput from '../../src/app/components/text-input';

const stories = storiesOf('StepModule');

stories.add('no icon', () => (
    <StepModule
        title={'No icon'}
        scroll={false}
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        pad
    >
        <View>
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    </StepModule>
));

Object.keys(images).map(key => {
    stories.add(key, () => (
        <StepModule
            icon={key}
            title={`Step ${key}`}
            scroll={false}
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
            pad
        >
            <View>
                <Button
                    theme="outline"
                    label={'Lorem ipsum'}
                    onPress={() => {}}
                />
                <Button
                    label={'Lorem ipsum'}
                    onPress={() => {}}
                />
            </View>
        </StepModule>
    ));
});

stories.add('scroll test', () => (
    <StepModule
        title={'Scroll Test'}
        icon="keys"
        scroll={true}
        content={
            <Fragment>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</Paragraph>
            </Fragment>
        }
        pad
    >
        <View>
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    </StepModule>
));

stories.add('keyboard test', () => (
    <StepModule
        title={'Keyboard Test'}
        icon="keys"
        scroll={false}
        content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.'}
        pad
    >
        <View style={{borderColor: 'red', borderWidth: 1}}>
            <TextInput
                error={true}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    </StepModule>
));
