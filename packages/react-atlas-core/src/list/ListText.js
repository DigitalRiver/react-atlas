import React from 'react';
import { classNames } from '../utils';
import themeable from 'react-themeable';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

/**
 * Used inside `<ListItem>` when the Item has more complex needs for text and elements inside
 */
const ListText = ({className, children, ...props}) => {
  const theme = themeable(props.theme);
  const classes = classNames({
      text: true,
      [`${className}`]: !!className
  });
	return (
		<span {...props} {...theme(1, ...classes)}>
			{children}
		</span>
	)
};

ListText.propTypes = propTypes;

ListText.styleguide = {
  category: 'Lists',
  index: '7.3',
  example:`
<section>
  <h5>Complex ListText example</h5>
  <div style={{
      display: "inline-block",
      minWidth: 340
  }}>
    <h5>Contacts</h5>
    <List>
      <ListItem>
        <Avatar image="jjj.jpg" />
        <ListText>
          Some Guy
          <Hint> Works at Some Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="gates.jpg" />
        <ListText>
          Other Person
          <Hint> Works at Other Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="chillgirl.jpeg" />
        <ListText>
          Chill Girl
          <Hint> Works at Chill Place</Hint>
        </ListText>
      </ListItem>

    </List>
  </div>
</section>
`
};

export default ListText;
