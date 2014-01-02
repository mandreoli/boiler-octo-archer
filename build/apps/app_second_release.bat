ECHO OFF

ECHO START APP_SECOND APP BUILDER
node ../r.js -o app_second.build.js

ECHO RENAME index.release
cd ./../../release/app_second
rename index.release index.html
cd ./../../build/apps

ECHO END APP_SECOND APP BUILDER