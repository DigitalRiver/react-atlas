import React from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Tooltip from "../../components/tooltip";
import FaPlus from "react-icons/lib/fa/plus";
import FaBookmark from "react-icons/lib/fa/bookmark"

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <br />
    <br />
    <Tooltip tooltip="Bookmark Tooltip" tooltipDelay={1000}>
      <Button primary><FaBookmark /> Bookmark</Button>
    </Tooltip>
    <Tooltip tooltip="Floating Tooltip" >
      <Button primary><FaPlus /></Button>
    </Tooltip>
    <Tooltip tooltip="Floating can not be shown">
      <Button disabled primary><FaPlus /></Button>
    </Tooltip>
    <br />
    <br />
    <Tooltip tooltip="lorem ipsum..." position="top" label="hello" type="text">
      <Input label="hello" type="text" />
    </Tooltip>
    <p>Lorem ipsum dolor sit amet, <Tooltip tooltip="This is a auto show tooltip" inline><strong>consectetur</strong></Tooltip> adipiscing elit.</p>
  </section>
);

export default TooltipTest;
