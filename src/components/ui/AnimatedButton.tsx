
import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  "relative overflow-hidden transition-all duration-300 ease-in-out-back will-change-transform",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "",
        link: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  className?: string;
  color?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
  asChild?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(({
  children,
  variant = 'default',
  size = 'default',
  onClick,
  className,
  color,
  hoverEffect = 'scale',
  asChild = false,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine the hover effect styles
  const getHoverEffectStyles = () => {
    if (!isHovered) return {};

    switch (hoverEffect) {
      case 'scale':
        return { transform: isPressed ? 'scale(0.97)' : 'scale(1.05)' };
      case 'lift':
        return { transform: isPressed ? 'translateY(0)' : 'translateY(-3px)', boxShadow: '0 7px 14px rgba(0,0,0,0.12)' };
      case 'glow':
        return { boxShadow: `0 0 15px ${color || 'rgba(66, 153, 225, 0.6)'}` };
      case 'none':
      default:
        return {};
    }
  };

  // Custom styles based on the provided color
  const colorStyles = color ? {
    backgroundColor: color,
    borderColor: color,
    color: '#ffffff',
  } : {};

  if (asChild) {
    return (
      <Slot
        ref={ref as any}
        className={cn(buttonStyles({ variant, size }), className)}
        style={{
          ...colorStyles,
          ...getHoverEffectStyles(),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(buttonStyles({ variant, size }), className)}
      style={{
        ...colorStyles,
        ...getHoverEffectStyles(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      asChild={false}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10" />
    </Button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
