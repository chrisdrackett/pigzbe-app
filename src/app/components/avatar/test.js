import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './';

const props = {
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFABAMAAAA/vriZAAAAG1BMVEXMzMyWlpbFxcWxsbGjo6OcnJyqqqq+vr63t7f/2tAOAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACyklEQVR4nO3XS4/aMBSGYRMuybJnSBiWQa3a7SD1B0Cl6ZpM1a6HkXpZgiq1W1j0f/ccO+mEYoku8KZ6nwUOmU+y5zh2jHMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP/Iy/vyq2/X1ZO1xX15iMSyt8373T/kri4X9U77s/ZOB7IWKevz3F7C/Uu5q1tI1UhlA9B27tzI2tVZLBP5KLK5mLu+rZbhKAfXlHW2Fb2udnkzP4tNtMqFDexC7vqajU3bKrfqjGygt1ql8iw21iK7Y+ku5a7PP0+yGVqby2Nm0zbSCjmb/doPygymdqNysVxSmRZDP1Yj2fnWD2BoN21aH52vlI3NZnNRulguPe0tFEM2ExtAbiOzcdzq7D8+55ZTF8sll2+revjFtZWsfRsGVLpxbxZ/yIOL5hLb+33QaLnGYhe2EtRYdstZF8uf972/c+kH+BSuFrIb9DvW1d3c9AY4q+O59AMU/xLLm5kb2HbimhfhT01pa+HPACUsmPNcYvlSfJ2W+kiddryXqpf7LuGBPM+llontcq9sCtupazseycm7YuHrGcklZ7uxngIOti58x+2zNZSbfqywVRvLJZT9tE/dgXXibC2fbh8L6RbxG3tK/f1YLqGJr8Sg1GJNw/f+BryVbhvc+snUAUVzCQ39CPStvw8ruei/wjL50NVoaXOd67dYLqXC96HvsPade3IImMihve2Oc//f3EVzKWX2nGdyk3cb3rp3jNpXeuwLlwtr9XgTzSW11T3jl51O6vC9fxBdz3W1HvzlRN82RVO6aC6pcOSvR+Kt+kf5QqtbtDtJOPI/uFgurSL8aBqHjjf9H0O+eutpyB3Dj6ZYLrHXTfVNN5quY1esu5+T/jC9b+c0+yyfDvEcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOv5DdZkcTj3zLq7AAAAAElFTkSuQmCC'
};

describe('Avatar', () => {
    test('renders correctly with image', () => {
        const tree = renderer.create(<Avatar {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly without image', () => {
        const tree = renderer.create(
            <Avatar {...Object.assign({}, props, {
                image: null
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
