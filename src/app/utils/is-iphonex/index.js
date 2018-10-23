import {Platform, Dimensions} from 'react-native';

const H = 812;

export default Platform.OS === 'ios' && (Dimensions.get('window').height === H || Dimensions.get('window').width === H);
