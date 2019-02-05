import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CommandBarView } from '../CommandBarView';
import { CommandBarModel } from 'aurora';
import { testDom } from '../../../setupTests';

describe('constructor', () => {
  let componentModel: CommandBarModel;

  beforeEach(() => {
    componentModel = new CommandBarModel();
  });

  it('should set a random id as default', () => {
    const componentView = new CommandBarView();

    expect(componentView.getId()).toBeDefined();
  });

  it('should set the id passed as argument', () => {
    const id = 'CommandBarId';
    const componentView = new CommandBarView(id);

    expect(componentView.getId()).toBe(id);
  });
});

describe('render component', () => {
  let componentModel: CommandBarModel;

  beforeEach(() => {
    componentModel = new CommandBarModel();
  });

  it('should return a react element', () => {
    const componentView = new CommandBarView();
    const component = componentView.renderComponent();

    expect(React.isValidElement(component)).toBeTruthy();
  });
});

describe('render view', () => {
  let document: Document;
  let componentModel: CommandBarModel;
  let componentView: CommandBarView;

  beforeEach(() => {
    const dom = testDom();
    document = dom.window.document;

    componentModel = new CommandBarModel();
    componentView = new CommandBarView();
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