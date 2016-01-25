import React from 'react';
import Card from '../../components/card';
import Row from '../../components/row';
import Col from '../../components/col';
import { Button } from '../../components/button';
import style from '../style';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const CardTest = () => (
  <section>
    <h5>Cards</h5>
    <p>You have multiple options for cards. Combine different subcomponents to create your own:</p>
      <Row>
        <Col sm="1/1" md="1/2" lg="1/3">
          <Card className={style.card}>
            <h1>Title Goes Here</h1>
            <p>{dummyText}</p>
            <Button label="Action 1" />
            <Button label="Action 2" />
          </Card>
        </Col>

        <Col sm="1/1" md="1/2" lg="1/3">
          <Card className={style.card}>
            <h1>Title Goes Here</h1>
            <p>{dummyText}</p>
            <Button label="Action 1" />
            <Button label="Action 2" />
          </Card>
        </Col>
        <Col sm="1/1" md="1/2" lg="1/3">
          <Card className={style.card}>
              <h1>Basic Card</h1>
            <h2>You can also use a subtitle like this</h2>
            <p>{dummyText}</p>
          </Card>
        </Col>
      </Row>

  </section>
);

export default CardTest;
