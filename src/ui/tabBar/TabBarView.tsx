import * as React from 'react';
import { View, ITabBarView, Tab } from 'aurora';
import { ThemeContext } from '../theme/ThemeContext';
import { mergeStyleSets } from '@uifabric/merge-styles';

export class TabBarView extends View implements ITabBarView {
  private onTabClickCallback: Function = null;
  private selectedTab: string = null;
  private tabs: Tab[] = null;

  constructor(id?: string) {
    super(id);
  }

  setOnTabClickCallback(onTabClickCallback: Function): void {
    this.onTabClickCallback = onTabClickCallback;
  }

  renderComponent = () => {
    return (
      <ThemeContext.Consumer>
        {
          (theme: any) => {
            return (
              <TabBarComponent
                id={this.getId()}
                onTabClickCallback={this.onTabClickCallback}
                ref={this.getElementReference()}
                selectedTab={this.selectedTab}
                tabs={this.tabs}
                theme={theme}
              >
              </TabBarComponent>
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }

  setSelectedTab(selectedTab: string): void {
    this.selectedTab = selectedTab;
  }
  setTabs(tabs: Tab[]): void {
    this.tabs = tabs;
  }

  repaint = () => {
    this.getElementReference().current.setSelectedTab(this.selectedTab);
    this.getElementReference().current.setTabs(this.tabs);
  }

}

interface ITabBarComponentState {
  selectedTab: string;
  tabs: Tab[];
}

interface ITabBarComponentProps {
  id: string;
  onTabClickCallback: Function;
  selectedTab: string;
  tabs: Tab[]
  theme: any;
}

class TabBarComponent extends React.Component<
  ITabBarComponentProps,
  ITabBarComponentState
  > {

  onChangeCallback: Function;
  theme: any;

  constructor(props: ITabBarComponentProps) {
    super(props);
    this.state = {
      selectedTab: props.selectedTab,
      tabs: props.tabs
    };
    this.theme = this.props.theme;
  }
  render() {

    const classNames = getClassNames(this.state, this.theme)

    return (
      <div
        className={classNames.container}
        id={`${this.props.id}:tabbar-root`}
      >
        <div
          className={classNames.bar}
          id={`${this.props.id}:tabbar-bar`}
        >

          {
            this.state.tabs &&
            this.state.tabs.map((tab: Tab) => {
              let classItem = '';
              if (tab.getId() === this.state.selectedTab) {
                classItem = classNames.itemSelected
              }
              return (<button
                id={`${this.props.id}:tabbar-item-${tab.getId()}`}
                className={classNames.item}
                onClick={() => { this.props.onTabClickCallback(tab.getId()) }}
              >
                <div
                  className={classItem}
                >
                  {tab.getTitle()}
                </div>
              </button>);
            })
          }
        </div>
        <div
          className={classNames.content}
        >
          {
            this.renderSelectedTab()
          }
        </div>
      </div>
    );
  }

  renderSelectedTab(): any {
    if (this.state.tabs && this.state.selectedTab) {
      const tabToRender = this.state.tabs.filter((tab: Tab) => tab.getId() === this.state.selectedTab);
      if (tabToRender && tabToRender.length > 0) {
        if (tabToRender[0].getContent()) {
          return tabToRender[0].getContent().paint();
        }
      }
    }
    return null;
  }

  setSelectedTab = (selectedTab: string): void => {
    this.setState({ selectedTab });
  }

  setTabs = (tabs: Tab[]): void => {
    this.setState({ tabs });
  }
}

export interface ITabBarComponentClassNames {
  bar: string;
  container: string;
  content: string;
  item: string;
  itemSelected: string;
}

export const getClassNames = (state: ITabBarComponentState, theme: any): ITabBarComponentClassNames => {
  return mergeStyleSets({
    bar: {
      display: 'flex',
      height: '2rem',
      width: '100%',
    },
    container: [
      {
        display: 'flex',
        flexBasis: 0,
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
      }
    ],
    content: {
      display: 'flex',
      flexBasis: 0,
      flexDirection: 'column',
      flexGrow: 1,
      marginTop: '1rem',
      width: '100%',
    },
    item: {
      alignItems: 'center',
      backgroundColor: theme.palette.white,
      border: '1px',
      borderColor: 'transparent',
      borderStyle: 'solid',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '0',
      paddingLeft: '0.3rem',
      paddingRight: '0.3rem',
      paddingTop: '0.2rem',
      selectors: {
        ':focus': {
          border: '1px',
          borderColor: theme.palette.neutralTertiary,
          borderStyle: 'dashed !important',
          outline: 0,
        },
        ':hover': {
          border: '1px',
          borderColor: theme.palette.black,
          borderStyle: 'solid !important',
          outline: 0,
        },
      }
    },
    itemSelected: {
      borderBottom: '2px',
      borderBottomColor: theme.palette.themePrimary,
      borderBottomStyle: 'solid',
    }
  }
  );
};
