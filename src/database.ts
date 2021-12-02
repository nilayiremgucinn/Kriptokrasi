import sqlite3 from 'sqlite3';
import path from 'path';
import { PATH } from './paths';
import { ROOT_PATH } from '.';
import { User } from 'telegraf/typings/core/types/typegram';
import { create } from 'domain';




export default class DatabaseManager {
    db: sqlite3.Database
    db_dir: string

    constructor() {

        this.db_dir = path.join(ROOT_PATH, PATH.DB_DIR, 'database.sqlite');
        this.db = new sqlite3.Database(this.db_dir);

        this.initTables();
    }

    initTables() {
        this.db.run("create table if not exists `users` (user_id, is_bot, first_name, last_name, username, code_id, code_timeout, approval)");
        this.db.run("create table if not exists `codes` (code_id PRIMARY KEY, code_timeout, user_id, code_day)");
        this.db.run("create table if not exists `posts` (id INTEGER PRIMARY KEY AUTOINCREMENT, message, creation_time timestamp, user_id)");
    }

    selectUser(user: User,callback:()=>void) {

        this.db.get("SELECT * FROM users WHERE user_id = ?", [user.id], (err, result) => {
            if (result)
                return result;
            else {
                this.createUser(user);
            }
        });
    }

    createUser(user: User) {

        this.db.run("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [user.id,
            user.is_bot,
            user.first_name,
            user.last_name,
            user.username,
                undefined,
                undefined,
                false]);
    }



}

