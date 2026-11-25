
import React, { useState } from 'react';
import { FileEdit, Check, Lock } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { MenuPortal } from '../../../common/MenuPortal';
import { useEditor } from '../../../../../contexts/EditorContext';

export const TrackChangesTool: React.FC = () => {
    const { showToast } = useEditor();
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const [trackingLocked, setTrackingLocked] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

    const handleToggleTracking = (next: boolean) => {
        if (trackingLocked && !next) {
            showToast('Tracking is locked. Unlock tracking before turning it off.', 'warning');
            return;
        }
        setTrackingEnabled(next);
        setActiveMenu(null);
        showToast(next ? 'Track Changes enabled for this session.' : 'Track Changes turned off.', 'info');
    };

    const handleToggleLock = () => {
        const nextLocked = !trackingLocked;
        setTrackingLocked(nextLocked);
        if (nextLocked) setTrackingEnabled(true);
        setActiveMenu(null);
        showToast(nextLocked ? 'Tracking locked on.' : 'Tracking unlocked.', 'info');
    };

    return (
        <div
            className="relative flex h-full"
            onClickCapture={(e) => setTriggerEl(e.currentTarget)}
        >
            <RibbonButton
                icon={FileEdit}
                label="Track Changes"
                active={trackingEnabled}
                onClick={() => setActiveMenu(prev => (prev === 'track_changes' ? null : 'track_changes'))}
                hasArrow
                iconClassName={trackingEnabled ? 'text-amber-600 dark:text-amber-400' : 'text-amber-600 dark:text-amber-400'}
            />
            <MenuPortal
                id="track_changes"
                activeMenu={activeMenu}
                triggerElement={triggerEl}
                closeMenu={() => setActiveMenu(null)}
                width={215}
                title="Track Changes Options"
            >
                <div className="p-1.5 flex flex-col gap-0.5 text-xs">
                    <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={trackingEnabled}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleToggleTracking(!trackingEnabled)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                            trackingEnabled
                                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 font-semibold'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <FileEdit size={14} className="text-amber-600 dark:text-amber-400" />
                            <span>Track Changes</span>
                        </span>
                        {trackingEnabled && <Check size={13} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                    <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={trackingLocked}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleToggleLock}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                            trackingLocked
                                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 font-semibold'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <Lock size={14} className="text-slate-500 dark:text-slate-400" />
                            <span>Lock Tracking</span>
                        </span>
                        {trackingLocked && <Check size={13} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                </div>
            </MenuPortal>
        </div>
    );
};
