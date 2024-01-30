
import { useBlob } from '@arandu/laravel-mui-admin';
import { UploadedFile } from '@arandu/laravel-mui-admin/lib/useBlob';


export default function useDropzoneInputComponents() {

    const { downloadBlob, mountBlob } = useBlob();

    const handleDownload = async (
        file: string | UploadedFile | null, 
        isLocal: boolean,
        folder: string = 'files',
    ) => {
        if (isLocal) {
            window.open(`/storage/${folder}/${file}` as string);
        } else {
            const { filename, fileBlob } = await downloadBlob(file as UploadedFile);

            mountBlob(
                fileBlob,
                filename,
            );
        }        
    };

    return {
        handleDownload,
    };
};
