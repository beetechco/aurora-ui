import * as React from 'react';
import { InputModel, View, IInputView } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { mergeStyleSets } from '@uifabric/merge-styles';
import { ButtonComponent } from '../common/Button';

export class InputView extends View implements IInputView<string> {

  editable: boolean = true;
  onChangeCallback: Function = null;
  value: string = null;

  constructor(id?: string) {
    super(id);
  }

  renderComponent = () => {
    return (
      <ThemeContext.Consumer>
        {
          (theme: any) => {
            return (
              <InputComponent
                editable={this.editable}
                id={this.getId()}
                key={this.getId()}
                onChangeCallback={this.onChangeCallback}
                ref={this.getElementReference()}
                theme={theme}
                value={this.value}
              >
              </InputComponent>
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }

  repaint = () => {
    if (this.getElementReference() && this.getElementReference().current) {
      this.getElementReference().current.setValue(this.value);
    }
  }

  setEditable(editable: boolean): void {
    this.editable = editable;
  }

  setOnChangeCallback = (onChangeCallback: Function): void => {
    this.onChangeCallback = onChangeCallback;
  }

  setValue = (value: string): void => {
    this.value = value;
  }
}

interface IInputComponentState {
  editable: boolean;
  focused: Boolean;
  value: string;
}

interface IInputComponentProps {
  editable: boolean;
  id: string;
  onChangeCallback: Function;
  theme: any;
  value: string;
}

class InputComponent extends React.Component<
  IInputComponentProps,
  IInputComponentState
  > {

  onChangeCallback: Function;
  theme: any;

  constructor(props: IInputComponentProps) {
    super(props);
    this.state = {
      editable: props.editable,
      focused: false,
      value: props.value
    };
    this.onChangeCallback = this.props.onChangeCallback;
    this.theme = this.props.theme;
  }

  onChange = (e: any) => {
    if (this.onChangeCallback) {
      this.onChangeCallback(e);
    }
  }

  onBlur = (e: any) => {
    this.setState({ focused: false });
  }

  onFocus = (e: any) => {
    this.setState({ focused: true });
  }

  render() {

    const classNames = getClassNames(this.state, this.theme)

    return (
      <div
        className={classNames.container}
        id={`${this.props.id}:input-root`}
      >
        {
          this.state.editable &&
          <div
            className={classNames.controlContainer}
          ><input
            className={classNames.control}
            id={`${this.props.id}:input-control`}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            value={this.state.value}
          >
            </input>
            <ButtonComponent
              icon='fas fa-search'
              id={`${this.props.id}:button-control`}
              key={`${this.props.id}:button-control`}
              label={'Buscar'}
              onClick={() => { alert('buscar'); }}
              onlyIcon={true}
              theme={this.props.theme}
            />
          </div>
        }

        {
          !this.state.editable &&
          <span
            className={classNames.control}
            id={`${this.props.id}:input-control`}
          >
            {this.state.value}
          </span>
        }

      </div>
    );
  }

  setValue = (value: string): void => {
    this.setState({ value });
  }
}

export interface IInputComponentClassNames {
  container: string;
  control: string;
  controlContainer: string;
}

export const getClassNames = (state: IInputComponentState, theme: any): IInputComponentClassNames => {
  let color = (state.focused ? theme.palette.themePrimary : theme.palette.neutralTertiary);

  if (!state.editable) {
    color = 'white';
  }

  return mergeStyleSets({
    container: [
      theme.font,
      {
        border: '1px',
        borderColor: color,
        borderStyle: 'solid',
        display: 'table',
        height: '1.2rem',
        minHeight: '1.2rem',
        transition: 'border-color 200ms ease-in-out',
      }
    ],
    control: {
      border: '0px',
      borderStyle: 'none',
      height: '1.2rem',
      minHeight: '1.2rem',
      padding: '0',
      selectors: {
        ':focus': {
          outline: 0,
        }
      }
    },
    controlContainer: {
      border: '0px',
      borderStyle: 'none',
      display: 'flex',
      height: '1.2rem',
      minHeight: '1.2rem',
      padding: '0',
    },
  }
  );
};
