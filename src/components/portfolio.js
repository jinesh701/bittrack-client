/* eslint class-methods-use-this: ["error", { "exceptMethods":
["portfolioValueUsd", "portfolioValueBtc", "portfolioRow"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
  fetchSavedPortfolio,
  addToPortfolio,
  selectedPortfolioCurrency,
  addCoinFail,
  deletePortfolioCoinFromDb
} from '../actions/fetch-portfolio';

import './portfolio.css';

import getPortfolioOptions from '../getPortfolioOptions';

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

const searchStyle = {
  width: 150,
  margin: '0 auto'
};

export class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = null;

    this.handleSubmit = this.handleSubmit.bind(this);

    this.portfolioRow = this.portfolioRow.bind(this);

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchSavedPortfolio) {
      this.props.fetchSavedPortfolio();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (
      this.props.portfolio.selectedValue === '' ||
      this.inputRef.input.value === ''
    ) {
      this.props.addCoinFail('this field is required');
      return;
    }
    this.props.addToPortfolio(
      this.props.portfolio.selectedValue,
      this.inputRef.input.value
    );
    this.inputRef.input.value = '';
    this.props.portfolio.errorText = '';
    this.props.portfolio.selectedValue = '';
  }

  handleRemove(id, index) {
    this.props.deletePortfolioCoinFromDb(id, index);
  }

  portfolioRow(portfolio, index) {
    const formatToUsd = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
    return (
      <TableRow key={index}>
        <TableRowColumn width={100}>{portfolio.name}</TableRowColumn>
        <TableRowColumn width={100}>
          {parseInt(portfolio.holdings, 10).toLocaleString()}
        </TableRowColumn>
        <TableRowColumn width={100}>
          {formatToUsd.format(portfolio.price_usd)}
        </TableRowColumn>
        <TableRowColumn width={100}>
          ฿{portfolio.price_btc}
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.percent_change_1h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.percent_change_24h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.percent_change_7d}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          ${parseInt(portfolio['24h_volume_usd'], 10).toLocaleString()}
        </TableRowColumn>
        <TableRowColumn>
        <TrashIcon onClick={() => this.handleRemove(portfolio.id, index)} />
        </TableRowColumn>
      </TableRow>
    );
  }

  portfolioValueUsd(portfolio) {
    return portfolio.reduce((acum, item) => {
      let portfolioValue = acum;
      portfolioValue += item.price_usd * item.holdings;
      return portfolioValue;
    }, 0);
  }

  portfolioValueBtc(portfolio) {
    return portfolio.reduce((acum, item) => {
      let portfolioValue = acum;
      portfolioValue += item.price_btc * item.holdings;
      return portfolioValue;
    }, 0);
  }

  render() {
    const options = getPortfolioOptions(this.props.portfolio);
    return (
      <div>
        <h3 className="center">
          Portfolio Value: ${this.portfolioValueUsd(this.props.portfolio.coinData).toLocaleString()}
          <br />
          <br />
          ฿{this.portfolioValueBtc(this.props.portfolio.coinData)}
        </h3>

        <form onSubmit={this.handleSubmit} className="form">
          <Select
            wrapperStyle={{ ...searchStyle }}
            options={options}
            simpleValue
            clearable
            searchable
            labelKey="symbol"
            valueKey="id"
            required={true}
            onChange={selectValue =>
              this.props.selectedPortfolioCurrency(selectValue)
            }
            value={this.props.portfolio.selectedValue}
            placeholder="Select a coin"
            noResultsText="No coin found"
          />

          <TextField
            hintText="Enter the amount owned"
            floatingLabelText="Amount brought"
            type="number"
            name="holdings"
            id="holdings"
            ref={holdings => {
              this.inputRef = holdings;
            }}
            errorText={this.props.portfolio.errorText}
          />

          <div>
            <RaisedButton
              type="submit"
              label="Add Coin"
              style={buttonStyle}
              labelStyle={buttonStyle}
            />
          </div>
        </form>

        <Paper>
          <Table fixedHeader={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn width={100}>Name</TableHeaderColumn>
                <TableHeaderColumn width={100}>Holdings</TableHeaderColumn>
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
              {this.props.portfolio.coinData.map(this.portfolioRow)}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.shape({
    coinData: PropTypes.array,
    errorText: PropTypes.string,
    selectedValue: PropTypes.string
  }),
  fetchSavedPortfolio: PropTypes.func,
  addCoinFail: PropTypes.func,
  addToPortfolio: PropTypes.func,
  selectedPortfolioCurrency: PropTypes.func,
  deletePortfolioCoinFromDb: PropTypes.func
};

Portfolio.defaultProps = {
  portfolio: {
    coinData: []
  }
};

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, {
  fetchSavedPortfolio,
  addToPortfolio,
  addCoinFail,
  selectedPortfolioCurrency,
  deletePortfolioCoinFromDb
})(Portfolio);
