import utils from "../../../react-atlas-core/src/utils/utils";

describe("Testing utilities", () => {
  it("Test getCompName()", function() {
    expect(utils).not.toBe(undefined);

    let comp = { type: { displayName: "Input" } };
    expect(utils.getComponentName(comp)).toBe("Input");

    let comp2 = { type: { displayName: undefined, name: "Input2" } };
    expect(utils.getComponentName(comp2)).toBe("Input2");

    let comp3 = { type: "Input3" };
    expect(utils.getComponentName(comp3)).toBe("Input3");

    let comp4 = {};
    expect(utils.getComponentName(comp4)).toBe(null);

    let comp5 = { type: {} };
    expect(utils.getComponentName(comp5)).toBe(null);
  });
});
