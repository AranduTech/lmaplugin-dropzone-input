import * as React from 'react';
import Dropzone, { Accept } from 'react-dropzone';

import { FormFieldProps, FormState, FormValue } from '@arandu/laravel-mui-admin/lib/types/form';
import { dotAccessor } from '@arandu/laravel-mui-admin/lib/support/object';
import { config, Icon, applyFilters, removeFilter, addFilter } from '@arandu/laravel-mui-admin';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import useTransformSrc from '../hooks/useTransformSrc';

import FileInput from './FileInput';

type DropzoneFieldProps = {
    form: FormFieldProps['form'],
    field: FormFieldProps['field'] & {
        placeholder?: string,
        uploadId?: string,
        accept?: Accept,
    },
};

type Style = { [className: string]: React.CSSProperties };

const styles: Style = {
    avatar: { 
        position: 'relative',
        maxWidth: 240,
        maxHeight: 240,
    },
    closeBtn: {
        position: 'absolute',
        top: -5,
        left: -5,
    },
};

export default function DropzoneInputComponent({ form, field }: DropzoneFieldProps) {
    
    const { state: [ data ], setProp, errors } = form;

    const {
        name, label,
        placeholder = '', uploadId,
        ...props
    } = field;

    const file: string | File | null = dotAccessor(data, name);

    const transformSrc = useTransformSrc();

    const fileSource = typeof file === 'string'
        ? transformSrc(file, { uploadId })
        : (file ? URL.createObjectURL(file) : false);

    // React.useEffect(() => {
    //     const filter = (transfers: FormValue[]) => {
    //         if (file instanceof DropzoneFile) {
    //             return [
    //                 ...transfers,
    //                 file,
    //             ];
    //         }
    //         return transfers;
    //     };

    //     addFilter('use_form_clone_transfers', filter);

    //     return () => {
    //         removeFilter('use_form_clone_transfers', filter);
    //     };
    // }, [name, file]);


    return (
        <Stack display="flex">
            {fileSource
                ? (
                    <Stack sx={styles.avatar}>
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
                            src={fileSource}
                        />

                        <Typography 
                            sx={styles.closeBtn}
                            onClick={() => setProp(name, null)}
                        >
                            <Icon name="close" />
                        </Typography>
                    </Stack>
                ) : (
                    <Dropzone
                        onDrop={(acceptedFiles) => {

                            const file = acceptedFiles[0];

                            setProp(name, file);
                        }}
                        maxFiles={1}
                        {...props}
                    >
                        {(inputProps) => (
                            <FileInput
                                placeholder={placeholder}
                                {...inputProps}
                            />
                        )}
                    </Dropzone>
                )
            }

            {errors.filter(({ key }) => key === name)
                .map(({ message }, index) => (
                    <FormHelperText key={index} error>{message}</FormHelperText>
                ))}
        </Stack>
    );
};