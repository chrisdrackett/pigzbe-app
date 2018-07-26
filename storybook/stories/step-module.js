import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import StepModule from '../../src/app/components/step-module';
import Button from '../../src/app/components/button';
import images from '../../src/app/components/step-header/images';

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
                outline
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                secondary
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
                    outline
                    label={'Lorem ipsum'}
                    onPress={() => {}}
                />
                <Button
                    secondary
                    label={'Lorem ipsum'}
                    onPress={() => {}}
                />
            </View>
        </StepModule>
    ));
});
