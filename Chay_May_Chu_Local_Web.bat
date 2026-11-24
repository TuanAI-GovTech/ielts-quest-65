@echo off
title May Chu IELTS Quest 6.5 (Local Server)
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================================
echo        MÁY CHỦ WEB NỘI BỘ - IELTS QUEST 6.5
echo ========================================================
echo.
echo Đang khởi tạo máy chủ tại: http://localhost:8080
echo.
start "" "http://localhost:8080"
python -m http.server 8080
pause
