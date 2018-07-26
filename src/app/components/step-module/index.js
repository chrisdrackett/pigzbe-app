import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import styles from './styles';

export default class extends Component {

  static defaultProps = {
      scroll: false
  }

  render() {
      const {
          title,
          icon,
          tagline,
          error,
          scroll,
          children,
          headerChildren,
          backgroundColor
      } = this.props;

      return (
          <Container style={styles.wrapper}>
              <View style={styles.bg}/>
              <Header/>
              <StepHeader title={title} icon={icon}>{headerChildren}</StepHeader>
              <Container
                  white
                  scroll={scroll}
                  style={{width: '88.75%', alignSelf: 'center'}}
                  backgroundColor={backgroundColor}
              >
                  {/* <KeyboardAvoid> */}
                  {tagline && (
                      <View style={styles.containerText}>
                          <Text style={styles.subtitle}>{tagline}</Text>
                          {error && (
                              <Text style={styles.subtitle}>{error.message}</Text>
                          )}
                      </View>
                  )}
                  <View style={[styles.containerBody, tagline ? styles.bottom : null]}>
                      {children}
                  </View>
                  {/* </KeyboardAvoid> */}
              </Container>
          </Container>
      );
  }
}
