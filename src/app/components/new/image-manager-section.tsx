'use client';
import { memo, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon } from 'lucide-react';
import {
    ImageItem,
    ImagesActionType,
    useImages,
    useImageSelection,
    useImagesSub,
} from './images-context';
// import { ImagePreviewDialog } from './image-preview-dialog';
import { UploadImageArea } from '@/app/components/new/upload-area/upload-image-area';
import { MainImageList } from '@/app/components/new/image-list/main-image-list';
import { ImageListActions } from '@/app/components/new/image-list/image-list-actions';
import { UploadImageDragArea } from '@/app/components/new/upload-area/upload-image-drag-area';
import { filesToImageDataAsync } from '@/app/components/pipeline-operations/pipeline-operations.util';

function ImageManagerSection() {
    console.log('>>>> ImageManagerSection rendered');
    const { dispatch } = useImages();
    const { images, hasImages } = useImagesSub();
    const { allSelected, hasSelectedImages } = useImageSelection();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            // Clear existing images first
            dispatch({ type: ImagesActionType.ClearImages });

            const fileNames = acceptedFiles.map((file) => file.name);
            const imageData = await filesToImageDataAsync(acceptedFiles);
            const newImages: ImageItem[] = fileNames.map((name, index) => ({
                id: `${name}-${Date.now()}`,
                data: imageData[index],
                preview: imageData[index],
                selected: false,
                name,
            }));

            dispatch({
                type: ImagesActionType.AddImages,
                payload: newImages,
            });
        },
        [dispatch],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop,
    });

    const handleSelectAllToggle = useCallback(() => {
        dispatch({ type: ImagesActionType.SelectAll });
    }, [dispatch]);

    const handleDeleteAllSelectedPress = useCallback(() => {
        dispatch({ type: ImagesActionType.RemoveAllSelected });
    }, [dispatch]);

    // TODO: get filters from the state
    const handleProcessPress = useCallback(() => {
        // const images = state.images.map((i) => i.data);
        // const useCase = new ApplyFilters();
        // const result = useCase.apply(images, []);
    }, []);

    const imageListActionsMemoized = useMemo(
        () =>
            hasImages && (
                <ImageListActions
                    onProcessPress={handleProcessPress}
                    allSelected={allSelected}
                    hasSelectedImages={hasSelectedImages}
                    onSelectAllToggle={handleSelectAllToggle}
                    onDeletePress={handleDeleteAllSelectedPress}
                />
            ),
        [
            allSelected,
            handleDeleteAllSelectedPress,
            handleProcessPress,
            handleSelectAllToggle,
            hasImages,
            hasSelectedImages,
        ],
    );

    return (
        <div className="flex-1">
            <div className={`bg-card rounded-lg border shadow-sm p-6 h-full`}>
                <div className="flex justify-between items-center mb-6 ">
                    {/*Area title with image count*/}
                    <div className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-medium">Image Gallery</h2>
                        {hasImages && (
                            <span className="text-sm text-muted-foreground ml-2">
                                ({images.length}{' '}
                                {images.length === 1 ? 'image' : 'images'})
                            </span>
                        )}
                    </div>

                    {imageListActionsMemoized}
                </div>

                <div {...getRootProps()}>
                    {isDragActive && <UploadImageDragArea />}

                    {!hasImages ? (
                        <UploadImageArea
                            getInputProps={() => getInputProps()}
                        />
                    ) : (
                        <MainImageList />
                    )}
                </div>
            </div>

            {/* Preview Dialog */}
            {/*<ImagePreviewDialog*/}
            {/*    open={previewOpen}*/}
            {/*    onOpenChange={setPreviewOpen}*/}
            {/*    image={previewImage}*/}
            {/*    filters={previewFilters}*/}
            {/*/>*/}
        </div>
    );
}

export const ImageManager = memo(ImageManagerSection);
