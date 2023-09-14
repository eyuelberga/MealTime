import { MonthViewProps, getMealPlanKey, mealTypeBgColor } from "@/components/calendar";
import { RecipeCard } from "@/components/recipe";
import { MEAL_TYPES } from "@/constants";
import { addDays, startOfWeek } from "date-fns";



interface WeekViewProps extends MonthViewProps {
}

const mealTypes = Object.values(MEAL_TYPES);
export function WeekView({ date, mealPlanLookup, onCellClick }: WeekViewProps) {
    const start = startOfWeek(date);
    const dates: { mealPlanKey: string; date: Date }[] = [];
    const getKey = (date: Date) => {
        return getMealPlanKey(date.getFullYear(), date.getMonth(), date.getDate());

    }
    dates.push({ date: start, mealPlanKey: getKey(start) });
    for (let count = 1; count < 7; count++) {
        const date = addDays(start, count);
        dates.push({ date, mealPlanKey: getKey(date) });
    }
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <table className="w-full">
        <thead>
            <tr>
                <th></th>
                {dates.map(({ date }) => (<th key={date.toISOString()}>
                    <p>
                        {weekdays[date.getDay()].substring(0, 3)}
                    </p>
                    {date.getDate()}
                </th>))}
            </tr>
        </thead>
        <tbody>
            {mealTypes.map((mealType) => (
                <tr key={mealType}>
                    <td className={`border-b p-4 border-t border-r w-1/12 sticky left-0 z-10 bg-white`}>
                        <div className="capitalize">
                            {mealType}
                        </div>
                    </td>
                    {dates.map(({ mealPlanKey, date }) => (
                        <td key={mealPlanKey}
                            onClick={() => { onCellClick && onCellClick(date.getDate()) }}
                            className="border hover:bg-gray-50 ">
                            <div className="w-24 h-24 sm:w-52 overflow-hidden">
                                {mealPlanLookup && mealPlanLookup[mealPlanKey] && mealPlanLookup[mealPlanKey].length > 0 && mealPlanLookup[mealPlanKey]
                                    .filter(({ mealType: type }) => type === mealType)
                                    .map((mealPlan) =>
                                    (<RecipeCard
                                        key={mealPlan.id}
                                        compact
                                        bg={mealTypeBgColor[mealPlan.mealType]} {...mealPlan.recipe} />))}
                            </div>
                        </td>))}

                </tr>
            ))}
        </tbody>
    </table>
}