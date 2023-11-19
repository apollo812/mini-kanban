import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import SearchForm from "../views/SearchForm";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

describe("search form component", () => {
  it("should return the input change to updateSearchTerm function", () => {
    const changeFunction = jest.fn();
    act(() => {
      ReactDOM.render(
        <SearchForm searchTerm="giventext" updateSearchTerm={changeFunction} />,
        container
      );
    });
    const searchInput = container.getElementsByTagName("input")[0];
    expect(searchInput.value).toBe("giventext");
    act(() => {
      nativeInputValueSetter.call(searchInput, "updatedtext");
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(changeFunction).toBeCalledWith("updatedtext");
  });
});
