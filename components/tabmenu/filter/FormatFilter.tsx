"use client";

import React, { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export default function FormatFilter() {
    const [value, setValue] = useState<string>('all');

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">By format</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Video, post, story, comment, article</p>

            <div className="mt-3">
                <Select value={value} onValueChange={(v) => setValue(v)}>
                    <SelectTrigger aria-label="Format">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="comment">Comment</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
