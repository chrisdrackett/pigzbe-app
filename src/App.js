import PixiScreen from './pixi-screen';
import HomeScreen from './home-screen';
import {StackNavigator} from 'react-navigation';

export default StackNavigator({
    Home: {
        screen: HomeScreen
    },
    Pixi: {
        screen: PixiScreen
    }
},
{
    initialRouteName: 'Home'
});
