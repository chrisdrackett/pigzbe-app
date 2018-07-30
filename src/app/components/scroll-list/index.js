import React from 'react';
import {
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import Loader from '../loader';
import isDesktop from '../../utils/is-desktop';

export default ({
    items,
    loading,
    loaderMessage,
    ItemComponent,
    children
}) => (
    <View style={styles.container}>
        {children}
        {isDesktop ? (
            <ScrollView style={styles.scrollView}>
                {items.map((item, i) => (
                    <ItemComponent key={i} {...item}/>
                ))}
            </ScrollView>
        ) : (
            <FlatList
                data={items.map((item, i) => ({...item, key: String(i)}))}
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
