
import React from 'react';
import { Bookmark } from 'lucide-react';
import { SmallRibbonButton } from '../common/InsertTools';

export const BookmarkTool: React.FC = () => (
    <SmallRibbonButton icon={Bookmark} label="Bookmark" onClick={() => {}} iconClassName="text-yellow-500 fill-yellow-100" />
);
