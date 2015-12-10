import React from 'react';
import GithubIcon from './github_icon';
import { Button } from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>

    <p>Regular Buttons</p>
    <Button label='Button' style={{'margin': '0 5px'}} />
    <Button label='Secondary' secondary style={{'margin': '0 5px'}} />
    <Button label='Success' success style={{'margin': '0 5px'}} />
    <Button label='Warning' warning style={{'margin': '0 5px'}} />
    <Button label='Danger' danger style={{'margin': '0 5px'}} />
    <Button href="#" label='Link' link style={{'margin': '0 5px'}} />

    <p>Disabled Regular Buttons</p>
    <Button label='Button' disabled primary style={{'margin': '0 5px'}} />
    <Button label='Secondary' disabled secondary style={{'margin': '0 5px'}} />
    <Button label='Success' disabled success style={{'margin': '0 5px'}} />
    <Button label='Warning' disabled warning style={{'margin': '0 5px'}} />
    <Button label='Danger' disabled danger style={{'margin': '0 5px'}} />
    <Button href="#" label='Link' disabled link style={{'margin': '0 5px'}} />

    <p>Outline Buttons</p>
    <Button label='Button' outline primary style={{'margin': '0 5px'}} />
    <Button label='Secondary' outline secondary style={{'margin': '0 5px'}} />
    <Button label='Success' success outline style={{'margin': '0 5px'}} />
    <Button label='Warning' warning outline style={{'margin': '0 5px'}} />
    <Button label='Danger' danger outline style={{'margin': '0 5px'}} />
    <Button href="#" label='Link' link outline style={{'margin': '0 5px'}} />

    <p>Disabled Outline Buttons</p>
    <Button label='Button' disabled outline primary style={{'margin': '0 5px'}} />
    <Button label='Secondary' disabled secondary outline style={{'margin': '0 5px'}} />
    <Button label='Success' disabled success outline style={{'margin': '0 5px'}} />
    <Button label='Warning' disabled warning outline style={{'margin': '0 5px'}} />
    <Button label='Danger' disabled danger outline style={{'margin': '0 5px'}} />
    <Button href="#" label='Link' disabled link outline style={{'margin': '0 5px'}} />

    <p>Large Buttons</p>
    <Button label='Button' large style={{'margin': '0 5px'}} />
    <Button label='Secondary' large secondary style={{'margin': '0 5px'}} />

    <p>Small Buttons</p>
    <Button label='Button' small primary style={{'margin': '0 5px'}} />
    <Button label='Secondary' small secondary style={{'margin': '0 5px'}} />

    <p>Block Level Buttons</p>
    <Button label='Button' block  />
    <Button label='Secondary' block secondary />
  </section>
);

export default ButtonTest;
