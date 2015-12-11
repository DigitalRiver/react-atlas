import React from 'react';
import Avatar from '../../components/avatar';
import GithubIcon from './github_icon';

const AvatarTest = () => (
  <section>
    <h5>Avatars</h5>
    <p>Provide an image source or object, a font icon, children or a title to use its first letter.</p>
    <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />
    <Avatar title="Nathan" />
    {/* icon beats title */}
    <Avatar title="Nathan" icon={<GithubIcon />} />
    {/* image beats icon */}
    <Avatar icon={<GithubIcon />} image="https://placeimg.com/80/80/animals" />
    {/* image beats title */}
    <Avatar title="Javier" image="https://placeimg.com/80/80/animals"/>
    {/* child beats parameters */}
    <Avatar title="Nathan" image="https://placeimg.com/80/80/animals"><GithubIcon /></Avatar>
    <Avatar title="Nathan" icon={<GithubIcon />}><img src="https://placeimg.com/80/80/animals"/></Avatar>
    {/* child string gets truncated to 1st letter */}
    <Avatar>Nathan</Avatar>
    {/* child should be svg, img, or string */}
    <Avatar><GithubIcon /></Avatar>
  </section>
);

export default AvatarTest;
