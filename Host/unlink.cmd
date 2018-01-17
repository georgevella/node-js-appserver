@echo off

REM cake build\main.cake -Verbosity=Diagnostic --nuget_source=https://sto-proget-01.bde.local/nuget/OBG-Tools --roslyn_nugetsource=https://sto-proget-01.bde.local/nuget/OBG-Tools

@for /F "delims=" %%G IN (build-order.txt) DO @(
    echo Unlinking [%%G]

    pushd %~dp0\packages\node_modules\@jorge\%%G
    npm unlink

    if %ERRORLEVEL% NEQ 0 (
        goto failure
    )
    popd
)

goto exit

:failure
echo The Fuck, an error! Error: %ERRORLEVEL%

:exit
echo Packages unlinked from NPM!