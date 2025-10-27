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

const presets = [
  { key: "last_30", label: "30 derniers jours" },
  { key: "last_7", label: "7 derniers jours" },
  { key: "last_14", label: "14 derniers jours" },
  { key: "this_month", label: "Ce mois-ci" },
  { key: "last_month", label: "Dernier mois" },
  { key: "today", label: "Aujourd'hui" },
  { key: "yesterday", label: "Hier" },
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

export default function InlineDateRangePicker() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string>("last_30");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [minWidthPx, setMinWidthPx] = useState<number | undefined>(undefined);
  const initial = presetToRange("last_30");
  const [from, setFrom] = useState<Date | undefined>(initial.from);
  const [to, setTo] = useState<Date | undefined>(initial.to);
  const [compare, setCompare] = useState(false);
  const [compareFrom, setCompareFrom] = useState<string>("");
  const [compareTo, setCompareTo] = useState<string>("");

  const displayValue = useMemo(() => {
    if (!from && !to) return "";
    if (from && !to) return format(from, "yyyy-MM-dd");
    if (from && to)
      return `${format(from, "yyyy-MM-dd")} — ${format(to, "yyyy-MM-dd")}`;
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
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
          title="Filter by period — Select a date range or preset"
          ref={triggerRef}
          variant="outline"
          className="w-full justify-between text-left"
          >
            <span className="text-sm text-slate-700 dark:text-slate-200">
              {displayValue || "Sélectionner une période"}
            </span>
            <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">Period</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[820px] grid grid-cols-4 gap-4 relative pb-12"
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
                <label key={p.key} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={p.key}
                    className="text-cyan-500 focus:ring-cyan-500 checked:bg-cyan-500 checked:border-cyan-500"
                  />
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
                setFrom(r?.from ?? undefined);
                setTo(r?.to ?? undefined);
                setPreset("");
              }}
              numberOfMonths={2}
            />
          </div>
          {/* Right: compare checkbox + inputs */}
          <div className="col-span-1 flex flex-col gap-4"></div>
          {/* Action buttons: absolute right bottom, no margin, extra padding in container */}
          <div className="absolute right-4 bottom-2 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clear}>
              Effacer
            </Button>
            <Button
              size="sm"
              className="bg-slate-700 text-white hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              Mettre à jour
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
