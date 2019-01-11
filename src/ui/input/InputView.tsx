import * as React from 'react';
import { InputModel, View, IInputView } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { mergeStyleSets } from '@uifabric/merge-styles';

export class InputView extends View implements IInputView<string> {

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
              id={this.getId()}
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
    this.getElementReference().current.setValue(this.value);
  }

  setOnChangeCallback = (onChangeCallback: Function): void => {
    this.onChangeCallback = onChangeCallback;    
  }

  setValue = (value: string): void => {
    this.value = value;
  }
}

interface IInputComponentState {
  focused: Boolean;
  value: string;  
}

interface IInputComponentProps {
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
      focused: true,
      value: this.props.value 
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
    this.setState({focused:false});
  }

  onFocus = (e: any) => {
    this.setState({focused:true});
  }

  render() {

    const classNames = getClassNames(this.state, this.theme)

    return (
      <div 
        className={classNames.container}
        id={`${this.props.id}:input-root`} 
        >
          <input
            className={classNames.control}
            id={`${this.props.id}:input-control`}
            onBlur={this.onBlur}
            onChange={this.onChange} 
            onFocus={this.onFocus}
            value={this.state.value}
          > 
        </input>
      </div>
    );
  }

  setValue = (value: string): void => {    
    this.setState({value});
  }
}

export interface IInputComponentClassNames {
  container: string;
  control: string;
}

export const getClassNames = (state: IInputComponentState, theme: any): IInputComponentClassNames => {
  return mergeStyleSets({
      container:[
        theme.font,
        {
          border: '1px',
          borderColor: (state.focused ? theme.palette.themePrimary: theme.palette.neutralTertiary),
          borderStyle: 'solid',
          display: 'table',
          transition: 'border-color 200ms ease-in-out',
        }
      ],    
      control:{
        border: '0px',
        borderStyle: 'none',
        selectors:{
          ':focus': {
            outline:0,
          }
        }
      },      
    }
  );
};
