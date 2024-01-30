
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
            const filename = (file as UploadedFile).filename.split('.')[0];

            const response = await axios({
                url: route('api.file.download', { folder, filename }),
                method: 'GET',
                responseType: 'blob',
            });

            const fileBlob = new Blob([response.data]);

            console.log({
                filename,
                fileBlob,
            });

            // useDownloadBlob(
            //     fileBlob,
            //     filename,
            // );
        }        
    };

    return {
        handleDownload,
    };
};
