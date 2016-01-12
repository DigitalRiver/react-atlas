# Switch

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

EXAMPLE:
<!-- example -->
```jsx
        <h5>Toggle Switches</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch />

        <h5>Toggle Switch Colors</h5>

        <span>On Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch onColor="black"/>

        <span>Off Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch offColor="black"/>

        <span>Button Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch buttonColor='black'/>

        <h5>Disabled</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch disabled/>

        <h5>Switch sizes</h5>
        <span>Small</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch small/>


        <span>Medium</span>
        <Switch medium checked />

        <span>Large</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch large/>
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`      | `Boolean`   | `false` | If true, the switch will be enabled.|
| `disabled`     | `Boolean`  | `false`  | If true, component will be disabled.|
| `name`         | `String`   |        | The text string used as name of the input.|
| `onColor`      | `String`   | #4cd864| The color of the Switch when state is on.|
| `offColor`     | `String`   | #d8d9db| The color of the Switch when state if off.|
| `buttonColor`  | `String`   |   white| The color of the toggle button.|
