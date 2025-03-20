
import { useState, useEffect } from 'react';

interface TransitionOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  initialVisibility?: boolean;
}

export const useTransitionEffect = ({
  duration = 300,
  delay = 0,
  easing = 'ease-out',
  initialVisibility = false,
}: TransitionOptions = {}) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const [shouldRender, setShouldRender] = useState(initialVisibility);

  // Handle showing the element with animation
  const show = () => {
    if (shouldRender) return;
    setShouldRender(true);
    // Delay setting isVisible to allow the DOM to update
    setTimeout(() => setIsVisible(true), 10);
  };

  // Handle hiding the element with animation
  const hide = () => {
    if (!shouldRender) return;
    setIsVisible(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => setShouldRender(false), duration);
  };

  // Toggle visibility
  const toggle = () => (isVisible ? hide() : show());

  // Create style objects for the transitions
  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: 'translateY(10px) scale(0.98)',
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
      transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
    },
    exiting: {
      opacity: 0,
      transform: 'translateY(-10px) scale(0.98)',
      transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
    },
  };

  // Get current style based on visibility state
  const style = isVisible ? transitionStyles.visible : transitionStyles.entering;

  return {
    isVisible,
    shouldRender,
    show,
    hide,
    toggle,
    style,
  };
};
