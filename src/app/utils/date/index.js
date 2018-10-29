import moment from 'moment';

export const daysAgo = date => {
    const str = moment(date).fromNow();
    return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const dateFormat = date => moment(date).format('LL');

export const currentTimeIso = () => moment().toISOString();
