import { Button, UIRegistry } from 'aurora';
import { ThemeContext } from './ui/theme/ThemeContext';
import { ButtonView } from './ui/button/ButtonView';

export const initAuroraUI = () => {
  UIRegistry.register(
    Button.UICODE as string,
    (model: any, id: string) => {
      return new ButtonView(model, id);
    });
}

export {
  ThemeContext
};