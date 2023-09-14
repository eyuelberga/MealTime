import { Card, CardBody } from '@/components/card';
import RecipeListLoading from "../../recipes/loading";
export default function Loading() {

    return (
        <>
            <Card className='animate-pulse'>
                <CardBody>
                    <h3 className="h-8 w-1/2 bg-gray-200"></h3>
                    <ul className="mt-5 space-y-3">
                        <li className="w-full h-2 bg-gray-200"></li>
                        <li className="w-full h-2 bg-gray-200"></li>
                    </ul>
                </CardBody>
            </Card>
            <RecipeListLoading />
        </>
    );
};
