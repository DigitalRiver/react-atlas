/* global VERSION */
import React from 'react';
import App from '../components/app';
import Header from '../components/header';
import Avatar from './components/avatar';
import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import IconMenu from './components/icon_menu';
import Input from './components/input';
import List from './components/list';
import Media from './components/media';
import Menu from './components/menu';
import Progress from './components/progress';
import Radio from './components/radio';
import Snackbar from './components/snackbar';
import Slider from './components/slider';
import Switch from './components/switch';
import Table from './components/table';
import Tabs from './components/tabs';
import Tooltip from './components/tooltip';
import style from './app.css';

const _hrefProject = () => {
  window.href = 'http://react-toolbox';
};

const Root = () => (
  <App className={style.app}>
    <Header fixed flat className={style.header}>
      <h1>React Atlas <small>Spec {VERSION}</small></h1>
    </Header>

    <Autocomplete />
    <Avatar />
    <Button />
    <Card />
    <Checkbox />
    <Dialog />
    <Drawer />
    <Dropdown />
    <IconMenu />
    <Input />
    <List />
    <Media />
    <Menu />
    <Progress />
    <Radio />
    <Slider />
    <Snackbar />
    <Switch />
    <Table />
    <Tabs />
    <Tooltip />
  </App>
);

export default Root;
