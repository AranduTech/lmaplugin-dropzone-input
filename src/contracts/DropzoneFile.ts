
type DropzoneFileOptions = FilePropertyBag & {
    preview?: string;
};


class DropzoneFile extends File
{
    preview?: string;

    constructor(
        fileBits: BlobPart[],
        fileName: string,
        options?: DropzoneFileOptions | undefined,
    ) {
        const { preview, ...otherOptions } = options || {};

        super(fileBits, fileName, otherOptions);

        this.preview = preview;
    }

}

export default DropzoneFile;

