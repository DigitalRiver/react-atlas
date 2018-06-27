export function verifyPropsDefaultValue(component, expectedProps) {
  //Compares each property value of the component with the expected value

  let result = true;
  let partialResult;

  for (let [compPropName, compPropValue] of expectedProps.entries()) {
    partialResult = component.props()[compPropName] === compPropValue;

    if (!partialResult) {
      console.log(
        "[" +
          compPropName +
          "] -> Got: " +
          component.props()[compPropName] +
          " - expected: " +
          compPropValue
      );
      result = false;
    }
  }
  return result;
}
