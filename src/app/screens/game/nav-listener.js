import {Component} from 'react';

export default class NavListener extends Component {
    componentDidMount() {
        const {navigation} = this.props;
        this.blurListener = navigation.addListener('didBlur', this.onBlur);
        this.focusListener = navigation.addListener('didFocus', this.onFocus);
    }

    onBlur = () => {}

    onFocus = () => {}

    componentWillUnmount() {
        this.blurListener.remove();
        this.focusListener.remove();
    }
}
