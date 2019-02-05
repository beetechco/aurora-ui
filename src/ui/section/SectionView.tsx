import * as React from 'react';
import { SectionModel, View, ISectionView, Component, IModel, IView } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { SectionComponent } from './SectionComponent';

export class SectionView extends View implements ISectionView {

  private commandbar: Component<IModel, IView>;
  private content: Component<IModel, IView>;
  private title: string;

  constructor(id?: string) {
    super(id);
  }

  renderComponent = () => {
    return (
      <ThemeContext.Consumer>
        {
          (theme: any) => {
            return (
              <SectionComponent
                commandbar={this.commandbar}
                content={this.content}
                id={this.getId()}
                ref={this.getElementReference()}
                theme={theme}
                title={this.title}
              />
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }

  repaint = () => {

  }

  setCommandBar(commandbar: Component<IModel, IView>): void {
    this.commandbar = commandbar;
  }

  setContent(content: Component<IModel, IView>): void {
    this.content = content;
  }

  setTitle(title: string): void {
    this.title = title;
  }

}
