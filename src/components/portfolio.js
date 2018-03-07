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

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
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
        <TableRowColumn width={100}>{portfolio.name}</TableRowColumn>
        <TableRowColumn width={100}>{portfolio['0']}</TableRowColumn>
        <TableRowColumn width={100}>${portfolio.price_usd}</TableRowColumn>
        <TableRowColumn width={100}>฿{portfolio.price_btc}</TableRowColumn>
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
          ${portfolio['24h_volume_usd']}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    let options = topCoinsJson;
    return (
      <div>
        <h3>Portfolio Value:</h3>

        <form onSubmit={this.handleSubmit}>
          <Select
            wrapperStyle={searchStyle}
            options={options}
            simpleValue
            clearable
            searchable
            maxHeight={100}
            labelKey="symbol"
            valueKey="id"
            onChange={selectValue => this.setState({ selectValue })}
            value={this.state.selectValue}
            noResultsText="No coin found"
          />
          <TextField
            hintText="Enter the amount owned"
            floatingLabelText="Amount brought"
            ref="holdings"
          />
          <RaisedButton
            type="submit"
            label="Add Coin"
            style={buttonStyle}
            labelStyle={buttonStyle}
          />
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
