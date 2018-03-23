/* eslint class-methods-use-this: ["error", { "exceptMethods":["watchlistRow"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TrashIcon from 'material-ui/svg-icons/action/delete';
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
  selectedCurrency,
  deleteWatchlistCoinFromDb
} from '../actions/fetch-watchlist';

import './watchlist.css';

import getWatchlistOptions from '../getWatchlistOptions';

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

const searchStyle = {
  width: 150,
  display: 'inline-flex',
  margin: '0 auto'
};

export class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.watchlistRow = this.watchlistRow.bind(this);

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchSavedWatchlist) {
      this.props.fetchSavedWatchlist();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.fetchCoins(this.props.watchlist.selectedValue);
    this.props.selectedCurrency('');
  }

  handleRemove(id, index) {
    this.props.deleteWatchlistCoinFromDb(id, index);
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
        <TableRowColumn width={100}>
          {formatToUsd.format(watchlist.price_usd)}
        </TableRowColumn>
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
        <TableRowColumn>
          <TrashIcon onClick={() => this.handleRemove(watchlist.id, index)} />
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const options = getWatchlistOptions(this.props.watchlist);
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="search-div">
            <Select
              wrapperStyle={{ ...searchStyle }}
              options={options}
              simpleValue
              required={true}
              clearable
              searchable
              labelKey="symbol"
              valueKey="id"
              onChange={selectValue => this.props.selectedCurrency(selectValue)}
              value={this.props.watchlist.selectedValue}
              placeholder="Select a coin"
              noResultsText="No coin found"
            />

            <div className="button">
              <RaisedButton
                type="submit"
                label="Add Coin"
                style={buttonStyle}
                labelStyle={buttonStyle}
              />
            </div>
          </div>
        </form>

        <Paper>
          <Table
            bodyStyle={{ overflow: 'auto' }}
            fixedHeader={false}
            selectable={false}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
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
                <TableHeaderColumn width={20} />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
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
  selectedCurrency: PropTypes.func,
  deleteWatchlistCoinFromDb: PropTypes.func
};

Watchlist.defaultProps = {
  watchlist: {
    coinData: []
  }
};

const mapStateToProps = state => ({
  watchlist: state.watchlist
});

export default connect(mapStateToProps, {
  fetchCoins,
  fetchSavedWatchlist,
  selectedCurrency,
  deleteWatchlistCoinFromDb
})(Watchlist);
