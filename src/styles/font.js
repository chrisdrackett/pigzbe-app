import {Font} from 'expo';

export const loadFont = () => Font.loadAsync({
    'Poppins Regular': require('../../assets/fonts/PoppinsRegular.ttf')
});
