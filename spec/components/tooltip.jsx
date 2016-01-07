import React from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Tooltip from "../../components/tooltip";

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <br />
    <br />
    <Tooltip tooltip="Bookmark Tooltip" tooltipDelay={1000}>
      <Button label="Bookmark" icon="bookmark" primary />
    </Tooltip>
    <Tooltip tooltip="Floating Tooltip test setse tse tse tse t setse" >
      <Button icon="add" primary />
    </Tooltip>
    <Tooltip tooltip="Floating can not be shown">
      <Button icon="add" disabled primary />
    </Tooltip>
    <br />
    <br />
    <Tooltip tooltip="lorem ipsum..." position="top" labelText="hello" type="text">
      <Input labelText="hello" type="text" />
    </Tooltip>
    <p>Lorem ipsum dolor sit amet, <Tooltip tooltip="This is a auto show tooltip" inline><strong>consectetur</strong></Tooltip> adipiscing elit.</p>
  </section>
);

export default TooltipTest;
