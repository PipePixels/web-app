'use client';

import type React from 'react';
import { useState } from 'react';
import { useImagesSub } from '../new/images-context';
import { useCredits } from '../../shared/state/credits-context';
import {
    filterCategories,
    FilterMetadata,
    filterMetadata,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import { Separator } from '@/components/ui/separator';
import { CreditsInfo } from '@/app/components/filters/credits-info';
import { FiltersQueue } from '@/app/components/filters/queue/filters-queue';
import { AvailableFiltersSection } from '@/app/components/filters/available/available-filters-section';

export default function Sidebar() {
    const { hasImages } = useImagesSub();
    const { credits, consumeCredits } = useCredits(); // Use the hook at the top level
    const [availableFilters] = useState<FilterMetadata[]>(filterMetadata);
    const [queuedFilters, setQueuedFilters] = useState<FilterMetadata[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [, setApplyingCredits] = useState(false);

    // Calculate total credits required for queued filters
    const totalCreditsRequired = queuedFilters.reduce((total, filter) => {
        const originalFilter = filterMetadata.find(
            (f) => f.id === filter.id.split('-')[0],
        );
        return total + (originalFilter?.creditCost || 1);
    }, 0);

    // TODO: Implement the function to process all images with the queued filters
    const processAllImages = () => null;

    // Handle applying filters to all images
    const handleApplyFilters = async () => {
        if (
            !hasImages ||
            queuedFilters.length === 0 ||
            credits < totalCreditsRequired
        ) {
            return;
        }

        setIsProcessing(true);
        setApplyingCredits(true);
        try {
            await processAllImages();
            // Deduct credits after successful processing
            consumeCredits(totalCreditsRequired);
            // Success notification could be added here
        } catch (error) {
            console.error('Error processing images:', error);
            // Error notification could be added here
        } finally {
            setIsProcessing(false);
            setApplyingCredits(false);
        }
    };

    // Handle drag and drop between lists
    const onDragEnd = (result: any) => {
        // const { source, destination } = result;
        //
        // // Dropped outside the list
        // if (!destination) {
        //     return;
        // }
        //
        // // Moving within the same list
        // if (source.droppableId === destination.droppableId) {
        //     if (source.droppableId === 'queuedFilters') {
        //         const newQueuedFilters = Array.from(queuedFilters);
        //         const [movedItem] = newQueuedFilters.splice(source.index, 1);
        //         newQueuedFilters.splice(destination.index, 0, movedItem);
        //         setQueuedFilters(newQueuedFilters);
        //     }
        // } else {
        //     // Moving from available to queued
        //     if (
        //         source.droppableId === 'availableFilters' &&
        //         destination.droppableId === 'queuedFilters'
        //     ) {
        //         // Get the filter from the filtered list
        //         const filteredFilters = getFilteredFilters();
        //         const sourceFilter = filteredFilters[source.index];
        //
        //         // Create a copy with a unique ID to allow multiple instances of the same filter
        //         const newFilter = {
        //             ...sourceFilter,
        //             id: `${sourceFilter.id}-${Date.now()}`,
        //         };
        //         const newQueuedFilters = Array.from(queuedFilters);
        //         newQueuedFilters.splice(destination.index, 0, newFilter);
        //         setQueuedFilters(newQueuedFilters);
        //
        //         // Set the new filter to be open by default
        //         setOpenFilters((prev) => ({
        //             ...prev,
        //             [newFilter.id]: true,
        //         }));
        //     }
        // }
    };

    // Filter available filters based on search query
    const getFilteredFilters = () => {
        if (searchQuery === '') {
            return availableFilters;
        }

        return availableFilters.filter((filter) =>
            filter.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };

    // Group filters by category
    const getFiltersByCategory = () => {
        const filteredFilters = getFilteredFilters();

        if (filteredFilters.length === 0) {
            return [];
        }

        return filterCategories
            .map((category) => {
                const filters = filteredFilters.filter(
                    (filter) => filter.category === category.id,
                );
                return {
                    ...category,
                    filters,
                };
            })
            .filter((category) => category.filters.length > 0);
    };

    const filteredCategories = getFiltersByCategory();

    return (
        <div className="w-full md:w-80 flex-shrink-0">
            <div onDragEnd={onDragEnd}>
                <CreditsInfo
                    credits={credits}
                    queuedFilters={queuedFilters}
                    totalCreditsRequired={totalCreditsRequired}
                />

                {/* Queued Filters Section */}
                <FiltersQueue
                    hasImages={hasImages}
                    queuedFilters={queuedFilters}
                    onClearAll={() => setQueuedFilters([])}
                    onApplyFilters={handleApplyFilters}
                    processing={isProcessing}
                    credits={credits}
                    totalCreditsRequired={totalCreditsRequired}
                />

                <Separator className="my-6" />

                {/* Available Filters Section */}
                <AvailableFiltersSection
                    hasImages={hasImages}
                    value={searchQuery}
                    onSearch={(e) => setSearchQuery(e.target.value)}
                    filteredCategories={filteredCategories}
                />
            </div>
        </div>
    );
}
