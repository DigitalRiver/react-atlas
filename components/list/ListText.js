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
        <Avatar image="src/jjj.jpg" />
        <ListText>
          Some Guy
          <Hint> Works at Some Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="src/gates.jpg" />
        <ListText>
          Other Person
          <Hint> Works at Other Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="src/chillgirl.jpeg" />
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
