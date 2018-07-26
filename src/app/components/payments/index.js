import React from 'react';
import Payment from './payment';
import ScrollList from '../scroll-list';
import {strings} from '../../constants';

export default ({payments, loading}) => (
    <ScrollList
        items={payments}
        ItemComponent={Payment}
        loading={loading}
        loaderMessage={strings.transferHistoryLoading}
    />
);
