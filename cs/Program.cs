using System;
using ion;

namespace arcintr {
    class Program {
        static string run = "";
        static void Main(string[] args) {
            for (int i = 0; i < args.Length; i++) {
                if (args[i] == "-rnn") {
                    run = args[i+1];
                }
            }

            Console.WriteLine(run);

            Console.WriteLine("Hello World!");
        }
    }
}
