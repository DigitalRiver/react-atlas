import React from "react";
import { mount } from "enzyme";
import { Modal } from "../index";
import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <Modal>
          <div>
            <p>
              This is Modal example<br />Any child components could be put here.
            </p>
          </div>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Modal component - Basic tests", () => {
  it("Modal component - test defaults", function() {
    const modal = mount(
      <Modal>
        <div>
          <p>
            This is Modal example<br />Any child components could be put here.
          </p>
        </div>
      </Modal>
    );
    expect(modal.props().active).toEqual(false);
    expect(modal.find("Portal").exists()).toEqual(false);
    expect(modal.props().overlay).toEqual(false);
    expect(modal.props().lockScroll).toEqual(true);
    expect(modal.props().className).toEqual("");
    expect(modal.state().isHaveScrollbar).toEqual(false);
  });

  it("Modal component - test active displays modal when true", function() {
    let active = true;
    const modal = mount(
      <Modal active={active}>
        <div>
          <p>
            This is Modal example<br />Any child components could be put here.
          </p>
        </div>
      </Modal>
    );
    expect(modal.props().active).toEqual(true);
    expect(modal.find("Portal").exists()).toEqual(true);
  });

  it("Modal component - className applies css class", function() {
    const modal = mount(
      <Modal className="myClass anotherClass">
        <div>
          <p>
            This is Modal example<br />Any child components could be put here.
          </p>
        </div>
      </Modal>
    );
    expect(modal.props().className).toEqual("myClass anotherClass");
    expect(modal.find(".myClass").exists()).toBe(true);
    expect(modal.find(".anotherClass").exists()).toBe(true);
  });

  it("Modal component - lockScroll applies properly", function() {
    const modal = mount(
      <Modal active overlay lockScroll={false}>
        <div>
          <p>
            This is Modal example<br />Any child components could be put here.
          </p>
        </div>
      </Modal>
    );
    expect(modal.props().lockScroll).toEqual(false);
    expect(modal.state().isHaveScrollbar).toEqual(false);
  });

  it("Modal component - onEscKeyDown", function() {
    const handleEscKey = jest.fn();
    const modal = mount(
      <Modal active onEscKeyDown={handleEscKey} overlay>
        <p>
          This is Modal example<br />Any child components could be put here.
        </p>
      </Modal>
    );
    expect(modal.props().onEscKeyDown).toEqual(handleEscKey);
    const overlayProps = modal
      .children()
      .first()
      .props().children[0].props;
    expect(overlayProps.onEscKeyDown).toEqual(handleEscKey);
  });

  it("Modal component - onOverlayClick", function() {
    const handleOverlayClick = jest.fn();
    const modal = mount(
      <Modal active onOverlayClick={handleOverlayClick} overlay>
        <p>
          This is Modal example<br />Any child components could be put here.
        </p>
      </Modal>
    );
    expect(modal.props().onOverlayClick).toEqual(handleOverlayClick);
    const overlayProps = modal
      .children()
      .first()
      .props().children[0].props;
    expect(overlayProps.onClick).toEqual(handleOverlayClick);
  });

  it("Modal component - cancelClickHandler", function() {
    const event = {
      "type": "click",
      "stopPropagation": jest.fn()
    };
    const modal = mount(
      <Modal active>
        <p>
          This is Modal example<br />Any child components could be put here.
        </p>
      </Modal>
    );
    modal.instance().cancelClickHandler(event);
    expect(event.stopPropagation).toBeCalled();
  });
});
