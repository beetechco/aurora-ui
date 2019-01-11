import { Button, UIRegistry, Input, TabBar } from 'aurora';
import { ThemeContext } from './ui/theme/ThemeContext';
import { ButtonView } from './ui/button/ButtonView';
import { InputView } from './ui/input/InputView';
import { TabBarView } from './ui/tabBar/TabBarView';

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
}

export {
  ThemeContext
};