import * as React from 'react';
import { ButtonModel, View, ICommandBarView } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { CommandBarComponent } from './CommandBarComponent';

export class CommandBarView extends View implements ICommandBarView {

  private primaryCommands: ButtonModel[];
  private secondaryCommands: ButtonModel[];

  constructor(id?: string) {
    super(id);
  }

  renderComponent = () => {
    return (
      <ThemeContext.Consumer>
        {
          (theme: any) => {
            return (
              <CommandBarComponent
                id={this.getId()}
                primaryCommands={this.primaryCommands}
                ref={this.getElementReference()}
                secondaryCommands={this.secondaryCommands}
                theme={theme}
              />
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }

  repaint = () => {

  }
  setPrimaryCommands(primaryCommands: ButtonModel[]) {
    this.primaryCommands = primaryCommands;
  }

  setSecondaryCommands(secondaryCommands: ButtonModel[]) {
    this.secondaryCommands = secondaryCommands;
  }

}
