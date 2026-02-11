import { icons } from 'lucide-react';

interface IconProps {
  value: string;
  className?: string;
}

export const Icon = ({ value, className = 'w-6 h-6' }: IconProps) => {
  if (!value) return null;

  if (value.startsWith('lucide:')) {
    const iconKey = value.split(':')[1];

    // Convert to PascalCase: e.g., "laptop" -> "Laptop"
    const iconNamePascalCase = iconKey.charAt(0).toUpperCase() + iconKey.slice(1);
    const LucideIcon = icons[iconNamePascalCase as keyof typeof icons];

    if (!LucideIcon) {
      console.warn(`Lucide icon "${value}" not found`);
      return null;
    }

    return <LucideIcon className={className} />;
  }

  // Check if the value looks like an SVG string
  if (value.trim().startsWith('<svg')) {
    // Strip width/height from the SVG so it fills the container via CSS
    const normalized = value
      .replace(/\s(width|height)=["'][^"']*["']/gi, '')
      .replace('<svg', '<svg width="100%" height="100%" style="display:block"');

    return (
      <span
        className={className}
        style={{ display: 'inline-flex' }}
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    );
  }

  return <span className={className}>{value}</span>;
};
