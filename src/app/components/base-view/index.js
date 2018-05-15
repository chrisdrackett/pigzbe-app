import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {ScrollView, NetInfo} from 'react-native';
import Header from '../header';
import Alert from '../alert';
import styles from './styles';
import {connectionState} from '../../actions/check-connection';

class BaseView extends Component {

    componentDidMount() {
        NetInfo.isConnected.getConnectionInfo().then(this._handleConnectionChange).catch(() => {
            this.props.dispatch(connectionState({status: false}));
        });
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

  _handleConnectionChange = (isConnected) => {
      this.props.dispatch(connectionState({status: isConnected}));
  };

  render() {
      const {
          showSettings,
          navigation,
          scrollViewStyle,
          isConnected,
          children,
          error = null
      } = this.props;

      const errorMessage = error || !isConnected ? new Error('Internet is down') : null;

      return (
          <Fragment>
              <Header showSettings={showSettings} navigation={navigation}/>
              <ScrollView style={styles.scrollView} contentContainerStyle={scrollViewStyle}>
                  {children}
              </ScrollView>
              <Alert error={errorMessage} />
          </Fragment>
      );
  }
}

export default connect(state => ({
    isConnected: state.connected.isConnected,
}))(BaseView);
