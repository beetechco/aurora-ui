import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SectionView } from '../SectionView';
import { SectionModel } from 'aurora';
import { testDom } from '../../../setupTests';

describe('constructor', () => {
  let componentModel: SectionModel;

  beforeEach(() => {
    componentModel = new SectionModel();
  });

  it('should set a random id as default', () => {
    const componentView = new SectionView();

    expect(componentView.getId()).toBeDefined();
  });

  it('should set the id passed as argument', () => {
    const id = 'SectionId';
    const componentView = new SectionView(id);

    expect(componentView.getId()).toBe(id);
  });
});

describe('render component', () => {
  let componentModel: SectionModel;

  beforeEach(() => {
    componentModel = new SectionModel();
  });

  it('should return a react element', () => {
    const componentView = new SectionView();
    const component = componentView.renderComponent();

    expect(React.isValidElement(component)).toBeTruthy();
  });
});

describe('render view', () => {
  let document: Document;
  let componentModel: SectionModel;
  let componentView: SectionView;

  beforeEach(() => {
    const dom = testDom();
    document = dom.window.document;

    componentModel = new SectionModel();
    componentView = new SectionView();
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