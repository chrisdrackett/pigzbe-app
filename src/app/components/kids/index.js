import React, {Component} from 'react';
import Kid from './kid';
import ActionPanel from '../action-panel';

export default class Kids extends Component {

    static defaultProps = {
        kids: []
    }

    render () {
        const {kids, exchange, baseCurrency} = this.props;

        return (
            <ActionPanel
                title="Kids wallets"
                label="Add My Children"
                onAdd={this.props.onAddKids}
                style={{
                    marginTop: 25,
                    marginBottom: 20,
                }}
            >
                {kids.map((kid, i) => (
                    <Kid
                        key={i}
                        {...kid}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                        onSend={this.props.onSend}
                        onDashboard={this.props.onDashboard}
                    />
                ))}
            </ActionPanel>
        );
    }
}
