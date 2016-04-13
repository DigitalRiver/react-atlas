import React from 'react';
import style from './list.css';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

/**
 * Used inside `<ListItem>` when the Item has more complex needs for text and elements inside
 */
const ListText = ({className, children, ...props}) => {
	let classNames = style.text;
	if (className) classNames += ` ${className}`;
	return (
		<span {...props} className={style.text}>
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
        <Avatar image="https://upload.wikimedia.org/wikipedia/en/6/6f/J.K._Simmons_as_Jameson.gif" />
        <ListText>
          Some Guy
          <Hint> Works at Some Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg" />
        <ListText>
          Other Person
          <Hint> Works at Other Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="https://pbs.twimg.com/profile_images/466831222073991168/XTkBynW_.jpeg" />
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
