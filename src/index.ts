import { Button, UIRegistry } from 'aurora';
import { ButtonView } from './ui/button/ButtonView';

export const initAuroraAntd = () => {
  UIRegistry.register(
    Button.UICODE as string,
    (model: any, id: string) => {
      return new ButtonView(model, id);
    });
}