Switch component allows to define a particular-styled checkbox.

###### Default switch:

    <Switch/>

###### Different sized switches:

    <Switch small/>
    <Switch medium/>
    <Switch large/>

###### Switch with custom onChange handler:

    <Switch onChange={this.onChangeHandler}/>

###### Multiple switches tied to same behavior (name prop):

    <Switch name="customFeature"/>
    <Switch name="customFeature"/>
    <Switch name="customFeature"/>

###### Set other colors for on/off states (hex, rgb, css-valid color name):

    <Switch onColor="#00bbaa" offColor="#000000"/>
    <Switch onColor="green" offColor="black"/>

###### Disabled or hidden switch:

    <Switch disabled/>
    <Switch hidden/>

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


