"use client"
import { Button } from "@/components/button";
import { ChevronLeftIcon, ChevronRightIcon, StatsIcon } from "@/components/icons";
import { getViewDateRange } from "@/helpers";
import { addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks } from "date-fns";
import Link from "next/link";

export interface CalendarActionProps {
    view: string;
    date: Date;
    setView: (view: string) => void;
    setDate: (date: Date) => void;
}

export default function CalendarActions({ view, setView, date, setDate }: CalendarActionProps) {
    const onToday = () => {
        setDate(new Date());
    }
    const onMonthIncrement = () => {
        setDate(addMonths(date, 1));
    }
    const onMonthDecrement = () => {
        setDate(subMonths(date, 1));
    }

    const onWeekIncrement = () => {
        setDate(addWeeks(date, 1));
    }
    const onWeekDecrement = () => {
        setDate(subWeeks(date, 1));

    }

    const onDayIncrement = () => {
        setDate(addDays(date, 1));

    }
    const onDayDecrement = () => {
        setDate(subDays(date, 1));

    }
    const onIncrement = () => {
        switch (view) {
            case "month":
                onMonthIncrement();
                break;
            case "day":
                onDayIncrement();
                break
            case "week":
                onWeekIncrement();
                break
        }
    }
    const onDecrement = () => {
        switch (view) {
            case "month":
                onMonthDecrement();
                break;
            case "day":
                onDayDecrement();
                break
            case "week":
                onWeekDecrement();
                break
        }
    }
    return (<div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start lg:items-center justify-between gap-2 flex-row flex-wrap">
            <div className="flex gap-6 items-center flex-row flex-wrap">
                <Button variant="outline" onClick={onToday}>Today</Button>
                <div className="flex gap-2 justify-between items-center w-full xs:w-fit">
                    <Button variant="link" onClick={onDecrement}><ChevronLeftIcon /></Button>
                    <h1 className="text-2xl">
                        {getViewDateRange(date, view)}
                    </h1>
                    <Button variant="link" onClick={onIncrement}><ChevronRightIcon /></Button>
                </div>
            </div>
            <div className="flex flex-wrap gap-1 w-full xs:w-fit">
                <select value={view} className="border-gray-200 text-sm focus:border-rose-500 focus:ring-rose-500" onChange={(e) => setView(e.target.value)}>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select>
                <Button variant="outline" as={Link} href={`/meal-plan/stats?view=${view}&date=${format(date, "yyyy-MM-dd")}`}><StatsIcon />Stats</Button>
            </div>
        </div>
    </div>)
}