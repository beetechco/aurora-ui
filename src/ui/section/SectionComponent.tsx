import * as React from 'react';
import { Component, IModel, IView } from 'aurora';
import { mergeStyleSets } from '@uifabric/merge-styles';

interface ISectionComponentState {
  commandbar: Component<IModel, IView>;
  content: Component<IModel, IView>;
  title: string;
}

interface ISectionComponentProps {
  commandbar: Component<IModel, IView>;
  content: Component<IModel, IView>;
  id: string;
  theme: any;
  title: string;
}

export class SectionComponent extends React.Component<
  ISectionComponentProps,
  ISectionComponentState
  > {
  constructor(props: ISectionComponentProps) {
    super(props);
    this.state = {
      commandbar: this.props.commandbar,
      content: this.props.content,
      title: this.props.title,
    }
  }

  render() {

    const classNames = getClassNames(this.state, this.props.theme);

    return (
      <div
        className={classNames.container}
        id={`${this.props.id}:Section`}

      >
        <div
          className={classNames.titlebarContainer}
        >
          <div>
            {this.state.title}
          </div>
          <div
            className={classNames.commandbarContainer}
          >
            {
              this.state.commandbar &&
              this.state.commandbar.paint()
            }
          </div>
        </div>
        <div
          className={classNames.contentContainer}
        >
          {
            this.state.content &&
            this.state.content.paint()
          }
        </div>
      </div>
    );
  }
}

export interface ISectionComponentClassNames {
  commandbarContainer: string;
  container: string;
  contentContainer: string;
  titlebarContainer: string;
}

export const getClassNames = (state: ISectionComponentState, theme: any): ISectionComponentClassNames => {
  return mergeStyleSets({
    commandbarContainer: [
      {
        display: 'flex',
        flexBasis: 0,
        flexGrow: 1,
      }
    ],
    container: [
      theme.fonts.normal,
      {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexBasis: 0,
        flexDirection: 'column',
        flexGrow: 1,
      }
    ],
    contentContainer: [
      {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0.5rem',

      }
    ],
    titlebarContainer: [
      {
        alignItems: 'center',
        borderBottomColor: theme.palette.neutralTertiary,
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        display: 'flex',
        height: '1.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      }

    ],
  }
  );
};
