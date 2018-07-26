import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Paragraph from '../../components/paragraph';
import styles from './styles';

export default class extends Component {

  static defaultProps = {
      scroll: false
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
          showSettings,
          onBack,
          pad
      } = this.props;

      return (
          <Container style={styles.wrapper}>
              <View style={styles.bg}/>
              <Header onBack={onBack} showSettings={showSettings}/>
              <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader>
              <Container
                  white
                  scroll={scroll}
                  style={{width: '88.75%', alignSelf: 'center'}}
                  backgroundColor={backgroundColor}
              >
                  {/* <KeyboardAvoid> */}
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
                  <View style={[styles.containerBody, pad ? styles.pad : null]}>
                      {children}
                  </View>
                  {/* </KeyboardAvoid> */}
              </Container>
          </Container>
      );
  }
}
