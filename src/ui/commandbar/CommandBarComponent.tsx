import * as React from 'react';
import { ButtonModel } from 'aurora';
import { mergeStyleSets } from '@uifabric/merge-styles';
import { ButtonComponent } from '../common/Button';

interface ICommandBarComponentState {
  primaryCommands: ButtonModel[]
  secondaryCommands: ButtonModel[]
}

interface ICommandBarComponentProps {
  id: string;
  primaryCommands: ButtonModel[]
  secondaryCommands: ButtonModel[]
  theme: string;
}

export class CommandBarComponent extends React.Component<
  ICommandBarComponentProps,
  ICommandBarComponentState
  > {
  constructor(props: ICommandBarComponentProps) {
    super(props);
    this.state = {
      primaryCommands: this.props.primaryCommands,
      secondaryCommands: this.props.secondaryCommands,
    }
  }

  handleOnClick = (buttonModel: ButtonModel) => {
    if (buttonModel && buttonModel.getActionListeners()) {
      buttonModel.getActionListeners().forEach(actionListener => actionListener.actionPerformed());
    }
  };

  render() {

    const classNames = getClassNames(this.state, this.props.theme);

    return (
      <div
        id={`${this.props.id}:CommandBar`}
        className={classNames.container}
      >
        <div
          className={classNames.mainCommands}
        >
          {
            this.state.primaryCommands &&
            this.state.primaryCommands.map((buttonModel: ButtonModel) => {
              return (
                <div
                  className={classNames.commandContainer}>
                  <ButtonComponent
                    icon={buttonModel.getIcon()}
                    id={`${this.props.id}:Button-${buttonModel.getCode()}`}
                    key={`${this.props.id}:Button-${buttonModel.getCode()}`}
                    label={buttonModel.getLabel()}
                    onClick={() => this.handleOnClick(buttonModel)}
                    theme={this.props.theme}
                  />
                </div>
              );
            })
          }
        </div>
        <div
          className={classNames.secondaryCommands}
        >
          {
            this.state.secondaryCommands &&
            this.state.secondaryCommands.map((buttonModel: ButtonModel) => {
              return (
                <div
                  className={classNames.commandContainer}>
                  <ButtonComponent
                    icon={buttonModel.getIcon()}
                    id={`${this.props.id}:Button-${buttonModel.getCode()}`}
                    key={`${this.props.id}:Button-${buttonModel.getCode()}`}
                    label={buttonModel.getLabel()}
                    onClick={() => { }}
                    onlyIcon={buttonModel.getOnlyIcon()}
                    theme={this.props.theme}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export interface ICommandBarComponentClassNames {
  command: string;
  commandContainer: string;
  commandIcon: string;
  container: string;
  mainCommands: string;
  secondaryCommands: string;
}

export const getClassNames = (state: ICommandBarComponentState, theme: any): ICommandBarComponentClassNames => {
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
    commandContainer: [
      {
        height: '100%',
      }
    ],
    commandIcon: [
      {
        marginRight: '5px',
      }
    ],
    container: [
      theme.fonts.small,
      {
        alignItems: 'center',
        backgroundColor: 'transparent',
        display: 'flex',
        flexBasis: 0,
        flexDirection: 'row',
        flexGrow: 1,
        width: '100%',

      }
    ],
    mainCommands: [
      {
        display: 'flex',
        flexBasis: 0,
        flexDirection: 'row',
        flexGrow: 1,
        height: '100%',
      }
    ],
    secondaryCommands: [
      {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }
    ],
  }
  );
};
