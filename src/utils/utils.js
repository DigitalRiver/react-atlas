import React from "react";
import messages from "./messages.js";

export default {
  angleFromPositions(cx, cy, ex, ey) {
    const theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
    return theta * 180 / Math.PI;
  },
  angle360FromPositions(cx, cy, ex, ey) {
    const angle = this.angleFromPositions(cx, cy, ex, ey);
    return angle < 0 ? 360 + angle : angle;
  },
  range(start = 0, stop = null, step = 1) {
    let [_start, _stop] = [0, start];
    if (stop !== null) {
      [_start, _stop] = [start, stop];
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0);
    const range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  },
  round(number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
      const decimalPower = Math.pow(10, decimals);
      return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }
    return NaN;
  },
  getViewport() {
    return {
      "height": window.innerHeight || document.documentElement.offsetHeight,
      "width": window.innerWidth || document.documentElement.offsetWidth
    };
  },
  cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  },
  inputTypeForPrototype(prototype) {
    if (prototype === Date) {
      return "date";
    }
    if (prototype === Number) {
      return "number";
    }
    if (prototype === Boolean) {
      return "checkbox";
    }
    return "text";
  },
  prepareValueForInput(value, type) {
    if (type === "date") {
      return new Date(value).toISOString().slice(0, 10);
    }
    if (type === "checkbox") {
      return value ? "on" : null;
    }
    return value;
  },
  getComponentName(comp) {
    if (comp.type) {
      if (
        Object.keys(comp.type).length === 0 &&
        comp.type.constructor === Object
      ) {
        return null;
      }
      return comp.type.displayName || comp.type.name || comp.type || null;
    }
    return null;
  },
  filter(object, excludes) {
    return Object.keys(object)
      .filter(obj => !excludes[obj])
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
  },
  getRequiredText(reqText) {
    return <span styleName={"error_text"}>{reqText}</span>;
  },
  getErrorMessage(errorMessage) {
    return <div styleName={"error_message"}>{errorMessage}</div>;
  },
  validate(inputValue, validator, propStatus, propMessage, required) {
    let status = null;
    let message = null;
    /* Execute custom validator and change state and error messages accordingly */
    if (typeof validator === "function") {
      let validationObject = validator(inputValue);
      if (typeof validationObject !== "undefined") {
        if (
          typeof validationObject === "boolean" &&
          validationObject === true
        ) {
          status = propStatus;
          message = propMessage;
        } else if (
          typeof validationObject === "boolean" &&
          validationObject === false
        ) {
          status = "error";
        } else {
          status = validationObject.status;
          message = validationObject.message;
        }
      }
    } else if (
      (typeof inputValue === "undefined" || inputValue === "") &&
      (required || typeof required === "string" && required === "")
    ) {
      /* If the field is required, and it has no value, change state and display error message */
      message = messages.requiredMessage;
      status = "error";
    }
    return { "status": status, "message": message };
  }
};
