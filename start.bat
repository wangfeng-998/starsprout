@echo off
chcp 65001 >nul
echo 🌱 正在启动星芽 StarSprout...
echo.
echo 首次启动需要安装依赖，请耐心等待...
echo.
cd /d "%~dp0"
call npm install
echo.
echo 🚀 正在启动开发服务器...
call npm run dev
pause
