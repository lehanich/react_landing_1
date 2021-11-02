import React from "react";

export type WithSkeletonProps = {
    readonly isLoading?: boolean;
    readonly isEmpty?: boolean;
    readonly error?: string; // React.ReactNote

    readonly skeletonSlot?: React.ReactNode;
    readonly emptySpaceSlot?: React.ReactNode;
};

export const WithSkeleton: React.FC<WithSkeletonProps> = ({
    isLoading,
    isEmpty,
    error,

    skeletonSlot,
    emptySpaceSlot,
    children,
}) => {
    if (!isEmpty && !isLoading && !error) {
        return <>{children}</>;
    }

    if (isLoading) {
        return <>{skeletonSlot || "loading..."}</>;
    }

    if (!isLoading && isEmpty && !error) {
        return <>{emptySpaceSlot || "no data"}</>;
    }

    return <>{error}</>
}