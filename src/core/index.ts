import { htmlAttribute } from '@logically/dom-attribute';
import ripple from '../plugins/ripple';

export const mountEffect = () => {
  htmlAttribute.plugin(ripple);
};
