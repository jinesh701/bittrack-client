import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchCoins } from '../actions';

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

class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoData: this.props.cryptoData
    };

    this.focusTextInput = this.focusTextInput.bind(this);
  }

  watchlistRow(watchlist, index) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;

    return (
      <TableRow key={index}>
        <TableRowColumn>{watchlist.name}</TableRowColumn>
        <TableRowColumn>${watchlist.price_usd}</TableRowColumn>
        <TableRowColumn>฿{watchlist.price_btc}</TableRowColumn>
        <TableRowColumn>{watchlist.percent_change_1h}%</TableRowColumn>
        <TableRowColumn>{watchlist.percent_change_24h}%</TableRowColumn>
        <TableRowColumn>{watchlist.percent_change_7d}%</TableRowColumn>
        <TableRowColumn>test</TableRowColumn>
        <TableRowColumn>{today}</TableRowColumn>
      </TableRow>
    );
  }

  focusTextInput() {
    this.textInput.focus();
    this.props.fetchCoins(this.textInput.value);
    this.textInput.value = '';
  }

  render() {
    return (
      <div>
        <h2>Watchlist</h2>
        <input
          ref={input => {
            this.textInput = input;
          }}
        />

        <RaisedButton
          label="Add Coin"
          style={buttonStyle}
          labelStyle={buttonStyle}
          onClick={this.focusTextInput}
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

const mapStateToProps = state => ({
  watchlist: state.watchlist
});

export default connect(mapStateToProps, { fetchCoins })(Watchlist);
