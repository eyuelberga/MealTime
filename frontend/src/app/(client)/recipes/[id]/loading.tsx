import { Card, CardBody } from '@/components/card';

export default function Loading() {

    return (
        <Card className='animate-pulse'>
            <CardBody padding='xl'>
                <div className="grid lg:grid-cols-3 gap-4">
                    <div className='col-span-3'>
                        <h3 className="h-8 w-1/2 bg-gray-200"></h3>
                        <ul className="mt-5 space-y-3">
                            <li className="w-full h-2 bg-gray-200"></li>
                            <li className="w-full h-2 bg-gray-200"></li>
                            <li className="w-full h-2 bg-gray-200"></li>
                            <li className="w-full h-2 bg-gray-200"></li>
                        </ul>
                        <div className="h-64 my-4 bg-gray-200">
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {[...Array(4).keys()].map(key => (<div key={key} className='h-24 bg-gray-200'></div>))}
                        </div>
                    </div>
                    <div className="col-span-3 xl:col-span-1 bg-gray-200 h-64">
                    </div>
                    <div className="col-span-3 xl:col-span-2 bg-gray-200 h-64"></div>
                </div>
            </CardBody>
        </Card>
    );
};
