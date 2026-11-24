@echo off
title Xuat Ban IELTS Quest 6.5 Len GitHub Pages
chcp 65001 >nul
echo ========================================================
echo     TỰ ĐỘNG XUẤT BẢN IELTS QUEST 6.5 LÊN GITHUB PAGES
echo ========================================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0..\publish-website.ps1" -SiteName "ielts-quest-65" -Description "IELTS Quest 6.5 - Official Web Platform"
echo.
pause
