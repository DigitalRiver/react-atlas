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