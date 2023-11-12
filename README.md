# Accounting Web

### Backend Server - [Accounting Api TypesScript](https://github.com/yuhexiong/accounting-api-typescript)

## Overview

- Language: JavaScript
- Web FrameWork: Vue3

## ENV

copy .env.example and rename as .env

```bash
VUE_APP_API_BASE_URL=http://localhost:7777
```

## Run

### install dependencies

```bash

npm install

```

### linting code

```bash

npm run lint --fix

```

### build

```bash

npm run build

```

### run

```bash

npm run serve

```

## Pages

### type maintain

```bash

/type

```
- See all types in this page.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/type_page.png)

- After clicking edit, the edit button will become save button.
- Can add new type on the bottom of the table.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/type_page_edit.png)


### consumption Record

```bash

/consumption

```

- See all consumptions in this page.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/consumption_page.png)

- After clicking edit, the edit button will become save button.
- All types are exclusively accessible through a dropdown menu for selection.
- Can add new consumption on the bottom of the table.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/consumption_page_edit.png)


### Monthly Report

```bash

/report

```

- Before searching.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/report_page.png)

- After searching, you'll find a report table and pie chart displaying this month's consumptions.
![image](https://github.com/yuhexiong/accounting-web-vue3-javascript/blob/main/image/report_page_search.png)

