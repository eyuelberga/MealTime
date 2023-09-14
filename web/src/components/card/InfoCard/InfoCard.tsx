export interface InfoCardProps {
    name: string;
    value: any;
}
export function InfoCard({ name, value }: InfoCardProps) {
    return <div
        className="flex flex-col"
    >
        <div className="p-1 md:p-2">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-800">
                        {value}
                    </h3>
                    <p className="font-semibold text-gray-800">{name}</p>

                </div>
            </div>
        </div>
    </div>
}