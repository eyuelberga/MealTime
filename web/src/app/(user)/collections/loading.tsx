import { Card, CardBody } from '@/components/card';
import { CardHeaderPlaceholder } from '@/components/card/Card/CardHeaderPlaceholder';

export function CollectionListPlaceholder() {
    return <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 py-2'>
        {[...Array(10).keys()].map(key => (<div key={key} className='animate-pulse h-24 bg-gray-200'></div>))}
    </div>
}

export default function Loading() {

    return (
        <Card>
            <CardHeaderPlaceholder />
            <CardBody>
                <CollectionListPlaceholder />
            </CardBody>
        </Card>
    );
};
