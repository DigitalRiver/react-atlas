import React from "react";

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
  getSelection(elem) {
    let start, end, rangeElem, clone;

    if (typeof elem.selectionStart !== "undefined") {
      start = elem.selectionStart;
      end = elem.selectionEnd;
    } else {
      try {
        elem.focus();
        rangeElem = elem.createTextRange();
        clone = rangeElem.duplicate();

        rangeElem.moveToBookmark(
          document.selection.createRange().getBookmark()
        );
        clone.setEndPoint("EndToStart", rangeElem);

        start = clone.text.length;
        end = start + rangeElem.text.length;
      } catch (e) {
        /* not focused or not visible */
      }
    }

    return { start, end };
  },
  setSelection(elem, selection) {
    let rangeElem;

    try {
      if (typeof elem.selectionStart !== "undefined") {
        elem.focus();
        elem.setSelectionRange(selection.start, selection.end);
      } else {
        elem.focus();
        rangeElem = elem.createTextRange();
        rangeElem.collapse(true);
        rangeElem.moveStart("character", selection.start);
        rangeElem.moveEnd("character", selection.end - selection.start);
        rangeElem.select();
      }
    } catch (e) {
      /* not focused or not visible */
    }
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
  }
};
