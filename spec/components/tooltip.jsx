import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Tooltip from '../../components/tooltip';

const TooltipButton = Tooltip(Button);
const TooltipInput = Tooltip(Input);
const TooltipStrong = Tooltip(({children, ...other}) => <strong {...other}>{children}</strong>);

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <TooltipButton label='Bookmark' icon='bookmark' raised primary tooltip='Bookmark Tooltip' tooltipDelay={1000} />
    <TooltipButton icon='add' floating tooltip='Floating Tooltip test setse tse tse tse t setse' />
    <TooltipButton icon='add' floating disabled tooltip='Floating can not be shown' />
    <TooltipInput tooltip='lorem ipsum...' position='bottom' />
    <p>Lorem ipsum dolor sit amet, <TooltipStrong position='bottom' tooltip='This is a auto show tooltip'>consectetur</TooltipStrong> adipiscing elit.</p>
  </section>
);

export default TooltipTest;
