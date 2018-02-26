import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Watchlist from './watchlist';

const WatchlistCardExpandable = () => (
  <Card>
    <CardHeader
      title="Watchlist"
      subtitle="follow your favorite coins!"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <Watchlist />
    </CardText>
  </Card>
);

export default WatchlistCardExpandable;
