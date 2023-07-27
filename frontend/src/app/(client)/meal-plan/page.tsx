"use client"
import { Card, CardHeader, CardBody } from "@/components/card";
import { format } from "date-fns";
import { Button } from "@/components/button";
import { PlusIcon, StatsIcon } from "@/components/icons";
import Calendar from "./Calendar";
import Link from "next/link";
import CalendarActions from "./CalendarActions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function Page() {
    const searchParams = useSearchParams();
    const initalDate = searchParams && searchParams.get("date");
    const initalView = searchParams && searchParams.get("view");
    const [view, setView] = useState(initalView || "month");
    const [date, setDate] = useState<Date>(initalDate ? new Date(initalDate) : new Date());
    return (
        <Card shadow="lg">
            <CardHeader title='Meal Planner' textSize='3xl' >
                <Button as={Link} href={`/meal-plan/create${view === "day" ? `?date=${format(date, "yyyy-MM-dd")}` : ""}`}><PlusIcon /> Add To Meal Plan</Button>
            </CardHeader>
            <CardBody>
                <CalendarActions view={view} setView={setView} date={date} setDate={setDate} />
                <Calendar view={view} date={date} setView={setView} setDate={setDate} />
            </CardBody>
        </Card>
    );
}