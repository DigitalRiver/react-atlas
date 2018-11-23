import events from "../../utils/events";

describe("Testing events", () => {
  it("Test getMousePosition() returns object with x and y properties", function() {
    const event = {
      "pageX": 100,
      "pageY": 50
    };

    const expected = {
      "x": 100,
      "y": 50
    };

    let mousePosition = events.getMousePosition(event);
    expect(typeof events.getMousePosition).toBe("function");
    expect(mousePosition).toEqual(expected);
  });

  it("Test getTouchPosition() returns object with x and y properties", function() {
    const event = {
      "touches": [
        {
          "pageX": 100,
          "pageY": 50
        },
        {
          "pageX": 10,
          "pageY": 5
        }
      ]
    };

    const expected = {
      "x": 100,
      "y": 50
    };

    let touchPosition = events.getTouchPosition(event);
    expect(typeof events.getTouchPosition).toBe("function");
    expect(touchPosition).toEqual(expected);
  });

  it("Test pauseEvent() pauses events", function() {
    const event = {
      "stopPropagation": jest.fn(),
      "preventDefault": jest.fn()
    };

    expect(typeof events.pauseEvent).toBe("function");
    events.pauseEvent(event);
    expect(event.returnValue).toBe(false);
    expect(event.cancelBubble).toBe(true);
    expect(event.stopPropagation).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });

  it("Test addEventsToDocument() adds event listeners to document", function() {
    const handleClick = jest.fn();
    const handleFocus = jest.fn();

    const eventMap = {
      "click": handleClick,
      "focus": handleFocus
    };

    expect(typeof events.addEventsToDocument).toBe("function");
    events.addEventsToDocument(eventMap);
    document.dispatchEvent(new MouseEvent("click"));
    expect(handleClick).toBeCalled();
    expect(handleClick).not.toThrow();
  });

  it("Test removeEventsFromDocument() removes event listeners from document", function() {
    let clickCount = 0;

    const handleClick = jest.fn().mockImplementation(() => clickCount++);
    const handleFocus = jest.fn();

    const eventMap = {
      "click": handleClick,
      "focus": handleFocus
    };

    expect(typeof events.removeEventsFromDocument).toBe("function");
    events.addEventsToDocument(eventMap);
    document.dispatchEvent(new MouseEvent("click"));
    expect(handleClick).toBeCalled();
    expect(clickCount).toBe(1);
    events.removeEventsFromDocument(eventMap);
    document.dispatchEvent(new MouseEvent("click"));
    expect(clickCount).toBe(1);
  });

  it("Test targetIsDescendant() returns true when event target is descendant of parent", function() {
    document.body.innerHTML = `
      <div id="parent">
          <div id="target"></div>
      </div>
    `;

    const event = {
      "target": document.getElementById("target")
    };

    const parent = document.getElementById("parent");

    expect(typeof events.targetIsDescendant).toBe("function");
    expect(events.targetIsDescendant(event, parent)).toBe(true);
  });

  it("Test targetIsDescendant() returns false when event target is not descendant of parent", function() {
    document.body.innerHTML = `
      <div id="parent">
          <div id="target"></div>
          <div id="sibling"></div>
      </div>
    `;

    const event = {
      "target": document.getElementById("target")
    };

    const parent = document.getElementById("sibling");

    expect(typeof events.targetIsDescendant).toBe("function");
    expect(events.targetIsDescendant(event, parent)).toBe(false);
  });

  it("Test targetIsDescendant() returns false when event target is null", function() {
    document.body.innerHTML = `
      <div id="parent">
          <div id="target"></div>
          <div id="sibling"></div>
      </div>
    `;

    const event = {
      "target": null
    };

    const parent = document.getElementById("parent");

    expect(typeof events.targetIsDescendant).toBe("function");
    expect(events.targetIsDescendant(event, parent)).toBe(false);
  });
});
