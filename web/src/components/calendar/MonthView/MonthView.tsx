import { format } from "date-fns";
import { MealPlanProps, getMealPlanKey, mealTypeBgColor } from "@/components/calendar";
export interface MonthViewProps {
    date: Date;
    mealPlanLookup: Record<string, MealPlanProps[]>;
    onCellClick?: (id: any) => void;
}

interface TableCell {
    value: number | string | null;
    mealPlans?: MealPlanProps[];
}

const createMonthCalendar = (year: number, month: number, mealPlanLookup: Record<string, MealPlanProps[]>) => {
    const table: (TableCell)[][] = [[]];
    let d = new Date(year, month);
    let currentRow = 0;
    for (let i = 0; i < d.getDay(); i++) {
        table[currentRow].push({ value: null });
    }
    while (d.getMonth() == month) {
        const mealPlanKey = getMealPlanKey(year, month, d.getDate());
        table[currentRow].push({ value: d.getDate(), mealPlans: mealPlanLookup ? mealPlanLookup[mealPlanKey] : [] });
        if (d.getDay() === 6) {
            table.push([]);
            currentRow += 1;
        }
        d.setDate(d.getDate() + 1);
    }
    if (d.getDay() != 0) {
        for (let i = d.getDay(); i < 7; i++) {
            table[currentRow].push({ value: null });
        }
    }
    return table;
}


export function MonthView({ date, mealPlanLookup, onCellClick }: MonthViewProps) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthCalendar = createMonthCalendar(year, month, mealPlanLookup);
    return <table className="w-full table-fixed">
        <thead>
            <tr>

                {weekdays.map((weekday) =>
                    <th key={weekday} className="p-1 border-r xl:text-lg text-xs">
                        <span className="xl:block lg:block md:hidden sm:hidden hidden">
                            {weekday}
                        </span>
                        <span className="xl:hidden lg:hidden md:block sm:block hidden">
                            {weekday.substring(0, 3)}
                        </span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                            {weekday.substring(0, 1)}
                        </span>
                    </th>
                )}
            </tr>
        </thead>
        <tbody>
            {monthCalendar.map((row, index) => (
                <tr key={`row${index}-${format(date, "yyyymmdd")}`}>
                    {row.map(({ value, mealPlans }, i) => (
                        <td key={`row${index}-day-${value}-i${i}-${format(date, "yyyymmdd")}`}
                            onClick={() => onCellClick && value && onCellClick(value)}
                            className={`border px-1 transition duration-500 ease ${!value ? "bg-gray-100" : "hover:bg-gray-50"}`}>

                            <div className="h-auto sm:h-24 flex flex-col overflow-hidden">
                                <div className="text-center">
                                    <span className="text-gray-500">{value}</span>
                                </div>
                                <div className="w-full">
                                    {mealPlans && mealPlans.length > 0 && mealPlans.map(({ mealType, recipe: { name } }) =>
                                        <p key={`row${index}-mt-${mealType}-day${value}-${format(date, "yyyymmdd")}`} className="flex items-baseline space-x-1">
                                            <span className={`${mealTypeBgColor[mealType]} rounded-full w-1 h-1  sm:w-2 sm:h-2`}></span>
                                            <span className="hidden sm:block text-xs truncate">{name}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
}
