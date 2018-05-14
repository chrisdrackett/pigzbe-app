import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import Header from '../header';
import Alert from '../alert';
import styles from './styles';

const BaseView = ({showSettings, navigation, scrollViewStyle, children, error = null}) => (
    <Fragment>
        <Header showSettings={showSettings} navigation={navigation}/>
        <ScrollView style={styles.scrollView} contentContainerStyle={scrollViewStyle}>
            {children}
        </ScrollView>
        <Alert
            error={error}
        />
    </Fragment>
);

export default BaseView;
