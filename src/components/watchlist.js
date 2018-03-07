import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  fetchCoins,
  fetchSavedWatchlist,
  selectedCurrency
} from '../actions/fetch-watchlist';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const topCoinsJson = require('../topCoinsJson.json');

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCoin = this.fetchCoin.bind(this);
  }

  componentDidMount() {
    this.props.fetchSavedWatchlist();
  }

  fetchCoin() {
    console.log(this.props.watchlist.selectedValue);
    this.props.fetchCoins(this.props.watchlist.selectedValue);
    this.props.watchlist.selectedValue = '';
  }

  watchlistRow(watchlist, index) {
    return (
      <TableRow key={index}>
        <TableRowColumn width={100}>{watchlist.name}</TableRowColumn>
        <TableRowColumn width={100}>${watchlist.price_usd}</TableRowColumn>
        <TableRowColumn width={100}>฿{watchlist.price_btc}</TableRowColumn>
        <TableRowColumn width={100}>
          {watchlist.percent_change_1h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {watchlist.percent_change_24h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {watchlist.percent_change_7d}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          ${watchlist['24h_volume_usd']}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    let options = topCoinsJson;
    return (
      <div>
        <Select
          options={options}
          simpleValue
          clearable
          searchable
          labelKey="symbol"
          valueKey="id"
          onChange={selectValue => this.props.selectedCurrency(selectValue)}
          value={this.props.watchlist.selectedValue}
          noResultsText="No coin found"
        />

        <RaisedButton
          label="Add Coin"
          style={buttonStyle}
          labelStyle={buttonStyle}
          onClick={this.fetchCoin}
        />

        <Paper>
          <Table fixedHeader={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn width={100}>Name</TableHeaderColumn>
                <TableHeaderColumn width={100}>Price (USD)</TableHeaderColumn>
                <TableHeaderColumn width={100}>Price (BTC)</TableHeaderColumn>
                <TableHeaderColumn width={100}>Change (1 Hr)</TableHeaderColumn>
                <TableHeaderColumn width={100}>
                  Change (24 Hr)
                </TableHeaderColumn>
                <TableHeaderColumn width={100}>
                  Change (7 Day)
                </TableHeaderColumn>
                <TableHeaderColumn width={100}>
                  Volume (24 Hr)
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.watchlist.coinData.map(this.watchlistRow)}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.watchlist
});

export default connect(mapStateToProps, {
  fetchCoins,
  fetchSavedWatchlist,
  selectedCurrency
})(Watchlist);
