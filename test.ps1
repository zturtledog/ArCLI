param($p1)
if ($p1) {
    clear
}
deno run -A js/main.js patch test\package.cll -w "test/workplace/"
cd cs
dotnet run -rnn test\out\tron.bxc
cd ../