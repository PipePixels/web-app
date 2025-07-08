import React, { ChangeEventHandler, memo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/app/ui/input';

export type SearchInputProps = {
    value: string;
    onSearch: ChangeEventHandler<HTMLInputElement>;
    disabled: boolean;
};

function SearchInputInternal({ value, onSearch, disabled }: SearchInputProps) {
    return (
        <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search filters..."
                value={value}
                onChange={onSearch}
                className="pl-8"
                disabled={disabled}
            />
        </div>
    );
}

export const SearchInput = memo(SearchInputInternal);
