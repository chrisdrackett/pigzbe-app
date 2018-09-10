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
          paddingTop,
          keyboardOffset,
          loading,
          loaderMessage,
          hideLogo
      } = this.props;

      const {height} = Dimensions.get('window');

      return (
          <Container style={styles.wrapper} scroll={false}>
              <View style={styles.bg}/>
              <Header onBack={onBack} onSettings={onSettings} hideLogo={hideLogo} />
              {!!title &&
                <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader>
              }
              <KeyboardAvoid style={{flex: 1}} containerStyle={{flexGrow: 1}} offset={keyboardOffset}>
                  <Container
                      scroll={scroll}
                      style={[styles.container, {
                          backgroundColor: backgroundColor || color.white,
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
                      <View style={[pad ? styles.pad : null, paddingTop ? {paddingTop} : null]}>
                          {children}
                      </View>
                      <Loader
                          light
                          loading={loading}
                          message={loaderMessage}
                          style={{
                              borderTopRightRadius: 5,
                              borderTopLeftRadius: 5,
                          }}
                      />
                  </Container>
              </KeyboardAvoid>
          </Container>
      );
  }
}
