import { Card, CardBody } from '@/components/card';
import { CardHeaderPlaceholder } from '@/components/card/Card/CardHeaderPlaceholder';
import { RecipeCardPlaceholder } from '@/components/recipe/RecipeCardPlaceholder';

export function RecipeListPlaceholder() {
    return <div className='grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 py-2'>
        {[...Array(9).keys()].map(key => (<RecipeCardPlaceholder key={key} />))}
    </div>
}

export default function Loading() {

    return (
        <Card>
            <CardHeaderPlaceholder />
            <CardBody>
                <RecipeListPlaceholder />
            </CardBody>
        </Card>
    );
};
