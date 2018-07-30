import React from 'react';
import Payment from './payment';
import ScrollList from '../scroll-list';

export default ({payments}) => (
    <ScrollList
        items={payments}
        ItemComponent={Payment}
    />
);
