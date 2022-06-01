param($p1)
if ($p1) {
    clear
}
deno run -A js/main.js test\package.cll
cd cs
dotnet run -rnn test\out\tron.bxc
cd ../