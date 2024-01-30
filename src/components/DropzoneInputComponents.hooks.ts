
import React from 'react';

import axios from 'axios';

import { route, useDownloadBlob } from '@arandu/laravel-mui-admin';


export type UploadedFile = {
    filename: string,
    download_blob: BlobPart,
    [key: string]: any,
} & File;


export default function useDropzoneInputComponents() {

    const handleDownload = async (
        file: string | UploadedFile | null, 
        isLocal: boolean,
        folder: string = 'files',
    ) => {
        if (isLocal) {
            window.open(`/storage/files/${file}` as string);
        } else {
            const response = await axios({
                url: route(
                    'api.file.download', 
                    { folder, filename: (file as UploadedFile).filename }
                ),
                method: 'GET',
                responseType: 'blob',
            });
            // console.log({ response });

            const filename = (file as UploadedFile)?.name.split('.')[0];
            const fileBlob = response.data;

            useDownloadBlob(
                fileBlob,
                filename,
            );
        }        
    };

    return {
        handleDownload,
    };
};
