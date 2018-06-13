import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import Header from '../header';
import styles from './styles';


const BaseView = ({
    showSettings,
    navigation,
    scrollViewStyle,
    children,
}) => (
    <Fragment>
        <Header showSettings={showSettings} navigation={navigation}/>
        <ScrollView bounces={false} style={styles.scrollView} contentContainerStyle={scrollViewStyle}>
            {children}
        </ScrollView>
    </Fragment>
);

export default BaseView;
