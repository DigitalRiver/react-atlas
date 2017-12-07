Switch component allows to define a particular-styled checkbox.

###### Default switch:

    <Switch/>

###### Different sized switches:

    <div>
      <Switch small/>
      <Switch medium/>
      <Switch large/>
    </div>

###### Switch with custom onChange handler:

    <Switch onChange={this.onChangeHandler}/>

###### Multiple switches tied to same behavior (name prop):

    <div>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
    </div>

###### Set other colors for on/off states (hex, rgb, css-valid color name):

    <div>
      <Switch onColor="#00bbaa" offColor="#000000"/>
      <Switch onColor="green" offColor="black"/>
    </div>

###### Disabled or hidden switch:

    <div>
      <Switch disabled/>
      <Switch hidden/>
    </div>

###### Execute method when onChange event occurs:

    function customSwitchChange() {
    	console.info("onChange event!");
    }

    <Switch onChange={this.customSwitchChange}/>

###### Make checks before changing component's state (onbeforechange). It receives a value with current checked state:

    function customSwitchBeforeChange(value) {
        if(!value) {
          let accept = confirm("Do you want to check this?");
          return accept;
    }

        return true;
        }

    <Switch onBeforeChange={this.customSwitchBeforeChange}/>

This method should return true or false, allowing or not the onChange handler to be fired. If undefined, will prevent it.

###### Update switch checked prop

    _handleChangeProps = () => {
      setState({ checked: true });
    };
    <div>
        <Button primary onClick={_handleChangeProps}>Change Props to checked</Button>
        <Switch checked={state.checked} />
    </div>
