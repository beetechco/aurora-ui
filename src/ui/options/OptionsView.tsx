import * as React from 'react';
import { OptionsModel, View, IOptionsView, Option } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { mergeStyleSets } from '@uifabric/merge-styles';

export class OptionsInputView extends View implements IOptionsView<string> {

  editable: boolean = true;
  options: Option[] = [];
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
                options={this.options}
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

  setOptions(options: Option[]): void {
    this.options = options;
  }

  setValue = (value: string): void => {
    this.value = value;
  }
}

interface IInputComponentState {
  editable: boolean;
  focused: Boolean;
  options: Option[];
  value: string;
}

interface IInputComponentProps {
  editable: boolean;
  id: string;
  onChangeCallback: Function;
  options: Option[];
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
      options: props.options,
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
          <select
            className={classNames.control}
            id={`${this.props.id}:input-control`}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            value={this.state.value}
          >
            {this.state.options && (
              this.state.options.map((option: Option) => {
                return <option value={option.getCode()} key={option.getCode()}> {option.getLabel()}</option>;
              })
            )}
          </select>
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
        maxHeight: '1.2rem',
        minHeight: '1.2rem',
        transition: 'border-color 200ms ease-in-out',
      }
    ],
    control: {
      backgroundColor: 'white',
      border: '0px',
      borderStyle: 'none',
      height: '1.2rem',
      maxHeight: '1.2rem',
      minHeight: '1.2rem',
      selectors: {
        ':focus': {
          outline: 0,
        }
      }
    },
  }
  );
};
