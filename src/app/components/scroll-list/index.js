import React from 'react';
import {
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import Loader from '../loader';
import Title from '../title';
import isDesktop from '../../utils/is-desktop';

export default ({
    border,
    title,
    items,
    loading,
    loaderMessage,
    ItemComponent,
    children
}) => (
    <View style={styles.container}>
        {border ? (
            <View style={styles.border}/>
        ) : null}
        {title ? (
            <Title>{title}</Title>
        ) : null}
        {children}
        {isDesktop ? (
            <ScrollView style={styles.scrollView}>
                {items.map((item, i) => (
                    <ItemComponent key={i} {...item}/>
                ))}
            </ScrollView>
        ) : (
            <FlatList
                data={items}
                renderItem={({item}) => <ItemComponent {...item}/>}
            />
        )}
        <Loader
            message={loaderMessage}
            isLoading={loading}
            light
        />
    </View>
);
