export const getFileExtension = (mimeType: string): string => {
    const mimeToExt: { [key: string]: string } = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'application/pdf': 'pdf',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'video/mp4': 'mp4',
        'video/mpeg': 'mpeg',
        'video/ogg': 'ogv',
        'video/quicktime': 'mov',
        'video/webm': 'webm',
        // tambahkan pemetaan MIME type dan ekstensi file yang sesuai di sini
    };

    return mimeToExt[mimeType] || '';
};
