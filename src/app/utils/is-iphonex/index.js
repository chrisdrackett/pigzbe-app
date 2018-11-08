import {Platform, Dimensions} from 'react-native';

const heights = [812, 896];

const matchesHeight = heights.some(height =>
    Dimensions.get('window').height === height ||
    Dimensions.get('window').width === height
);

export default Platform.OS === 'ios' && matchesHeight;
