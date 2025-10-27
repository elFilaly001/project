"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

const presets = [
  { key: "last_30", label: "Last 30 days" },
  { key: "last_7", label: "Last 7 days" },
  { key: "last_14", label: "Last 14 days" },
  { key: "this_month", label: "This month" },
  { key: "last_month", label: "Last month" },
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
];

function presetToRange(key: string) {
  const now = new Date();
  switch (key) {
    case "last_7":
      return { from: subDays(now, 6), to: now };
    case "last_14":
      return { from: subDays(now, 13), to: now };
    case "last_30":
      return { from: subDays(now, 29), to: now };
    case "this_month":
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case "last_month": {
      const prev = new Date(now);
      prev.setMonth(now.getMonth() - 1);
      return { from: startOfMonth(prev), to: endOfMonth(prev) };
    }
    case "today":
      return { from: now, to: now };
    case "yesterday":
      return { from: subDays(now, 1), to: subDays(now, 1) };
    default:
      return { from: undefined, to: undefined };
  }
}

export default function PeriodFilter() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);
  const [preset, setPreset] = useState<string>("last_30");
  const initial = presetToRange("last_30");
  const [from, setFrom] = useState<Date | undefined>(initial.from);
  const [to, setTo] = useState<Date | undefined>(initial.to);
  const [compare, setCompare] = useState(false);
  const [compareFrom, setCompareFrom] = useState<string>("");
  const [compareTo, setCompareTo] = useState<string>("");

  const displayValue = useMemo(() => {
    if (!from && !to) return "";
    if (from && !to) return format(from, "yyyy-MM-dd");
    if (from && to) return `${format(from, "yyyy-MM-dd")} — ${format(to, "yyyy-MM-dd")}`;
    return "";
  }, [from, to]);

  function applyPreset(key: string) {
    setPreset(key);
    const r = presetToRange(key);
    setFrom(r.from as Date | undefined);
    setTo(r.to as Date | undefined);
  }

  function clear() {
    setFrom(undefined);
    setTo(undefined);
    setPreset("");
  }

  const current = new Date();
  const prev = new Date(current);
  prev.setMonth(current.getMonth() - 1);

  useEffect(() => {
    function updateMinWidth() {
      const w = triggerRef.current?.getBoundingClientRect().width;
      if (w) setMinWidthPx(Math.round(w));
    }

    if (open) {
      updateMinWidth();
      window.addEventListener("resize", updateMinWidth);
      return () => window.removeEventListener("resize", updateMinWidth);
    }
  }, [open]);

  return (
    <div className="rounded-lg shadow-sm border bg-white dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-700">
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
          <button title="Filter by period — Select a date range or preset" ref={triggerRef} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors rounded-lg group">
            {/* Icon */}
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
              <CalendarDays className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                By period
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
                {displayValue || "Select a period"}
              </div>
            </div>

            {/* Badge */}
            <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">Period</span>
            {/* Arrow */}
            <svg 
              className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[820px] grid grid-cols-4 gap-4"
          style={minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined}
        >
          {/* Left presets */}
          <div className="col-span-1">
            <RadioGroup
              value={preset}
              onValueChange={(v) => applyPreset(v)}
              className="space-y-2"
            >
              {presets.map((p) => (
                <label key={p.key} className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value={p.key} className="text-purple-500 focus:ring-purple-500" />
                  <span className="text-sm">{p.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
          {/* Middle: calendar (two months) */}
          <div className="col-span-3">
            <Calendar
              mode="range"
              selected={{ from, to }}
              onSelect={(r: any) => {
                setFrom(r?.from ?? undefined);
                setTo(r?.to ?? undefined);
                setPreset("");
              }}
              numberOfMonths={2}
            />

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm">
                <span className="text-slate-500 dark:text-slate-400">Selected: </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {displayValue || "No period selected"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clear}>
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => setOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}