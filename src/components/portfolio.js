import React from 'react';
import Paper from 'material-ui/Paper';
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
  }

  render() {
    let options = topCoinsJson;
    return (
      <div>
        <h3>Portfolio Value:</h3>

        <form>
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
          />
          <RaisedButton
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
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Portfolio;
