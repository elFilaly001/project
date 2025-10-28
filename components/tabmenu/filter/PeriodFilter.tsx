"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
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
  { key: "last_30", labelKey: "social_listening.filters.period.presets.last_30" },
  { key: "last_7", labelKey: "social_listening.filters.period.presets.last_7" },
  { key: "last_14", labelKey: "social_listening.filters.period.presets.last_14" },
  { key: "this_month", labelKey: "social_listening.filters.period.presets.this_month" },
  { key: "last_month", labelKey: "social_listening.filters.period.presets.last_month" },
  { key: "today", labelKey: "social_listening.filters.period.presets.today" },
  { key: "yesterday", labelKey: "social_listening.filters.period.presets.yesterday" },
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
  const t = useTranslations();
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
          <button
            title={t('social_listening.filters.period.title_attr')}
            ref={triggerRef}
            className="inline-flex items-center gap-2 px-2 h-9 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
          >
            {/* Compact badge + caret */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-7 min-w-[72px] px-2 text-sm font-medium rounded-full text-slate-700 dark:text-slate-300">
                {t('social_listening.filters.period.badge')}
              </span>
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
                  <span className="text-sm">{t(p.labelKey)}</span>
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
                <span className="text-slate-500 dark:text-slate-400">{t('social_listening.filters.period.selected_label')} </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {displayValue || t('social_listening.filters.period.no_period_selected')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clear}>
                  {t('social_listening.filters.period.clear')}
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => setOpen(false)}
                >
                  {t('social_listening.filters.period.apply')}
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}