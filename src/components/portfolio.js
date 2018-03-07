import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { addToPortfolio } from '../actions/fetch-portfolio';

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

const searchStyle = {
  width: 150
};

const centerStyle = {
  textAlign: 'center'
};

const centerDiv = {
  margin: '0 auto'
};

const formStyle = {
  paddingBottom: 10,
  textAlign: 'center'
};

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: '',
      errorText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (
      this.state.selectValue === '' ||
      this.refs.holdings.input.value === ''
    ) {
      this.setState({ errorText: 'this field is required' });
      return;
    }
    this.setState({ errorText: '' });
    this.props.addToPortfolio(
      this.state.selectValue,
      this.refs.holdings.input.value
    );
    this.refs.holdings.input.value = '';
    this.setState({ selectValue: '' });
  }

  portfolioRow(portfolio, index) {
    return (
      <TableRow key={index}>
        <TableRowColumn width={100}>{portfolio.coinData.name}</TableRowColumn>
        <TableRowColumn width={100}>{portfolio.userHoldings}</TableRowColumn>
        <TableRowColumn width={100}>
          ${portfolio.coinData.price_usd}
        </TableRowColumn>
        <TableRowColumn width={100}>
          ฿{portfolio.coinData.price_btc}
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.coinData.percent_change_1h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.coinData.percent_change_24h}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          {portfolio.coinData.percent_change_7d}%
        </TableRowColumn>
        <TableRowColumn width={100}>
          ${portfolio.coinData['24h_volume_usd']}
        </TableRowColumn>
      </TableRow>
    );
  }

  portfolioValue(portfolio) {
    return portfolio.reduce((acum, item) => {
      acum += item.coinData.price_usd * item.userHoldings;
      return acum;
    }, 0);
  }

  render() {
    let options = topCoinsJson;
    return (
      <div>
        <h3 style={centerStyle}>
          Portfolio Value: ${this.portfolioValue(
            this.props.portfolio
          ).toLocaleString()}
        </h3>

        <form onSubmit={this.handleSubmit} style={formStyle}>
          <Select
            wrapperStyle={{ ...centerDiv, ...searchStyle }}
            options={options}
            simpleValue
            clearable
            searchable
            labelKey="symbol"
            valueKey="id"
            onChange={selectValue => this.setState({ selectValue })}
            value={this.state.selectValue}
            noResultsText="No coin found"
          />
          <TextField
            hintText="Enter the amount owned"
            floatingLabelText="Amount brought"
            type="number"
            ref="holdings"
            errorText={this.state.errorText}
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
          <Table fixedHeader={false}>
            <TableHeader>
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
              </TableRow>
            </TableHeader>
            <TableBody>{this.props.portfolio.map(this.portfolioRow)}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { addToPortfolio })(Portfolio);
