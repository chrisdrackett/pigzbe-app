import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Paragraph from '../../components/paragraph';
import styles from './styles';
import {color} from '../../styles';

export default class extends Component {

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
          keyboardOffset
      } = this.props;

      console.log('keyboardOffset', keyboardOffset);

      return (
          <Container style={styles.wrapper} scroll={false}>
              <View style={styles.bg}/>
              <Header onBack={onBack} onSettings={onSettings} />
              <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader>
              <KeyboardAvoid style={{flex: 1}} containerStyle={{flexGrow: 1}} offset={keyboardOffset}>
                  <Container
                      scroll={scroll}
                      style={[styles.container, {
                          backgroundColor: backgroundColor || color.white,
                      }]}
                  >
                      {content && (
                          <View style={styles.containerText}>
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
                  </Container>
              </KeyboardAvoid>
          </Container>
      );
  }
}
