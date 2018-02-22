import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { addCoinToWatchlist, fetchCoins } from '../actions';

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
      watchlist: { name: '' }
    };

    this.onCoinAdd = this.onCoinAdd.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  componentDidMount() {
    this.props.fetchCoins('bitcoin');
  }

  onCoinAdd(event) {
    const watchlist = this.state.watchlist;
    watchlist.name = event.target.value;
    this.setState({ watchlist: watchlist });
  }

  onClickSave() {
    this.props.fetchCoins(this.state.watchlist) &&
      this.props.addCoinToWatchlist(this.state.watchlist);
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

const mapStateToProps = state => ({
  watchlist: state.watchlist
});

export default connect(mapStateToProps, { fetchCoins, addCoinToWatchlist })(
  Watchlist
);
