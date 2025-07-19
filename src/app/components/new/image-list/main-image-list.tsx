import {
    ImageItem,
    ImagesActionType,
    useImages,
} from '@/app/components/new/images-context';
import { memo, useCallback } from 'react';
import { ImageListCard } from '@/app/components/new/image-list/image-list-card';
import { downloadImageAsync } from '@/app/components/pipeline-operations/pipeline-operations.util';

function MainImageListInternal() {
    console.log('>>> MainImageList');
    const {
        state: { images, selectedImagesIds },
        dispatch,
    } = useImages();

    // // TODO: Implement this action
    const handlePreview = useCallback((image: ImageItem) => {}, []);

    const toggleSelectImage = useCallback(
        (item: ImageItem) =>
            dispatch({
                type: ImagesActionType.ToggleSelection,
                payload: item.id,
            }),
        [dispatch],
    );

    const deleteSelected = useCallback(
        (item: ImageItem) =>
            dispatch({
                type: ImagesActionType.RemoveSelected,
                payload: item.id,
            }),
        [dispatch],
    );

    const downloadImage = useCallback(async (item: ImageItem) => {
        await downloadImageAsync(item);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <ImageListCard
                    selected={selectedImagesIds.has(image.id)}
                    key={image.id}
                    image={image}
                    onCheckedToggle={toggleSelectImage}
                    onDelete={deleteSelected}
                    onDownload={downloadImage}
                    onPreview={handlePreview}
                />
            ))}
        </div>
    );
}

export const MainImageList = memo(MainImageListInternal);
