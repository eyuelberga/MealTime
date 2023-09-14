"use client"
import { Button, Flex, Select } from "@radix-ui/themes";
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
        <Flex justify="between" direction={{ initial: "column", sm: "row" }} gap="2">
            <Flex align="center" gap="4">
                <Button variant="outline" onClick={onToday}>Today</Button>
                <Flex gap="2">
                    <Button variant="ghost" onClick={onDecrement}><ChevronLeftIcon /></Button>
                    <Button variant="ghost" onClick={onIncrement}><ChevronRightIcon /></Button>
                </Flex>
                <h1 className="text-xl">{getViewDateRange(date, view)}</h1>
            </Flex>
            <Flex align="center" gap="2">
                <Select.Root value={view} onValueChange={(e) => setView(e)}>
                    <Select.Trigger />
                    <Select.Content position="popper">
                        <Select.Item value="month">Month</Select.Item>
                        <Select.Item value="week">Week</Select.Item>
                        <Select.Item value="day">Day</Select.Item>
                    </Select.Content>
                </Select.Root>
                <Button asChild variant="outline">
                    <Link href={`/meal-plan/stats?view=${view}&date=${format(date, "yyyy-MM-dd")}`}>
                        <StatsIcon />Stats
                    </Link>
                </Button>

            </Flex>

        </Flex>
    </div>)
}