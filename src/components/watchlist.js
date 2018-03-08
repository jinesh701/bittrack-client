/* eslint class-methods-use-this: ["error", { "exceptMethods":["watchlistRow"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import {
  fetchCoins,
  fetchSavedWatchlist,
  selectedCurrency
} from '../actions/fetch-watchlist';

const topCoinsJson = require('../topCoinsJson.json');

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

const searchStyle = {
  width: 150,
  display: 'inline-flex'
};

const centerDiv = {
  margin: '0 auto'
};

const makeInline = {
  display: 'inline-flex'
};

const searchDivStyle = {
  textAlign: 'center',
  paddingBottom: 10
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
    this.props.fetchCoins(this.props.watchlist.selectedValue);
    this.props.watchlist.selectedValue = '';
  }

  watchlistRow(watchlist, index) {
    const formatToUsd = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });

    return (
      <TableRow key={index}>
        <TableRowColumn width={100}>{watchlist.name}</TableRowColumn>
        <TableRowColumn width={100}>{formatToUsd.format(watchlist.price_usd)}</TableRowColumn>
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
          ${parseInt(watchlist['24h_volume_usd'], 10).toLocaleString()}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const options = topCoinsJson;
    return (
      <div>
        <div style={searchDivStyle}>
          <Select
            wrapperStyle={{ ...centerDiv, ...searchStyle }}
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

          <div style={makeInline}>
            <RaisedButton
              label="Add Coin"
              style={buttonStyle}
              labelStyle={buttonStyle}
              onClick={this.fetchCoin}
            />
          </div>
        </div>

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

Watchlist.propTypes = {
  watchlist: PropTypes.shape({
    coinData: PropTypes.array,
    selectedValue: PropTypes.string
  }),
  fetchCoins: PropTypes.func,
  fetchSavedWatchlist: PropTypes.func,
  selectedCurrency: PropTypes.func
};

const mapStateToProps = state => ({
  watchlist: state.watchlist
});

export default connect(mapStateToProps, {
  fetchCoins,
  fetchSavedWatchlist,
  selectedCurrency
})(Watchlist);
