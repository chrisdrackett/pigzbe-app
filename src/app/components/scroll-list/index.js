import React from 'react';
import {
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import isDesktop from '../../utils/is-desktop';

export default ({
    items,
    ItemComponent,
    children,
    ListFooterComponent = null,
    itemProps = {}
}) => (
    <View style={styles.container}>
        {children}
        {isDesktop ? (
            <ScrollView style={styles.scrollView}>
                {items.map((item, i) => (
                    <ItemComponent key={i} {...item} {...itemProps} />
                ))}
            </ScrollView>
        ) : (
            <FlatList
                data={items.map((item, i) => ({...item, key: String(i)}))}
                renderItem={({item}) => <ItemComponent {...item} {...itemProps} />}
                ListFooterComponent={ListFooterComponent}
            />
        )}
    </View>
);
