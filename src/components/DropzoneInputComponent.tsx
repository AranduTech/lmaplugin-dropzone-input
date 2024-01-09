import * as React from 'react';
import Dropzone from 'react-dropzone';

import { FormFieldProps } from '@arandu/laravel-mui-admin/lib/types/form';
import { dotAccessor } from '@arandu/laravel-mui-admin/lib/support/object';
import { Icon } from '@arandu/laravel-mui-admin';

import FileInput from './FileInput';

export default function DropzoneInputComponent({ form, field }: any) {
    
    const { state: [ data ], setProp } = form;

    const {
        name, label,
        placeholder = '',
        // storagePath, imagePathInfix,
    } = field;

    const file = dotAccessor(data, `${name}.file`);
    const preview = dotAccessor(data, `${name}.preview`);

    const styles = React.useMemo(() => ({
        topBar: {
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: file ? '240px' : '100%',
        }
    }), []);

    return (
        <>
            <div style={styles.topBar}>
                {label && (
                    <label>
                        {label}
                    </label>
                )}

                {file && (
                    <span onClick={() => setProp(name, null)}>
                        <Icon name="close" />
                    </span>
                )}
            </div>
            
            {file
                ? (
                    <div>
                        <img
                            alt="avatar"
                            style={{
                                width: 240,
                                height: 240,
                                backgroundColor: '#e8e8e8',
                                border: '1px solid #00000033',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                            className={`text-center`}
                            // src={typeof file === 'string'
                            //     ? `${storagePath}${imagePathInfix}${file}`
                            //     : file.preview}
                            src={preview}
                        />
                    </div>
                ) : (
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            setProp(name, {
                                file: acceptedFiles[0],
                                preview: URL.createObjectURL(acceptedFiles[0])
                            });
                        }}
                        maxFiles={1}
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
        </>
    );
};