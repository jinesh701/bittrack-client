import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Portfolio from './portfolio';

const PortfolioCardExpandable = () => (
  <Card>
    <CardHeader
      title="Portfolio"
      subtitle="keep track of your investments!"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <Portfolio />
    </CardText>
  </Card>
);

export default PortfolioCardExpandable;
