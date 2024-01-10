import React from 'react';
import { config } from '@arandu/laravel-mui-admin';

type TransformSrcOptions = {
    uploadId?: string
};

type UseTransformCallback = (src: string, options: TransformSrcOptions) => string;

type UseTransformSrc = () => UseTransformCallback;

const useTransformSrc: UseTransformSrc = () => {

    const transformSrc = React.useCallback((src: string, options: TransformSrcOptions) => {
        if (config('dropzone')) {
            return config('dropzone.transformSrc')(src, options);
        }
        return src;
    }, []);

    return transformSrc;

}

export default useTransformSrc;
