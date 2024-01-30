
import axios from 'axios';

import { config, route, useDownloadBlob } from '@arandu/laravel-mui-admin';


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
            const apiRoute = config('dropzone')
                ? config('dropzone.routes.api.download', 'api.file.download')
                : 'api.file.download';

            const response = await axios({
                url: route(
                    apiRoute, 
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
