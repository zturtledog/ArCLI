## instructions

sys: <call> <params>            call a standard library
def: <type> <name> <initial>    define a varible
set: <name> <val>               set a varible
add: <var> <num>                add to a varible
sub: <var> <num>                subtract to a varible
mul: <var> <num>                multiply to a varible
mod: <var> <num>                modulate to a varible
div: <var> <num>                divide to a varible
cjn: <var> <var>                join two strings
gto: <num>                      goto a line
jmp: <header>                   goto a header
jne: <var> <var> <header>       jump if not equal
jge: <var> <var> <header>       jump if greater than or equal to
jle: <var> <var> <header>       jump if less than or equal to
jlt: <var> <var> <header>       jump if less than
jgt: <var> <var> <header>       jump if greater than
dlt: <var||macro>               delete a varible or macro

<!-- obj -->

obj: <name>                         define an obj
ovl: <obj> <type> <name> <initial>  add a value to the obj
gvl: <obj> <val>                    get the value on the obj
svl: <obj> <var> <val>              set the value on the obj
cll: <obj> <macro> <parameters>     call a macro on the obj

<!-- external -->

!
!import <dll> <name>            import a dll into the standard library as an obj

## macros

@ <name> (<params>)             define a surface macro
    <code>
end

@ <name> *<obj> (<params>)      define a macro as part of an obj
    <code>
end

## example

```s
def: num $times 23          #define times
def: num $i 0               #define loop iterator

:loop                       
    add: $i 1               #increment iterator
    log: "hello world"      #call macro, log
    jge: $i $times :loop    #jump to loop if greater than or equal to

dlt $i                      #delete iterator

@log (str %val)             #define macro, log
    sys: print %val         #call std::print
end

```