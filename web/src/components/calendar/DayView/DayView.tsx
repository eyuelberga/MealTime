import { Button } from "@radix-ui/themes";
import { MonthViewProps, getMealPlanKey, mealTypeBgColor } from "@/components/calendar"
import { EditIcon, OpenIcon, TrashIcon } from "@/components/icons";
import { RecipeCard } from "@/components/recipe";
import { MEAL_TYPES } from "@/constants";
import { imgUrl } from "@/helpers";
import Link from "next/link";
export interface DayViewProps extends MonthViewProps {
    onRemove?: (id: string) => void;
    noHeader?: boolean;

}

const mealTypes = Object.values(MEAL_TYPES);

export function DayView({ date, mealPlanLookup, onRemove, noHeader }: DayViewProps) {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    const mealPlanKey = getMealPlanKey(year, month, day);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <table className="w-full table-auto">
        {noHeader ? "" : <thead>
            <tr>
                <th></th>
                <th>
                    <p>
                        {weekdays[date.getDay()].substring(0, 3)}
                    </p>
                    {day}
                </th>
            </tr>
        </thead>}
        <tbody>

            {mealTypes.map((mealType) => (
                <tr id={mealType} key={mealType}>
                    <td className={`border-b p-2 border-t border-r w-1/12 sticky left-0 z-10 bg-white`}>
                        <div className="capitalize">
                            {mealType}
                        </div>
                    </td>
                    <td className="border p-1 h-36">
                        <div>
                            {mealPlanLookup && mealPlanLookup[mealPlanKey] && mealPlanLookup[mealPlanKey].length > 0 && mealPlanLookup[mealPlanKey]
                                .filter(({ mealType: type }) => type === mealType)
                                .map((mealPlan) =>
                                (<RecipeCard
                                    border={false}
                                    key={mealPlan.id}
                                    horizontal
                                    bg={mealTypeBgColor[mealPlan.mealType]}
                                    {...mealPlan.recipe}
                                    image={mealPlan.recipe.image ? imgUrl(mealPlan.recipe.image) : undefined}
                                >

                                    <Button variant="outline" asChild>
                                        <Link target="_blank" href={`/recipes/${mealPlan.recipe.id}`} >
                                            <OpenIcon /> Open
                                        </Link>
                                    </Button>

                                    <Button variant="outline" asChild >
                                        <Link href={`/meal-plan/edit?id=${mealPlan.id}`} >
                                            <EditIcon /> Edit
                                        </Link>
                                    </Button>
                                    {onRemove && <Button onClick={() => { onRemove(mealPlan.id) }} variant="outline"><TrashIcon /> Remove</Button>}
                                </RecipeCard>))}
                        </div>
                    </td>

                </tr>
            ))}


        </tbody>
    </table>
}

