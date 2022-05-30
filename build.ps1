param($p1)
if ($p1) {
    clear
}
deno compile -A -o out/jsx js/main.js
cd cs
dotnet build -o ../out
cd ../