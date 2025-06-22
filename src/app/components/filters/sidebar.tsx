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
import { FilterCollapseProvider } from '@/app/shared/state/filter-queue-item.state';

export default function Sidebar() {
    const { hasImages } = useImagesSub();
    const { credits, consumeCredits } = useCredits();
    const [availableFilters] = useState<FilterMetadata[]>(filterMetadata);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [, setApplyingCredits] = useState(false);

    // TODO: Implement the function to process all images with the queued filters
    const processAllImages = () => null;

    // TODO: Implement the function to calculate total credits required for processing
    const handleApplyFilters = async () => {
        setIsProcessing(true);
        setApplyingCredits(true);

        try {
            await processAllImages();
            consumeCredits(0);
        } catch (error) {
            console.error('Error processing images:', error);
        } finally {
            setIsProcessing(false);
            setApplyingCredits(false);
        }
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
            {/*TODO: Implement credit management*/}
            {false && (
                <CreditsInfo credits={credits} totalCreditsRequired={0} />
            )}

            <FilterCollapseProvider>
                <FiltersQueue
                    onApplyFilters={handleApplyFilters}
                    processing={isProcessing}
                    credits={credits}
                />
            </FilterCollapseProvider>

            <Separator className="my-6" />

            <AvailableFiltersSection
                hasImages={hasImages}
                value={searchQuery}
                onSearch={(e) => setSearchQuery(e.target.value)}
                filteredCategories={filteredCategories}
            />
        </div>
    );
}
