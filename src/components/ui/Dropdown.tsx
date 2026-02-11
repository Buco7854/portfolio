"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface DropdownProps {
    trigger: ReactNode | ((isOpen: boolean) => ReactNode);
    children: ReactNode;
    align?: "left" | "right";
    /** Direction d'ouverture du menu: "down" (par défaut) ou "up" */
    direction?: "up" | "down";
    className?: string;
}

export default function Dropdown({
                                     trigger,
                                     children,
                                     align = "right",
                                     direction = "down",
                                     className = "",
                                 }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerContent = typeof trigger === "function" ? trigger(isOpen) : trigger;

    return (
        <div className={`relative inline-block text-left ${className}`} ref={ref}>
            {/* Trigger */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {triggerContent}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute min-w-[10rem] bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden 
            ${align === "right" ? "right-0" : "left-0"}
            ${direction === "up" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex flex-col">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    icon?: ReactNode;
}

export function DropdownItem({
                                 children,
                                 onClick,
                                 isActive = false,
                                 icon,
                             }: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                isActive
                    ? "bg-surface-alt/80 text-accent font-semibold"
                    : "hover:bg-surface-alt text-text"
            }`}
        >
      {icon && <span className={`w-5 flex items-center justify-center text-lg leading-none shrink-0 ${isActive ? "opacity-100" : "opacity-70"}`}>
        {icon}
      </span>}
            <span className="flex-1 truncate">{children}</span>
            {isActive && <span className="text-accent">✓</span>}
        </button>
    );
}