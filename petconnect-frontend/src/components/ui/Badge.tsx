import type { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary' | 'secondary';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-secondary-100 text-secondary-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: 'Ok' | 'NeedsRefill' | 'Broken' }) {
  const config = {
    Ok: { variant: 'success' as const, label: 'OK' },
    NeedsRefill: { variant: 'warning' as const, label: 'Needs Refill' },
    Broken: { variant: 'danger' as const, label: 'Broken' },
  };

  const { variant, label } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function ReportTypeBadge({ type }: { type: 'Lost' | 'Found' | 'Spotted' }) {
  const config = {
    Lost: { variant: 'danger' as const, label: 'Lost' },
    Found: { variant: 'success' as const, label: 'Found' },
    Spotted: { variant: 'info' as const, label: 'Spotted' },
  };

  const { variant, label } = config[type];
  return <Badge variant={variant}>{label}</Badge>;
}

export function PetTypeBadge({ type }: { type: 'Dog' | 'Cat' | 'Other' }) {
  const config = {
    Dog: { variant: 'primary' as const, label: '🐕 Dog' },
    Cat: { variant: 'secondary' as const, label: '🐈 Cat' },
    Other: { variant: 'neutral' as const, label: '🐾 Other' },
  };

  const { variant, label } = config[type];
  return <Badge variant={variant}>{label}</Badge>;
}

export function CarePointTypeBadge({ type }: { type: 'Food' | 'Water' | 'Shelter' }) {
  const config = {
    Food: { variant: 'primary' as const, label: '🍖 Food' },
    Water: { variant: 'info' as const, label: '💧 Water' },
    Shelter: { variant: 'secondary' as const, label: '🏠 Shelter' },
  };

  const { variant, label } = config[type];
  return <Badge variant={variant}>{label}</Badge>;
}
