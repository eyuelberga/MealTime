"use client"
import { Card, CardBody, CardHeader } from "@/components/card";
import { getViewDateRange } from "@/helpers";
import { InfoCard } from "@/components/card/InfoCard";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { Pie, Bar } from 'react-chartjs-2';
import { useRouter, useSearchParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { useAsync } from "@/hooks";
import { MealPlanStatsResponse, stats } from "@/api/mealPlan";
import { useCallback, useEffect, useState } from "react";
import { addDays, endOfDay, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

ChartJS.register(
    autocolors,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title);

const getView = (view: string) => {
    switch (view) {
        case "month":
            return "Monthly";
        case "week":
            return "Weekly";
        case "day":
            return "Daily";
    }
    return ""
}

export default function Page({ }: any) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const view = searchParams?.get("view");
    const date = searchParams?.get("date");
    const title =  view && date?`${getView(view)} Meal Plan Stats (${getViewDateRange(new Date(date), view)})`.trim():"";
    const AxiosClientSide = useAxios();
    const { loading, request: requestFunc, data, error } = useAsync<MealPlanStatsResponse>(async (params: any) => (await stats(params, AxiosClientSide)))
    const request = useCallback(requestFunc, [searchParams]);
    const fmt = (date: Date) => (format(date, 'yyyy-MM-dd'));
    const refetch = useCallback((view: string, date: Date) => {
        let start;
        let end;
        switch (view) {
            case "day":
                start = fmt(date);
                end = fmt(addDays(date, 1));
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
        if (!view || !date) {
            router.replace("/404");
        }
        else {
            refetch(view, new Date(date));
        }
    }, [searchParams, refetch, router]);
    const [nutritionOption, setNutritionOption] = useState<string>("calories");
    return (
        <Card className="min-h-screen" isLoading={loading}>
            <CardHeader title={title} textSize='3xl'>
            </CardHeader>
            {data ? <CardBody>
                {data.total ? <div className="bg-gray-50 p-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 border">
                    <InfoCard name="Meals" value={data.total.meals || 0} />
                    <InfoCard name="Calories" value={data.total.calories || 0} />
                    <InfoCard name="Carbohydrate" value={data.total.carbohydrates || 0} />
                    <InfoCard name="Cholesterol" value={data.total.cholesterol || 0} />
                    <InfoCard name="Fiber" value={data.total.fiber || 0} />
                    <InfoCard name="Protein" value={data.total.protein || 0} />
                    <InfoCard name="Saturated Fat" value={data.total.saturatedFat || 0} />
                    <InfoCard name="Sodium" value={data.total.sodium || 0} />
                    <InfoCard name="Sugar" value={data.total.sugar || 0} />
                    <InfoCard name="Fat" value={data.total.totalFat || 0} />
                </div> : ""}

                <div className="grid lg:grid-cols-6 gap-2 mt-4">
                    <div className="col-span-6 lg:col-span-3">
                        {data.nutritionSumByRecipe && data.nutritionSumByRecipe.length > 0 ? <Card fullHeight>

                            <CardHeader title="Nutrition Breakdown by Meal" textSize='xl'>
                                <select className="select select-bordered" value={nutritionOption} onChange={(e) => setNutritionOption(e.target.value)}>
                                    <option value={undefined} selected disabled hidden>Select an Option</option>
                                    {Object.keys(data.nutritionSumByRecipe[0]).filter((x) => !x.includes("recipe")).map((x) => <option className="capitalize" value={x} key={x}>{x.replace(/([A-Z])/g, ' $1').trim()}</option>)}
                                </select>
                            </CardHeader>
                            <CardBody>
                                {nutritionOption ? <Pie options={{
                                    plugins: {
                                        autocolors: {
                                            mode: 'data'
                                        }
                                    }
                                }} data={{
                                    labels: data.nutritionSumByRecipe.map(({ recipe }: any) => recipe),
                                    datasets: [
                                        {
                                            label: nutritionOption,
                                            data: data.nutritionSumByRecipe.map((data: any) => data[nutritionOption]),
                                        }
                                    ],
                                }} /> : ""}
                            </CardBody>

                        </Card> : ""}
                    </div>

                    <div className="col-span-6 lg:col-span-3">
                        {data.frequencyByMealType && data.frequencyByMealType.length > 0 ? <Card>

                            <CardHeader title="Meal Frequency by Meal Type" textSize='xl'>
                            </CardHeader>
                            <CardBody>
                                <Bar
                                    options={{
                                        plugins: {
                                            autocolors: {
                                                mode: 'data'
                                            }
                                        }
                                    }}
                                    data={{
                                        labels: data.frequencyByMealType.map(({ mealType }) => mealType),
                                        datasets: [
                                            {
                                                label: 'Count',
                                                data: data.frequencyByMealType.map(({ count }) => count),

                                            },
                                        ],
                                    }} />
                            </CardBody>

                        </Card> : ""}
                        {data.frequencyByRecipe && data.frequencyByRecipe.length > 0 ? <Card>

                            <CardHeader title="Meal Frequency by Recipe" textSize='xl'>

                            </CardHeader>
                            <CardBody>
                                <Bar
                                    options={{
                                        plugins: {
                                            autocolors: {
                                                mode: 'data'
                                            }
                                        }
                                    }}
                                    data={{
                                        labels: data.frequencyByRecipe.map(({ recipe }) => recipe),
                                        datasets: [
                                            {
                                                label: 'Count',
                                                data: data.frequencyByRecipe.map(({ count }) => count),


                                            },
                                        ],
                                    }} />
                            </CardBody>

                        </Card> : ""}
                    </div>
                </div>

            </CardBody> : ""
            }
        </Card >
    );
}