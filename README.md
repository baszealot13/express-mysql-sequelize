# EXPRESS MYSQL SEQUELIZE

- Nodejs 14
- Sequelize 6

## Install packages

`npm install`

## Deploy for development

`npm run start`

## Sequelize

### Install
- Install sequelize-cli before use cli command `npm i sequelize-cli` or can use `npx sequelize-cli {command}` instead

### Datebase setup
- After clone project run `npm install` then Do these step below
  - Create database, username, password and etc, follow config/config.json at development property
  - Run command `npx sequelize-cli db:migrate` or `sequelize db:migrate` in-case install sequelize-cli

### Creating the Model

Run this command to creating the model `npx sequelize-cli model:generate --name {Model-name} --attributes {field-1}:{column-type},...,{field-2}:{column-type}`. example below

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
``` 

After generated Model might adjust the Model or Migration skeleton file such as edit id or remove field createAt and updateAt (id, createAt and updateAt it will auto added these field when generate Model) before run command `npx sequelize-cli db:migrate` to generate table or some edit table to database

You can undo migration by run command `npx sequelize-cli db:migrate:undo`

