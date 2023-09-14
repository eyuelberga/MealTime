import { List, ListHeader, ListItem } from "@/components/list";
import { Card, CardBody } from "@/components/card";
import Image from "next/image";
import { getByID } from '@/api/recipes';
import { formatTimestamp, imgUrl } from "@/helpers";
import { InfoCard } from "@/components/card/InfoCard";
import { RecipeResponse } from "@/api/recipes";
import RecipeActions from "./RecipeActions";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import { addDays, format } from "date-fns";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { notFound } from "next/navigation";
import CollectionActions from "./CollectionActions";

const unit = (type: string) => {
    if (type.includes("calories")) {
        return "kcal";
    }
    if (type.includes("cholesterol") || type.includes("sodium")) {
        return "mg";
    }
    return "g"
}

export default async function Page({ params }: any) {
    const data: RecipeResponse = (await getByID(params.id)).data;
    return (<>
        <Card shadow="lg">
            <CardBody padding="xl">
                <div className="grid lg:grid-cols-3 gap-2">
                    <div className="col-span-3">
                        <div>
                            <div className="space-y-1 lg:space-y-2">
                                <Flex justify="between" align="center">
                                    <h2 className="text-3xl font-bold lg:text-4xl">
                                        {data.name}
                                    </h2>
                                    <RecipeActions data={data} />
                                </Flex>
                                <p className="text-gray-800">
                                    {data.description}
                                </p>
                                <p className="text-gray-500">
                                    Last Updated: {formatTimestamp(data.updatedAt)}
                                </p>
                                {data.source ? <p className="text-gray-500">
                                    Source: <Link href={data.source} target="_blank" className="hover:underline" >{data.source}</Link>
                                </p> : ""}

                                <CollectionActions data={data} />

                                {data.image ? <figure className="w-full">
                                    <Image
                                        className="w-full h-96 object-contain"
                                        src={imgUrl(data.image)}
                                        height={500}
                                        width={500}
                                        alt="Image Description"
                                    />
                                </figure> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">

                        <div className="bg-gray-50 p-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 border">
                            <InfoCard name="Prep Time" value={data.prepTime} />
                            <InfoCard name="Cook Time" value={data.cookTime} />
                            <InfoCard name="Total Time" value={data.prepTime + data.cookTime} />
                            <InfoCard name="Servings" value={data.servings} />
                        </div>

                    </div>

                    {data.ingredients && data.ingredients.length ?
                        <div className="col-span-3 xl:col-span-1">
                            <Card fullHeight>
                                <CardBody padding="sm">
                                    <List>
                                        <ListHeader>
                                            <h2 className="font-semibold text-slate-800">Ingredients</h2>
                                        </ListHeader>
                                        {data.ingredients.map((item: string) => (
                                            <ListItem key={item}>
                                                <p className="text-gray-800">{item}</p>
                                            </ListItem>))}
                                    </List>
                                </CardBody>
                            </Card>
                        </div> : ""}
                    {data.directions && data.directions.length ?
                        <div className="col-span-3 xl:col-span-2">
                            <Card fullHeight>
                                <CardBody padding="sm">
                                    <List>
                                        <ListHeader>
                                            <h2 className="font-semibold text-slate-800">Directions</h2>
                                        </ListHeader>
                                        {data.directions.map((description: string, index: number) => (
                                            <ListItem key={description}>
                                                <div>

                                                    <h3 className="font-semibold text-gray-800">
                                                        Step {index + 1}
                                                    </h3>
                                                    <p className="text-gray-800">{description}</p>

                                                </div>
                                            </ListItem>))}
                                    </List>
                                </CardBody>
                            </Card>

                        </div> : ""}

                    {data.nutrition ?
                        <div className="col-span-3 xl:col-span-1">
                            <Card fullHeight>
                                <CardBody padding="sm">
                                    <List>
                                        <ListHeader>
                                            <h2 className="font-semibold text-slate-800">Nutrition</h2>
                                        </ListHeader>
                                        {Object.entries(data.nutrition).map(([key, val]) => (
                                            <ListItem key={key}>
                                                <p className="text-gray-800"><span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {val} {unit(key)}</p>
                                            </ListItem>))}
                                    </List>
                                </CardBody>
                            </Card>
                        </div> : ""}


                    <div className="col-span-3 xl:col-span-2">
                        <Card fullHeight>
                            <CardBody padding="sm">
                                <List>
                                    <ListHeader>
                                        <h2 className="font-semibold self-center text-slate-800">Upcoming Meals</h2>
                                        <div className="shrink-0 self-end ml-2">
                                            <Button variant='outline' asChild>
                                                <Link href={`/meal-plan/create?recipe=${data.id}`}>
                                                    <CalendarIcon />Add To Plan
                                                </Link>
                                            </Button>
                                        </div>
                                    </ListHeader>
                                    {data.meals && data.meals.length ?
                                        <>
                                            {data.meals.map(({ date, mealType }, index: number) => (
                                                <ListItem key={date}>
                                                    <div>

                                                        <h3 className="text-gray-800">
                                                            {/* TODO - lazy bug fix on mealplan redirect on day back - Fix in the future  */}

                                                            <Button variant="ghost" asChild>
                                                                <Link href={`/meal-plan?view=day&date=${format(addDays(new Date(date), 1), 'yyyy-MM-dd')}`}>
                                                                    {mealType} - on  {new Date(date).toDateString()}
                                                                </Link></Button>


                                                        </h3>
                                                    </div>
                                                </ListItem>))}
                                        </> : <EmptyPlaceholder image={<CalendarIcon className="w-32 h-32 text-rose-200" />} title="No Upcoming Meals" subtitle="Add this recipe to your meal planner" />}
                                </List>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </CardBody>
        </Card>
    </>
    );
}