import React, {Fragment} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import StepModule from '../../src/app/components/step-module';
import Button from '../../src/app/components/button';
import Paragraph from '../../src/app/components/paragraph';
import images from '../../src/app/components/step-header/images';
import TextInput from '../../src/app/components/text-input';

const stories = storiesOf('StepModule');

stories.add('justify center', () => (
    <StepModule
        title="justify center"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        pad
        justify="center"
    >
        <Button
            theme="outline"
            label={'Top'}
            onPress={() => {}}
        />
        <Button
            label={'Bottom'}
            onPress={() => {}}
        />
    </StepModule>
));

stories.add('justify space-between', () => (
    <StepModule
        title="justify space-between"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        pad
        justify="space-between"
    >
        <Button
            theme="outline"
            label={'Top'}
            onPress={() => {}}
        />
        <Button
            label={'Bottom'}
            onPress={() => {}}
        />
    </StepModule>
));

stories.add('justify flex-end', () => (
    <StepModule
        title="justify flex-end"
        content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        pad
        justify="flex-end"
    >
        <Button
            theme="outline"
            label={'Top'}
            onPress={() => {}}
        />
        <Button
            label={'Bottom'}
            onPress={() => {}}
        />
    </StepModule>
));

stories.add('no icon', () => (
    <StepModule
        title={'No icon'}
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

stories.add('scroll test 2', () => (
    <StepModule
        title={'Scroll Test 2'}
        icon="keys"
        content={
            <Fragment>
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
        content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.'}
        pad
    >
        <View>
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

stories.add('loading', () => (
    <StepModule
        title={'Loading Test'}
        icon="keys"
        content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.'}
        pad
        loading={true}
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


stories.add('header test', () => (
    <StepModule
        title={'Header Test'}
        icon="keys"
        content={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.'}
        pad
        onSettings={() => {}}
        onBack={() => {}}
        customTitle="Testing"
    />
));
