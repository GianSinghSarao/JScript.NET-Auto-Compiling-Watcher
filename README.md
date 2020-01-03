# JScript.NET-Auto-Compiling-Watcher
Simplistic File Watcher That Automatically Runs The JScript.NET Compiler Whenever A '.js' File is modified.
It's fairly simple, but has some nice features that in my opinion all command line programs should have. It's written in JScript.NET and Compiled using the jsc.exe program. It works by calling the jsc executable with the command line arguments passed to itself and displaying the output whenever a '.js' file is modified or created.

## Usage

```batch
watcher "<Directory>" "<Options>"
```

## JScript.NET Vs TypeScript

### History 
JScript.NET is a, very powerful but obselete, compiled scripting language. As far as I can tell, JScript.NET is the predeccessor of TypeScript. Both were made by Microsoft, Both are optionally typed languages, Both are based on ECMAscript Standards, And Both require a compiler. This language, unlike TypeScript, compiles down to Microsoft's Common Intermediate Language, like all .NET Languages. This limited JScript.NET to desktop devices, mainly windows, or maybe *nix with WINE or similar emulation. On the other hand, TypeScript thrived, mostly because it compiled down to JavaScript, which is abundantly supported.

### Dependencies; Memory And Storage Use;
JScript.NET has fewer execution dependencies than TypeScript, at least on windows. Once compiled it's perfect for simple desktop apps/widgets that don't rely heavily on UI. In contrast to this, Compiled TypeScript (AKA JavaScript), will require some form of JS engine to be installed on the users' devices, eg the V8 engine in NodeJS and Chrome, or Spider-Monkey in Firefox. Apps that rely on secure dependecies must include them with their code, increasing their payload size. For Example, Electron Apps include Chromium, and NodeJS. And this isn't as an imported library but bundled with the TypeScript code for each program. This results in duplication and an excessive use of storage and memory. This seems to be an unavoidable disadvantage of using TypeScript.

### Cross-Platform
Although the poor current state of dependency management seems to place TypeScript at a disadvantage, overall it's irrelevant, because TypeScript makes cross platform easy in comparison to JScript.NET. The three main platforms for TypeScript are on the web, on mobile, and on desktops. Such As: 
* Progressive Web Apps and Websites; 
* Cordova and PhoneGap; 
* and Electron Apps.

JScript.NET on the other hand, is limited to windows, or requires developers to write complex documentation regarding WINE for the *nixes. And support on mobile devices is doomed to a distant dream.
