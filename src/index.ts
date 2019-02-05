import { Button, UIRegistry, Input, TabBar, CommandBar, Section, Table } from 'aurora';
import { ThemeContext } from './ui/theme/ThemeContext';
import { ButtonView } from './ui/button/ButtonView';
import { InputView } from './ui/input/InputView';
import { TabBarView } from './ui/tabBar/TabBarView';
import { CommandBarView } from './ui/commandbar/CommandBarView';
import { SectionView } from './ui/section/SectionView';
import { TableView } from './ui/table/TableView';

export const initAuroraUI = () => {
  UIRegistry.register(
    Button.UICODE as string,
    (id: string) => {
      return new ButtonView(id);
    });

  UIRegistry.register(
    Input.UICODE as string,
    (id: string) => {
      return new InputView(id);
    });

  UIRegistry.register(
    TabBar.UICODE as string,
    (id: string) => {
      return new TabBarView(id);
    });


  UIRegistry.register(
    CommandBar.UICODE as string,
    (id: string) => {
      return new CommandBarView(id);
    });

  UIRegistry.register(
    Section.UICODE as string,
    (id: string) => {
      return new SectionView(id);
    });

  UIRegistry.register(
    Table.UICODE as string,
    (id: string) => {
      return new TableView(id);
    });
}

export {
  ThemeContext
};