"use client";
import React from 'react';

interface ExplainButtonProps {
    id?: string;
    title?: string;
    description: React.ReactNode;
}

export default function ExplainButton({ id, title, description }: ExplainButtonProps) {
    // stable id when none provided
    const reactId = React.useId?.() ?? Math.random().toString(36).slice(2, 8);
    const tooltipId = id || `explain-${reactId}`;
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const [align, setAlign] = React.useState<'center' | 'right' | 'left'>('center');
    const [tooltipWidth, setTooltipWidth] = React.useState<number | null>(null);

    // compute alignment on hover/focus and on resize
    const computeAlign = React.useCallback(() => {
        if (typeof window === 'undefined' || !btnRef.current) return;
        const btnRect = btnRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        // desired fixed width (w-80 == 20rem ~= 320px)
        const desiredWidth = 320;
        // if viewport is smaller than desiredWidth + margins, shrink to fit (keep small margin)
        const availWidth = Math.max(0, vw - 16);
        const finalWidth = Math.min(desiredWidth, availWidth);
        setTooltipWidth(finalWidth);

        const centerX = btnRect.left + btnRect.width / 2;
        const leftEdgeIfCentered = centerX - finalWidth / 2;
        const rightEdgeIfCentered = centerX + finalWidth / 2;
        const margin = 8;
        if (leftEdgeIfCentered < margin) {
            setAlign('left');
        } else if (rightEdgeIfCentered > vw - margin) {
            setAlign('right');
        } else {
            setAlign('center');
        }
    }, []);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const onResize = () => computeAlign();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [computeAlign]);

    return (
        <div className="relative group" ref={wrapperRef} onMouseEnter={computeAlign} onFocus={computeAlign}>
            <button
                type="button"
                aria-describedby={tooltipId}
                className="text-gray-400 text-xs leading-none px-2 py-1 rounded hover:bg-gray-50"
                ref={btnRef}
            >
                ?
            </button>

            {/* Popover matches the audience components' style: center-aligned, dark background, fixed width and wraps */}
            <div
                className={
                    `absolute z-20 mt-2 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 w-80 break-words whitespace-normal ` +
                    (align === 'right' ? 'right-0 left-auto -translate-x-0' : align === 'left' ? 'left-0 -translate-x-0' : 'left-1/2 -translate-x-1/2')
                }
                style={{ top: '100%' as const, width: tooltipWidth ?? undefined }}
                role="tooltip"
                id={tooltipId}
            >
                {title ? (
                    <div className="text-sm font-medium mb-1">{title}</div>
                ) : null}
                <div className="text-sm">
                    {description}
                </div>
            </div>
        </div>
    );
}
