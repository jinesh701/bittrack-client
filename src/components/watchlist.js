import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { addCoinToWatchlist } from '../actions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

const coins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price_usd: '11569.0',
    price_btc: '1.0',
    volume_usd: '8579800000.0',
    percent_change_1h: '0.5',
    percent_change_24h: '8.71',
    percent_change_7d: '32.43'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price_usd: '951.902',
    price_btc: '0.0829316',
    volume_usd: '2252430000.0',
    percent_change_1h: '0.14',
    percent_change_24h: '2.1',
    percent_change_7d: '11.83'
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price_usd: '1.15004',
    price_btc: '0.00010019',
    volume_usd: '640012000.0',
    percent_change_1h: '0.65',
    percent_change_24h: '1.44',
    percent_change_7d: '8.45'
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    price_usd: '1541.49',
    price_btc: '0.134297',
    volume_usd: '696451000.0',
    percent_change_1h: '0.31',
    percent_change_24h: '2.31',
    percent_change_7d: '23.92'
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    price_usd: '245.132',
    price_btc: '0.0213564',
    volume_usd: '1056420000.0',
    percent_change_1h: '9.46',
    percent_change_24h: '12.55',
    percent_change_7d: '54.76'
  }
];

class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlist: { name: '' }
    };

    this.onCoinAdd = this.onCoinAdd.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onCoinAdd(event) {
    const watchlist = this.state.watchlist;
    watchlist.name = event.target.value;
    this.setState({ watchlist: watchlist });
  }

  onClickSave() {
    this.props.dispatch(addCoinToWatchlist(this.state.watchlist));
  }

  watchlistRow(watchlist, index) {
    return (
      <TableRow key={index}>
        <TableRowColumn>{watchlist.name}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div>
        <h2>Watchlist</h2>
        <input value={this.state.watchlist.name} onChange={this.onCoinAdd} />

        <RaisedButton
          label="Add Coin"
          style={buttonStyle}
          labelStyle={buttonStyle}
          onClick={this.onClickSave}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Price (USD)</TableHeaderColumn>
              <TableHeaderColumn>Price (BTC)</TableHeaderColumn>
              <TableHeaderColumn>Change (1 Hr)</TableHeaderColumn>
              <TableHeaderColumn>Change (24 Hr)</TableHeaderColumn>
              <TableHeaderColumn>Change (7 Day)</TableHeaderColumn>
              <TableHeaderColumn>Volume (24 Hr)</TableHeaderColumn>
              <TableHeaderColumn>Date Added</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{this.props.watchlist.map(this.watchlistRow)}</TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    watchlist: state.watchlist
  };
}

export default connect(mapStateToProps)(Watchlist);
