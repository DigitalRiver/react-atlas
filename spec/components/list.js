import React from "react";
import { List, ListItem, ListText } from "../../components/list";
import Hint from '../../components/hint';
import Avatar from '../../components/avatar';
import FaInbox from 'react-icons/lib/fa/inbox';
import FaShare from 'react-icons/lib/fa/share';
import FaTrash from 'react-icons/lib/fa/trash';
import FaBug from 'react-icons/lib/fa/bug';
import FaStar from 'react-icons/lib/fa/star';

const listStyle = {
  display: "inline-block",
  minWidth: 340
};

class ListTest extends React.Component {

  render () {
    return (
      <section>
        <h5>With simple text and icons</h5>
        <p>This list can be used inside a Drawer for a list of options or as navigation.</p>
        <div style={listStyle}>
          <List>
            <ListItem caption="Inbox"><FaInbox /><ListText> Inbox</ListText></ListItem>
            <ListItem caption="Outbox"><FaShare /><ListText> Outbox</ListText></ListItem>
            <ListItem caption="Trash"><FaTrash /><ListText> Trash</ListText></ListItem>
            <ListItem caption="Spam"><FaBug /><ListText> Spam</ListText></ListItem>
          </List>
        </div>

        <h5>Two text lines, avatar and right icon</h5>
        <p>Useful for a list of contacts or similar.</p>
        <div style={listStyle}>
          <h5>Contacts</h5>
          <List>
            <ListItem>
              <Avatar image="https://upload.wikimedia.org/wikipedia/en/6/6f/J.K._Simmons_as_Jameson.gif" />
              <ListText>
                Some Guy
                <Hint> Works at Some Place</Hint>
              </ListText>
              <FaStar/>
            </ListItem>

            <ListItem>
              <Avatar image="http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg" />
              <ListText>
                Other Person
                <Hint> Works at Other Place</Hint>
              </ListText>
              <FaStar/>
            </ListItem>

            <ListItem>
              <Avatar image="https://pbs.twimg.com/profile_images/466831222073991168/XTkBynW_.jpeg" />
              <ListText>
                Chill Girl
                <Hint> Works at Chill Place</Hint>
              </ListText>
              <FaStar/>
            </ListItem>

          </List>
        </div>
      </section>
    );
  }
}

export default ListTest;
