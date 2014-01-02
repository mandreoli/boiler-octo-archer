ECHO OFF

ECHO START APP_FIRST APP BUILDER
node ../r.js -o app_first.build.js

ECHO RENAME index.release
cd ./../../release/app_first
rename index.release index.html
cd ./../../build/apps

ECHO END APP_FIRST APP BUILDER