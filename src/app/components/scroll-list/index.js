import React from 'react';
import {
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import Loader from '../loader';
import isDesktop from '../../utils/is-desktop';

export default ({
    title,
    items,
    loading,
    loaderMessage,
    ItemComponent,
    children
}) => (
    <View style={styles.container}>
        {title ? (
            <Text style={styles.title}>{title}</Text>
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
