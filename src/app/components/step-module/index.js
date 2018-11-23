import React, {Component} from 'react';
import {View, Dimensions, SafeAreaView, Animated} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Paragraph from '../../components/paragraph';
import Loader from '../../components/loader';
import styles from './styles';
import {color} from '../../styles';

const opacityTrigger = 0.1;
const headerChildrenHeight = 120;

export default class StepModule extends Component {

    static defaultProps = {
        scroll: true,
        keyboardOffset: 0,
        avoidKeyboard: true,
        extraHeaderChildrenSpace: 0,
        hideCustomTitleUntilScrolled: false,
        showLogo: false,
    }

    state = {
        opacity: 1,
    }

    isHeaderTitleVisible() {
        return (this.state.opacity <= opacityTrigger && this.props.title) ||
               (this.props.customTitle && !this.props.hideCustomTitleUntilScrolled) ||
               (this.props.customTitle && this.props.hideCustomTitleUntilScrolled && this.state.opacity <= opacityTrigger);
    }

    componentWillMount() {
        this._isVisible = new Animated.Value(this.isHeaderTitleVisible() ? 1 : 0);
    }

    componentDidUpdate() {
        Animated.timing(this._isVisible, {
            toValue: this.isHeaderTitleVisible() ? 1 : 0,
            duration: 100,
        }).start();
    }

    onScroll = event => {
        const limit = headerChildrenHeight + this.props.extraHeaderChildrenSpace;
        const offset = Math.min(limit, event.nativeEvent.contentOffset.y);
        const newOpacity = offset / limit;
        if (newOpacity !== this.state.opacity) {
            this.setState({
                opacity: 1 - newOpacity,
            });
        }
    }

    render() {
        const {
            title,
            content,
            icon,
            error,
            children,
            headerChildren,
            backgroundColor,
            onBack,
            pad,
            onSettings,
            settingsIcon,
            onRightIcon,
            rightIcon,
            paddingTop,
            keyboardOffset,
            loading,
            loaderMessage,
            customTitle,
            showLogo,
            justify,
            avoidKeyboard,
            keyboardAvoidPad,
            extraHeaderChildrenSpace,
            scroll,
        } = this.props;

        const {height} = Dimensions.get('window');

        const container = (
            <Container
                scroll={scroll}
                style={[styles.container, {backgroundColor: 'transparent'}]}
                onScroll={this.onScroll}
            >
                {(title || icon || headerChildren) &&
                    <View style={{
                        height: headerChildrenHeight + extraHeaderChildrenSpace,
                    }} />
                }

                <View style={{
                    flex: 1,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: (!error && backgroundColor) || color.white,
                }}>

                    {(content || error) && (
                        <View style={[styles.containerText, {paddingTop: height > 568 ? 32 : 25}]}>
                            {typeof content === 'string' ? (
                                <Paragraph>{content}</Paragraph>
                            ) : (
                                content
                            )}
                            {error && (
                                <Paragraph style={styles.error}>{(error.message || error)}</Paragraph>
                            )}
                        </View>
                    )}

                    <View
                        style={[
                            {flex: 1},
                            styles.wrapper,
                            justify ? {justifyContent: justify} : null,
                            pad ? styles.pad : null, paddingTop ? {paddingTop} : null,
                        ]}>
                        {children}
                    </View>
                    <Loader
                        light
                        loading={loading}
                        message={loaderMessage}
                        style={{
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            backgroundColor: color.white,
                        }}
                    />
                </View>
            </Container>
        );

        const customHeaderTitle = this.state.opacity <= opacityTrigger && title ? title : customTitle;

        return (
            <SafeAreaView style={styles.safeArea}>
                <Container style={styles.wrapper} scroll={false}>
                    <View style={styles.bg} />
                    <Header
                        onBack={onBack}
                        onSettings={onSettings}
                        settingsIcon={settingsIcon}
                        onRightIcon={onRightIcon}
                        rightIcon={rightIcon}
                        hideLogo={!showLogo}
                        customTitle={(
                            customHeaderTitle ? (<Animated.Text style={{
                                opacity: this._isVisible.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            }}>
                                {customHeaderTitle}
                            </Animated.Text>) : null
                        )}
                        loading={loading}
                    />
                    <View style={{
                        // backgroundColor: 'red',
                        position: 'absolute',
                        top: 60, // same height as header
                        left: 0,
                        right: 0,
                        opacity: this.state.opacity,
                    }}>
                        {(title || icon || headerChildren) &&
                            <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader>
                        }
                    </View>
                    {avoidKeyboard &&
                        <KeyboardAvoid style={{flex: 1}} containerStyle={{flexGrow: 1}} offset={keyboardOffset} pad={keyboardAvoidPad}>
                            {container}
                        </KeyboardAvoid>
                    }
                    {!avoidKeyboard &&
                        container
                    }
                </Container>
                <View style={styles.safeAreaBottom}>
                    <View style={styles.safeAreaBottomInner} />
                </View>
            </SafeAreaView>
        );
    }
}
