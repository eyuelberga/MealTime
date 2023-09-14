"use client"
import { DayView, MealPlanProps, MonthView, WeekView } from "@/components/calendar";
import { lookup, deleteById, MealType } from "@/api/mealPlan";
import { Card } from "@/components/card";
import { ThrowError } from "@/components/throw-error";
import useAxios from "@/hooks/useAxios";
import { useAsync } from "@/hooks";
import { useCallback, useEffect } from "react";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

export interface CalendarProps {
    view: string;
    date: Date;
    setView: (view: string) => void;
    setDate: (date: Date) => void;
}

export default function Calendar({ view, date, setView, setDate }: CalendarProps) {

    const AxiosClientSide = useAxios();

    const onChange = async (params: any) => (await lookup(params, AxiosClientSide));
    const onRemove = async (id: string) => {
        if (confirm("Are you sure?"))
            await deleteById(id, AxiosClientSide);

    }
    const onCellClick = (day: number) => {
        const oldDate = date;
        setDate(new Date(oldDate.getFullYear(), oldDate.getMonth(), day));
        setView("day")
    }
    const { loading, request: requestFunc, data, error } = useAsync<Record<string, MealPlanProps[]>>(onChange)
    const { loading: deleteLoading, request: deleteRequest } = useAsync(onRemove, { onComplete: () => { refetch(view, date); }, onError: (err) => { alert(err) } })
    const fmt = (date: Date) => (format(date, 'yyyy-MM-dd'));
    const request = useCallback(requestFunc, [view, date]);
    const refetch = useCallback((view: string, date: Date) => {
        let start;
        let end;
        switch (view) {
            case "day":
                start = fmt(date);
                end = fmt(date);
                break;
            case "week":
                start = fmt(startOfWeek(date));
                end = fmt(endOfWeek(date));
                break;
            case "month":
                start = fmt(startOfMonth(date));
                end = fmt(endOfMonth(date));
                break;
        }
        request({ start, end });
    }, [request]);

    useEffect(() => {
        refetch(view, date);
    }, [date, view]);

    return (
        <>
            {error && <ThrowError error={error} />}
            <Card border={false} isLoading={loading || deleteLoading} loadingMessage={deleteLoading ? "Removing meal from plan" : undefined}>
                <div className="overflow-auto" style={{ height: "65vh" }} >
                    {view === "month" && data && <MonthView onCellClick={onCellClick} date={new Date(date)} mealPlanLookup={data} />}
                    {view === "day" && data && <DayView onRemove={deleteRequest} date={new Date(date)} mealPlanLookup={data} />}
                    {view === "week" && data && <WeekView onCellClick={onCellClick} date={new Date(date)} mealPlanLookup={data} />}
                </div>
            </Card>
        </>)

}