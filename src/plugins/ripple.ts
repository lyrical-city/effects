import { HTMLAttributePlugin } from '@logically/dom-attribute';
import { elementCalcMouseBaseCoord } from '@logically/dom-calc';

const ripple: HTMLAttributePlugin = {
  /**
   * 涟漪
   */
  name: 'effect-ripple',
  beforeSetAttribute: parent => {
    if (parent.getAttribute('effect-ripple')) return;

    parent.style.position = 'relative';
    parent.style.overflow = 'hidden';

    parent.addEventListener('click', function (e) {
      const element = e.target as HTMLElement;
      if (!element) return;

      /* 计算鼠标在元素位置 */
      const coord = elementCalcMouseBaseCoord(e, parent);

      // 计算鼠标距离元素边框最远距离
      const { width, height } = window.getComputedStyle(parent);
      const max = Math.max(coord.x, coord.y, parseInt(width, 10) - coord.x, parseInt(height, 10) - coord.y);
      const time = 800;

      /* 创建动画 */
      const animation = document.createElement('style');
      const animationKey = `effectRipple_${Number(new Date())}`;

      animation.innerHTML = `@keyframes ${animationKey} {
        to {
          opacity: 0;
          transform: scale(${max * 2.5});
        }
      }`;

      /* 创建波浪元素 */
      const ripple = document.createElement('span');

      ripple.style.position = 'absolute';
      ripple.style.left = `${coord.x}px`;
      ripple.style.top = `${coord.y}px`;
      ripple.style.width = `1px`;
      ripple.style.height = `1px`;
      ripple.style.borderRadius = `100%`;
      ripple.style.backgroundColor = `#fff`;
      ripple.style.opacity = '0.75';
      ripple.style.animation = `${animationKey} ${time}ms forwards`;
      ripple.style.pointerEvents = 'none';
      ripple.style.userSelect = 'none';

      parent.appendChild(animation);
      parent.appendChild(ripple);

      setTimeout(() => {
        parent.removeChild(ripple);
        parent.removeChild(animation);
      }, time);
    });
  }
};

export default ripple;
