type FileType = 'video' | "image"

const uploadFile = async (formData: FormData, type: FileType = "image") => {
    formData.append('upload_preset', 'react-blog');

    const res = await fetch(`https://api.cloudinary.com/v1_1/deqcuczev/${type}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) throw new Error(`${type} upload failed`);
    const data = await res.json();
    return data;
};

const uploadMultipleFiles = async (
    files: File[],
    type: FileType = 'image',
    onEachUpload?: (url: string, filename: string, publicId: string) => void
) => {
    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        const fileExt = file.name.split('.').pop(); // get extension
        const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 999999)}.${fileExt}`;
        // Create a new File with the same content but new name
        const renamedFile = new File([file], uniqueFileName, { type: file.type });
        formData.append('file', renamedFile);
        const result = await uploadFile(formData, type);
        if (onEachUpload) {
            onEachUpload(result.secure_url, renamedFile.name, result.public_id);
        }

        return result;
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles; 
};

export { uploadFile, uploadMultipleFiles }