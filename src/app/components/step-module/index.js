import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Paragraph from '../../components/paragraph';
import Loader from '../../components/loader';
import styles from './styles';
import {color} from '../../styles';

export default class StepModule extends Component {

  static defaultProps = {
      scroll: true,
      keyboardOffset: 0,
      avoidKeyboard: true,
  }

  render() {
      const {
          title,
          content,
          icon,
          error,
          scroll,
          children,
          headerChildren,
          backgroundColor,
          onBack,
          pad,
          onSettings,
          settingsIcon,
          paddingTop,
          keyboardOffset,
          loading,
          loaderMessage,
          customTitle,
          hideLogo,
          justify,
          avoidKeyboard,
      } = this.props;

      const {height} = Dimensions.get('window');

      const container = (
          <Container
              scroll={scroll}
              style={[styles.container, {
                  backgroundColor: (!error && backgroundColor) || color.white,
              }]}
          >
              {(content || error) && (
                  <View style={[styles.containerText, {paddingTop: height > 568 ? 32 : 25}]}>
                      {typeof content === 'string' ? (
                          <Paragraph>{content}</Paragraph>
                      ) : (
                          content
                      )}
                      {error && (
                          <Paragraph style={styles.error}>{error.message}</Paragraph>
                      )}
                  </View>
              )}
              <View style={[
                  styles.wrapper,
                  justify ? {justifyContent: justify} : null,
                  pad ? styles.pad : null, paddingTop ? {paddingTop} : null
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
          </Container>
      );

      return (
          <Container style={styles.wrapper} scroll={false}>
              <View style={styles.bg}/>
              <Header
                  onBack={onBack}
                  onSettings={onSettings}
                  settingsIcon={settingsIcon}
                  hideLogo={hideLogo}
                  customTitle={customTitle}
                  loading={loading}
              />
              {
                  title || icon || headerChildren ? <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader> : null
              }
              {avoidKeyboard &&
                <KeyboardAvoid style={{flex: 1}} containerStyle={{flexGrow: 1}} offset={keyboardOffset}>
                    {container}
                </KeyboardAvoid>
              }
              {!avoidKeyboard &&
                container
              }
          </Container>
      );
  }
}
