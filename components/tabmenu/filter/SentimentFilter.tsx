"use client";

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const OPTIONS = [
    { key: "positive", label: "Positive", color: "green" },
    { key: "neutral", label: "Neutral", color: "yellow" },
    { key: "negative", label: "Negative", color: "red" },
];

export default function SentimentFilter() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");

    const selectedLabel = OPTIONS.find((o) => o.key === value)?.label ?? "By sentiment";

    return (
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm relative">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">By sentiment</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Filter by conversation tone</p>

            <div className="mt-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between text-left">
                            <span className="text-sm text-slate-700 dark:text-slate-200">{selectedLabel}</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-48">
                        <div className="flex flex-col gap-3">
                            <div className="text-sm font-medium">Choose sentiment</div>
                            <RadioGroup value={value} onValueChange={(v) => setValue(v)}>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="positive" />
                                    <span className="text-sm">Positive</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="neutral" />
                                    <span className="text-sm">Neutral</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="negative" />
                                    <span className="text-sm">Negative</span>
                                </label>
                            </RadioGroup>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
