export interface IHeaderAlbum {
    title : string;
    numberOfPhotos: number;
    description: string;
    currentCategory?: any;
    prevAlbum?: any;
    nextAlbum?: any;
    prevAlbumPhoto?: string;
    nextAlbumPhoto?: string;
}