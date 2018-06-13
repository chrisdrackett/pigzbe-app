export default function () {
    switch (process.env.NODE_ENV) {
        case 'local':
          return 'http://192.168.1.64:5001';
        case 'ropsten':
        case 'development':
            return 'https://staging.api.pigzbe.com';
        default:
            return 'https://staging.api.pigzbe.com';
            // return 'https://production.api.pigzbe.com';
    }
}
