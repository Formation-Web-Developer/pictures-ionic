import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Picture} from '../models/Picture';
import {StorageService} from './storage.services';

/* DATABASE */
const DATABASE_NAME = 'picture_gallery';
const TABLE_NAME = 'pictures';

const ID_COLUMN = 'id';
const NAME_COLUMN = 'name';
const DATA_COLUMN = 'data';
const PUBLISH_COLUMN = 'published_at';

@Injectable()
export class SQLStorageService implements StorageService{

    database?: SQLiteObject;
    needUpdated: boolean = true;

    constructor(private sqlLite: SQLite) {
        this.initializeStorage();
    }

    needUpdate(): boolean {
        return this.needUpdated;
    }

    setUpdate(update: boolean) {
        this.needUpdated = update;
    }

    initializeStorage(): void {
        console.log('INITIALISE STORAGE....')
        this.sqlLite.create({name: DATABASE_NAME, location: 'default'})
            .then(database => this.initializeTables(database))
            .catch(console.error);
    }

    initializeTables(database: SQLiteObject): void {
        console.log('INITIALISE TABLES....')
        this.database = database;
        database.executeSql(`create table if not exists '${TABLE_NAME}'(
            ${ID_COLUMN} integer primary key autoincrement not null,
            ${NAME_COLUMN} varchar(255) not null,
            ${DATA_COLUMN} text not null,
            ${PUBLISH_COLUMN} datetime not null default CURRENT_TIMESTAMP
        )`, [])
            .then(()=>{
                console.log('table Created !')
            })
            .catch((err)=>{
                console.log('Can\'t create table. ', JSON.stringify(err))
            });
    }

    getPictures(success: (pictures: Picture[]) => void, error: (err?: any) => void = (err) => console.error(err)): void{
        this.database?.executeSql(`select * from ${TABLE_NAME} order by ${PUBLISH_COLUMN} desc`, [])
            .then(result => {
                const pictures: Picture[] = [];
                for(let i = 0; i < result.rows.length; i++){
                    const item = result.rows.item(i);
                    pictures.push(new Picture(item[ID_COLUMN], item[NAME_COLUMN], item[DATA_COLUMN], item[PUBLISH_COLUMN]))
                }
                success(pictures);
            })
            .catch(error);
    }

    insertPicture(name: string, data: string, success: (value?: any) => void, error: (err?: any) => void = (err) => console.log(err)): void{
        this.database?.executeSql(`insert into ${TABLE_NAME} (${NAME_COLUMN},${DATA_COLUMN}) values (?,?)`, [name, data])
            .then(success).catch(error);
        this.needUpdated = true;
    }

    updatePicture(picture: Picture, success: (value?: any) => void, error: (err?: any) => void = (err) => console.log(err)): void{
        this.database?.executeSql(`update ${TABLE_NAME} set ${NAME_COLUMN}=? where ${ID_COLUMN}=?`, [picture.name, picture.id])
            .then(success).catch(error);
        this.needUpdated = true;
    }

    removePicture(picture: Picture, success: () => void, error: (err?) => void = (err) => console.log(err)): void{
        this.database?.executeSql(`delete from ${TABLE_NAME} where ${ID_COLUMN}=?`, [picture.id])
            .then(success)
            .catch(error);
        this.needUpdated = true;
    }
}
