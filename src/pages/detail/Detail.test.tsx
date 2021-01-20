import * as React from "react";
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Detail from "./Detail";
import ReactTestUtils from 'react-dom/test-utils';

let container = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
  useRouteMatch: () => ({ url: '/detail/123' }),
}));

describe('Detail', () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  
  it("should change like button color when favorite button clicked", () => {
    var componentTree = ReactTestUtils.renderIntoDocument(<Detail />);
    expect(componentTree).toMatchSnapshot()
  });
  
  it("should change like button color when favorite button clicked", () => {
    act(() => {
      ReactDOM.render(<Detail />, container);
    });
    const button = container.querySelector('button');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(button.textContent).toBe('Unlike');
  });
});