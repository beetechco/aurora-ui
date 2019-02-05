import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TableView } from '../TableView';
import { TableModel } from 'aurora';
import { testDom } from '../../../setupTests';

describe('constructor', () => {
  let componentModel: TableModel;

  beforeEach(() => {
    componentModel = new TableModel();
  });

  it('should set a random id as default', () => {
    const componentView = new TableView();

    expect(componentView.getId()).toBeDefined();
  });

  it('should set the id passed as argument', () => {
    const id = 'TableId';
    const componentView = new TableView(id);

    expect(componentView.getId()).toBe(id);
  });
});

describe('render component', () => {
  let componentModel: TableModel;

  beforeEach(() => {
    componentModel = new TableModel();
  });

  it('should return a react element', () => {
    const componentView = new TableView();
    const component = componentView.renderComponent();

    expect(React.isValidElement(component)).toBeTruthy();
  });
});

describe('render view', () => {
  let document: Document;
  let componentModel: TableModel;
  let componentView: TableView;

  beforeEach(() => {
    const dom = testDom();
    document = dom.window.document;

    componentModel = new TableModel();
    componentView = new TableView();
  });

  it('should paint a react element', () => {
    const component: React.ReactElement<{}> = componentView.paint();

    ReactDOM.render(
      component,
      document.getElementById('root'),
    );

    expect(React.isValidElement(component)).toBeTruthy();
  });
});