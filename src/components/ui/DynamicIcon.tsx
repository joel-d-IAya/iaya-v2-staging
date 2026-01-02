import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps {
    name: string;
    color: string;
    size?: number;
    className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, color, size = 24, className = "" }) => {
    // @ts-ignore
    const IconComponent = LucideIcons[name] as React.FC<LucideProps>;

    if (!IconComponent) {
        return <LucideIcons.HelpCircle size={size} color={color} className={className} />;
    }

    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{ filter: `drop-shadow(0 0 10px ${color}66)` }}
        >
            <IconComponent size={size} color={color} strokeWidth={1.5} />
        </div>
    );
};

export default DynamicIcon;
