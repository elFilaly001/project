"use client";

import React, { useMemo, useState } from "react";
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

  // show previous + current month in the calendar
  const current = new Date();
  const prev = new Date(current);
  prev.setMonth(current.getMonth() - 1);

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm relative">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        By period
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Analyze a specific period or compare two periods
      </p>

      <div className="mt-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left"
            >
              <span className="text-sm text-slate-700 dark:text-slate-200">
                {displayValue || "Select a period"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[820px] grid grid-cols-4 gap-4"
          >
            {/* Left presets */}
            <div className="col-span-1">
              <RadioGroup
                value={preset}
                onValueChange={(v) => applyPreset(v)}
                className="space-y-2"
              >
                {presets.map((p) => (
                  <label key={p.key} className="flex items-center gap-2">
                    <RadioGroupItem value={p.key} />
                    <span className="text-sm">{p.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            {/* Middle: calendar (two months) */}
            <div className="col-span-2">
              <Calendar
                mode="range"
                selected={{ from, to }}
                onSelect={(r: any) => {
                  // r can be undefined or { from, to }
                  setFrom(r?.from ?? undefined);
                  setTo(r?.to ?? undefined);
                  setPreset("");
                }}
                numberOfMonths={2}
                month={prev}
              />

              <div className="mt-2 w-full flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <div className="text-sm font-medium">Preview</div>
                  <div className="text-xs text-slate-500 mt-2">
                    {displayValue || "No period selected"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={clear}>
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-500 text-white"
                    onClick={() => setOpen(false)}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>

          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
