import { FilterMetadata } from '@/core/domain/filters/interfaces/operations/filter-metadata';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/app/ui/badge';
import { CreditCard, Info } from 'lucide-react';
import type React from 'react';

export function CreditsInfo(props: {
    credits: number;
    queuedFilters: FilterMetadata[];
    totalCreditsRequired: number;
}) {
    return (
        <Card className="mb-6">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">
                        Credits
                    </CardTitle>
                    <Badge variant="outline" className="px-2 py-1">
                        <CreditCard className="h-3.5 w-3.5 mr-1" />
                        {props.credits} available
                    </Badge>
                </div>
                <CardDescription>
                    Each filter operation consumes credits
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium">
                            Required for current filters:
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {props.queuedFilters.length} filters ×{' '}
                            {props.queuedFilters.length > 0
                                ? Math.round(
                                      (props.totalCreditsRequired /
                                          props.queuedFilters.length) *
                                          10,
                                  ) / 10
                                : 0}{' '}
                            avg. cost
                        </p>
                    </div>
                    <Badge
                        variant={
                            props.credits >= props.totalCreditsRequired
                                ? 'default'
                                : 'destructive'
                        }
                        className="text-sm">
                        {props.totalCreditsRequired} credits
                    </Badge>
                </div>
                {props.credits < props.totalCreditsRequired && (
                    <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-xs text-destructive flex items-center">
                            <Info className="w-3.5 h-3.5 mr-1.5" />
                            You need{' '}
                            {props.totalCreditsRequired - props.credits} more
                            credits to apply these filters
                        </p>
                    </div>
                )}
                {props.queuedFilters.length > 0 &&
                    props.credits >= props.totalCreditsRequired && (
                        <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded-md">
                            <p className="text-xs text-primary flex items-center">
                                <Info className="w-3.5 h-3.5 mr-1.5" />
                                You have enough credits to apply these filters
                            </p>
                        </div>
                    )}
            </CardContent>
        </Card>
    );
}
