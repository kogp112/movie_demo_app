import * as React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from "./Header";

let container = null;


describe('Header', () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  
  it("should change like button color when favorite button clicked", () => {
    var componentTree = ReactTestUtils.renderIntoDocument(
      <Router>
        <Header />
      </Router>
    );
    expect(componentTree).toMatchSnapshot()
  });
});