## Documentation
We use [react-component-styleguide](https://github.com/NogsMPLS/react-component-styleguide) for documentation.
Using this repo allows us to not have to keep a separate `docs/` directory that could get outdated as components are added/edited/removed/etc.
All we have to do is annotate our components and add a `styleguide` static object to define an example, and documentation will automatically be pulled together using `npm run docs`.

Another advantage we have using this tool, is that all over our components now have an interactive editor and preview area so we can easily mess around with components and even create small protoype views if we wanted to.

You can refer to most any of our current components for examples of what this documentation annotation looks like.
I recommend checking out the [Button](https://github.com/DigitalRiver/react-atlas/blob/master/components/button/Button.js) component for a simple example.

##### Gotchas
If the example you are using to preview the component requires state, you will most likely have to create a container component/class to wrap the example.
Take the [Dialog](https://github.com/DigitalRiver/react-atlas/blob/master/components/dialog/Dialog.js#L54) component for instance:
```javascript
Dialog.styleguide = {
  category: "Layout",
  index: "4.2",
  wrappedExample: true,
  example:`
// Internal Methods {
class App extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };
// }
  render () {
    return (
      <section>
        <h5>Dialog</h5>
        <p>lorem ipsum...</p>
        <Button onClick={this.handleToggle}>Show Dialog</Button>
        <Dialog
          active={this.state.active}
          onOverlayClick={this.handleToggle}
        >
          <h6><strong>Use Google's location service?</strong></h6>
          <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>

          <Button warning onClick={this.handleToggle}>Disagree</Button>
          <Button success onClick={this.handleToggle}>Agree</Button>
        </Dialog>
      </section>
    );
  }
// Mount Component {
}

ReactDOM.render(<App/>, mountNode);
// }
```
There are a few things to notice here.

1. Since we are wrapping this component with a class/component that has state, we must define `styleguide.wrappedExample = true`.
2. We need to remember to render/mount the wrapper component with something like `ReactDOM.render(<App/>, mountNode);`
3. If we want to clean up the editor on the documentation site, we can select code ranges to automatically collapse by using `// {` and `// }`
