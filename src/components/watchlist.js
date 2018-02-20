import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  fontSize: 10,
  height: 20,
  margin: 5
};

const coins = [
  'Bitcoin (BTC)',
  'Litecoin (LTC)',
  'Ethereum (ETH)',
  'Waltonchain (WTC)',
  'VeChain (VEN)',
  'Bitcoin Cash (BCH)'
];

export class Watchlist extends React.Component {
  render() {
    return (
      <div>
        <h2>Watchlist</h2>
        <AutoComplete
          floatingLabelText="Coin Name"
          filter={AutoComplete.fuzzyFilter}
          dataSource={coins}
          maxSearchResults={5}
        />
        <RaisedButton
          label="Add Coin"
          style={buttonStyle}
          labelStyle={buttonStyle}
        />
      </div>
    );
  }
}

export default Watchlist;
