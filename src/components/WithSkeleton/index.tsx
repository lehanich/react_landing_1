import React from "react";
import { rootCertificates } from "tls";
import { Loader } from "../Loader"
import styles from "./withSkeleton.module.scss";

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
        return <div className={styles.root}>
        {skeletonSlot ||
            <Loader/>
        }</div>;
    }

    if (!isLoading && isEmpty && !error) {
        return <>{emptySpaceSlot || "no data"}</>;
    }

    return <>{error}</>
}