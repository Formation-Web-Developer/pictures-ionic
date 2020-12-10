import {Picture} from '../models/Picture';

export declare interface StorageService {
    needUpdate(): boolean;

    setUpdate(update: boolean);

    getPictures(success: (pictures: Picture[]) => void, error: (err?: any) => void): void;

    insertPicture(name: string, data: string, success: (value?: any) => void, error?: (err?: any) => void): void;

    updatePicture(picture: Picture, success: (value?: any) => void, error?: (err?: any) => void): void;

    removePicture(picture: Picture, success: () => void, error?: (err?) => void): void;
}
