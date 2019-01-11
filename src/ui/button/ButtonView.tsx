import * as React from 'react';
import { IView, View, ButtonModel, IActionListener } from 'aurora';

export class ButtonView extends View implements IView {
  model: ButtonModel;
  view: any;
  elementRef: React.RefObject<any>;

  constructor(id?: string) {
    super(id);    
  }

  onAction = () => {
    if (this.model.getActionListeners()) {
      this.model
        .getActionListeners()
        .forEach((actionListener: IActionListener) =>
          actionListener.actionPerformed()
        );
    }
  };

  renderComponent = () => {
    return (
      <ButtonComponent
        ref={this.elementRef}
        id={this.getId()}
        label={this.model.getLabel()}
        onAction={this.onAction}
      />
    );
  }

  repaint = () => {
    if (this.elementRef && this.elementRef.current) {
      this.elementRef.current.changeLabel(this.model.getLabel());
    }
  }

  paint = () => {
    if (!this.view) {
      this.elementRef = React.createRef();
      this.view = this.renderComponent();
    }

    return this.view;
  }

}

interface IButtonComponentState {
  label: string;
}

interface IButtonComponentProps {
  id: string;
  label: string;
  onAction: Function;
}

class ButtonComponent extends React.Component<
  IButtonComponentProps,
  IButtonComponentState
  > {
  constructor(props: IButtonComponentProps) {
    super(props);
    this.state = {
      label: this.props.label
    };
  }

  changeLabel = (label: string): void => {
    this.setState({
      label
    });
  };

  private onClick = () => {
    if (this.props.onAction) {
      this.props.onAction();
    }
  };

  render() {
    return (
      <div id={`${this.props.id}:button`} onClick={this.onClick}>
        {this.state.label}
      </div>
    );
  }
}