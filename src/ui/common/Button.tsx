import * as React from 'react';
import { mergeStyleSets } from '@uifabric/merge-styles';

interface IButtonComponentState {
  onlyIcon?: boolean;
}

interface IButtonComponentProps {
  icon: string;
  id: string;
  label: string;
  onClick: Function;
  onlyIcon?: boolean;
  theme: string;
}

class ButtonComponent extends React.Component<
  IButtonComponentProps,
  IButtonComponentState
  > {
  constructor(props: IButtonComponentProps) {
    super(props);
    this.state = {
      onlyIcon: props.onlyIcon
    }
  }

  render() {

    const classNames = getClassNames(this.state, this.props.theme);

    return (
      <button
        id={`${this.props.id}:CommandBar-Command`}
        className={classNames.command}
        onClick={() => this.props.onClick()}
      >
        {
          this.props.icon &&
          <div>
            <i className={`${this.props.icon} ${classNames.commandIcon}`} ></i>
          </div>
        }

        {
          !this.props.onlyIcon &&
          <div>{this.props.label}</div>
        }
      </button>
    );
  }
}

export interface IButtonComponentClassNames {
  command: string;
  commandIcon: string;
}

export const getClassNames = (state: IButtonComponentState, theme: any): IButtonComponentClassNames => {
  return mergeStyleSets({
    command: [
      {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        selectors: {
          ':focus': {
            borderColor: theme.palette.neutralSecondary,
            borderStyle: 'solid',
            borderWidth: '1px',
            outline: 0,
          },
          ':hover': {
            backgroundColor: theme.palette.themeLight,
            borderColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: '1px',
            outline: 0,
          },
        }
      }
    ],
    commandIcon: [
      {
        marginRight: (state.onlyIcon ? '0px' : '5px'),
      }
    ],
  }
  );
};

export {
  ButtonComponent,
}