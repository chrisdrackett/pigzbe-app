export default function () {
    switch (process.env.NODE_ENV) {
        case 'development':
            return 'https://staging.api.pigzbe.com';
        default:
            return 'https://production.api.pigzbe.com';
    }
}
