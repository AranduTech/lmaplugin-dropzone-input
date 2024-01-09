import React from 'react';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const focusedStyle = { borderColor: '#2196f3' };

const acceptStyle = { borderColor: '#00e676' };

const rejectStyle = { borderColor: '#ff1744' };

const FileInput = ({
    // eslint-disable-next-line react/prop-types
    getRootProps, getInputProps, isDragActive, isFocused, isDragAccept,
    // eslint-disable-next-line react/prop-types
    isDragReject, placeholder,
}: any) => {
    const style = React.useMemo(() => ({
        ...baseStyle,
        ...isFocused ? focusedStyle : {},
        ...isDragAccept ? acceptStyle : {},
        ...isDragReject ? rejectStyle : {},
    }), [
        isFocused,
        isDragAccept,
        isDragReject,
    ]);

    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p className="m-0">{isDragActive ? 'Solte arquivos aqui' : placeholder}</p>
            </div>
        </section>
    );
};

export default FileInput;