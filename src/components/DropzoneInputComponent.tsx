import * as React from 'react';
import Dropzone, { Accept } from 'react-dropzone';

import { Icon } from '@arandu/laravel-mui-admin';
import { UploadedFile } from '@arandu/laravel-mui-admin/lib/useBlob';
import { dotAccessor } from '@arandu/laravel-mui-admin/lib/support/object';
import { FormFieldProps } from '@arandu/laravel-mui-admin/lib/types/form';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import useTransformSrc from '../hooks/useTransformSrc';

import FileInput from './FileInput';
import useDropzoneInputComponents from './DropzoneInputComponents.hooks';


type DropzoneFieldProps = {
    form: FormFieldProps['form'],
    field: FormFieldProps['field'] & {
        placeholder?: string,
        uploadId?: string,
        accept?: Accept,
    },
};


const Label = styled(Typography)(({ theme }) => ({
    color: '#00000099',
    'font-family': 'Roboto',
    'font-size': '18px',
    'font-weight': '400',
    'line-height': '12px',
    'letter-spacing': '0.15000000596046448px',
    'text-align': 'left',
}));

const FilePreview = styled(Stack)(({ theme }) => ({
    position: 'relative',
    // maxWidth: 240,
    maxHeight: 240,
}));

const RemoveImg = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    top: -5,
    left: -5,
}));


export default function DropzoneInputComponent({ form, field }: DropzoneFieldProps) {

    const {
        handleDownload,
    } = useDropzoneInputComponents();
    
    const { state: [ data ], setProp, errors } = form;

    const {
        name, label,
        placeholder = '', uploadId,
        multiple = false, 
        ...props
    } = field;

    const file: string | UploadedFile | null = dotAccessor(data, name);

    const transformSrc = useTransformSrc();

    const fileSource = !multiple
        ? (typeof file === 'string'
            ? transformSrc(file, { uploadId })
            : (file ? URL.createObjectURL(file) : false))
        : false;

    const fieldData = data[name] || [] || null;

    const mountFilePreview = (file: string | UploadedFile | null, index: number = 0) => {
        const isLocal = typeof file === 'string';
        const uploadingNow = file instanceof File;

        const useAvatar = uploadId === 'image';

        return (
            <FilePreview>
                {useAvatar && !multiple
                    ? (
                        <>
                            <img
                                alt="avatar"
                                style={{
                                    width: 163,
                                    height: 163,
                                    backgroundColor: '#e8e8e8',
                                    border: '1px solid #00000033',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                                className={`text-center`}
                                src={fileSource as string}
                            />
                        
                            <RemoveImg onClick={() => setProp(name, null)} >
                                <Icon name="close" />
                            </RemoveImg>
                        </>
                    )
                    : (
                        <Stack flexDirection="row" justifyContent="space-between" >
                            <Typography>
                                {`• ${isLocal
                                    ? file
                                    : file?.name
                                }`}
                            </Typography>

                            <Grid>
                                <Stack flexDirection="row" gap={1} >
                                    {!uploadingNow && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleDownload(file, isLocal)}
                                            sx={{ minWidth: 24, p: 0 }}
                                        >
                                            <Icon name="download" />
                                        </Button>
                                    )}

                                    <Button 
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            const filesToDrop = multiple
                                                ? (fieldData as File[]).filter((_, i) => i !== index)
                                                : null;

                                            setProp(name, filesToDrop);
                                        }} 
                                        sx={{ minWidth: 24, p: 0 }}
                                    >
                                        <Icon name="close" />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Stack>
                    )
                }
            </FilePreview>
        );
    };

    return (
        <Stack display="flex">
            {fileSource && !multiple
                ? mountFilePreview(file)
                : (
                    <>
                        <Label sx={{ pb: 1.75 }} >
                            {label}
                        </Label>

                        <Dropzone
                            onDrop={(acceptedFiles) => {
                                const filesToDrop = multiple
                                    ? [
                                        ...(fieldData as File[]),
                                        ...acceptedFiles,
                                    ]
                                    : acceptedFiles[0];

                                setProp(name, filesToDrop);
                            }}
                            maxFiles={multiple ? 10 : 1}
                            {...props}
                        >
                            {(inputProps) => (
                                <FileInput
                                    placeholder={placeholder}
                                    {...inputProps}
                                />
                            )}
                        </Dropzone>

                        {multiple && (
                            <Stack sx={{ my: 1 }} gap={1} >
                                {(fieldData as UploadedFile[])
                                    .map((file: UploadedFile | null, index: number) => (
                                        <React.Fragment key={index} >
                                            {mountFilePreview(file, index)}
                                        </React.Fragment>
                                    ))
                                }
                            </Stack>
                        )}
                    </>
                )
            }

            {errors.filter(({ key }) => key === name)
                .map(({ message }, index) => (
                    <FormHelperText key={index} error>{message}</FormHelperText>
                ))}
        </Stack>
    );
};