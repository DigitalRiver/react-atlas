import React from "react";
import { Button } from "../../components/button";

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>

    <p>Regular Buttons</p>
    <Button style={{"margin": "0 5px"}}>Button</Button>
    <Button secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button success style={{"margin": "0 5px"}}>Success</Button>
    <Button warning style={{"margin": "0 5px"}}>Warning</Button>
    <Button danger style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" link style={{"margin": "0 5px"}}>Link</Button>

    <p>Disabled Regular Buttons</p>
    <Button disabled primary style={{"margin": "0 5px"}}>Button</Button>
    <Button disabled secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button disabled success style={{"margin": "0 5px"}}>Success</Button>
    <Button disabled warning style={{"margin": "0 5px"}}>Warning</Button>
    <Button disabled danger style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" disabled link style={{"margin": "0 5px"}}>Link</Button>

    <p>Outline Buttons</p>
    <Button outline primary style={{"margin": "0 5px"}}>Button</Button>
    <Button outline secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button success outline style={{"margin": "0 5px"}}>Success</Button>
    <Button warning outline style={{"margin": "0 5px"}}>Warning</Button>
    <Button danger outline style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" link outline style={{"margin": "0 5px"}}>Link</Button>

    <p>Disabled Outline Buttons</p>
    <Button disabled outline primary style={{"margin": "0 5px"}}>Button</Button>
    <Button disabled secondary outline style={{"margin": "0 5px"}}>Secondary</Button>
    <Button disabled success outline style={{"margin": "0 5px"}}>Success</Button>
    <Button disabled warning outline style={{"margin": "0 5px"}}>Warning</Button>
    <Button disabled danger outline style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" disabled link outline style={{"margin": "0 5px"}}>Link</Button>

    <p>Large Buttons</p>
    <Button large style={{"margin": "0 5px"}}>Button</Button>
    <Button large secondary style={{"margin": "0 5px"}}>Secondary</Button>

    <p>Small Buttons</p>
    <Button small primary style={{"margin": "0 5px"}}>Button</Button>
    <Button small secondary style={{"margin": "0 5px"}}>Secondary</Button>

    <p>Block Level Buttons</p>
    <Button block>Button</Button>
    <Button block secondary>Secondary</Button>
  </section>
);

export default ButtonTest;
