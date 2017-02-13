import React from 'react';
import themeable from 'react-themeable';

/**
 * Used inside `<ListItem>` when the Item has more complex needs for text and elements inside
 */
const ListText = ({className, children, ...props}) => {
	const theme = themeable(props.theme);
	return (
		<span {...props} {...theme(1, 'text')}>
			{children}
		</span>
	)
};

ListText.propTypes = {
	className: React.PropTypes.string,
	children: React.PropTypes.node
};

ListText.defaultProps = {
	theme: {
		'text': true
	}
};

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
