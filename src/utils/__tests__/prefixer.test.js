import prefixer from "../../utils/prefixer";

describe("Testing prefixer", () => {
  it("Test prefixer()", function() {
    const style = {
      "color": "red",
      "transform": "scaleX(0.6)"
    };

    const expectedStyle = {
      color: "red", //eslint-disable-line quote-props
      transform: "scaleX(0.6)", //eslint-disable-line quote-props
      WebkitTransform: "scaleX(0.6)", //eslint-disable-line quote-props
      MsTransform: "scaleX(0.6)" //eslint-disable-line quote-props
    };

    let prefixedStyle = prefixer(style);
    expect(typeof prefixer).toBe("function");
    expect(prefixedStyle).toEqual(expectedStyle);
  });
});
