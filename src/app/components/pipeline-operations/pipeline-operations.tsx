import { ImageOperationMetadata } from '@/app/components/list-operations/list-operations.model';
import { OperationCard } from '@/app/components/operation-card/operation-card';
import { ApplyFilters } from '@/core/application/use-cases/apply-filters';
import { blur } from '@/adapters/filters/sharpness-clarity/blur';
import { useImages } from '@/app/components/new/images-context';

export function PipelineOperations({
    operations,
}: {
    operations: ImageOperationMetadata[];
}) {
    const {
        state: { images, setImages },
    } = useImages();
    const applyOperation = (operation: ImageOperationMetadata) => {
        const useCase = new ApplyFilters();
        const imageData = images.map((image) => image.data);
        const res = useCase.apply(imageData, [blur({ value: 85 })]);

        const imageItems = images.map((d, i) => ({
            ...d,
            data: res[i],
        }));
        setImages(imageItems);
    };
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Operations</h2>
            <ul className="flex flex-col gap-2">
                {operations.map((operation, index) => (
                    <li key={index}>
                        <OperationCard
                            operation={operation}
                            onAddAction={(op) => applyOperation(op)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
