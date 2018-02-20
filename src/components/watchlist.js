import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

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

const dsConfig = {
  text: 'symbol'
};

export class Watchlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlist: []
    };
  }

  componentDidMount() {
    this.setState({ watchlist: coins });
  }

  render() {
    const cryptowatchlist = this.state.watchlist.map((item, index) => (
      <TableRow key={index}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>${item.price_usd}</TableRowColumn>
        <TableRowColumn>฿{item.price_btc}</TableRowColumn>
        <TableRowColumn>{item.percent_change_1h}%</TableRowColumn>
        <TableRowColumn>{item.percent_change_24h}%</TableRowColumn>
        <TableRowColumn>{item.percent_change_7d}%</TableRowColumn>
        <TableRowColumn>${item.volume_usd}</TableRowColumn>
        <TableRowColumn>2/20/2018</TableRowColumn>
      </TableRow>
    ));

    return (
      <div>
        <h2>Watchlist</h2>
        <AutoComplete
          floatingLabelText="Coin Name"
          filter={AutoComplete.fuzzyFilter}
          dataSourceConfig={dsConfig}
          dataSource={coins}
          maxSearchResults={5}
        />
        <RaisedButton
          label="Add Coin"
          style={buttonStyle}
          labelStyle={buttonStyle}
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
          <TableBody>{cryptowatchlist}</TableBody>
        </Table>
      </div>
    );
  }
}

export default Watchlist;
