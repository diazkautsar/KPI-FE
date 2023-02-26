export const getImagePreview = (file: any) => {
    if (!file) {
        return null;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            resolve(e.target.result);
        };
        reader.onerror = (e) => reject(e);

        reader.readAsDataURL(file);
    });
};
