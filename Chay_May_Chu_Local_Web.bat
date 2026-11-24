@echo off
title May Chu IELTS Quest 6.5 (Local Server)
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================================
echo        MÁY CHỦ WEB NỘI BỘ GIA ĐÌNH - IELTS QUEST 6.5
echo ====================================================================
echo.
echo 1. Trên máy tính này:
echo    Mở trình duyệt vào: http://localhost:8080
echo.
echo 2. Cho các con dùng trên Điện thoại / iPad / Laptop khác cùng mạng Wi-Fi:
echo    Mở trình duyệt Safari/Chrome trên điện thoại và gõ:
echo    http://192.168.1.245:8080
echo.
echo ====================================================================
echo (Giữ cửa sổ màu đen này mở trong lúc học. Đóng cửa sổ là tắt web)
echo ====================================================================
echo.
start "" "http://localhost:8080"
python -m http.server 8080
pause
