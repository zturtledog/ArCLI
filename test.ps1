param($p1)
if ($p1) {
    clear
}
cd test
deno run -A ../js/main.js package.cll -ng
cd ../cs
dotnet run -rnn test\out\tron.bxc
cd ../