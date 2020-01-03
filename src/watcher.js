package CarePackage {
  class Helpers {
    static function Echo (...args: Object[]): Object[] {
      return args;
    }
    static function Pause (Console) {
      Console.Write("Press any key to exit . . .");
      Echo(Console.ReadKey().Key);
    } 
  }
}

import System.Diagnostics;
import System.IO;
import System;
import CarePackage;

var args:String[] = Environment.GetCommandLineArgs();
var dir = args.length != 1 ? Path.GetFullPath(args[1]) : Environment.CurrentDirectory;
var inNewWindow = Console.CursorLeft == 0 && Console.CursorTop == 0;

var passthroughArgs = function (a) {
  var ar = a.slice(); //creates copy of arguments
  ar.shift(); //removes this scripts path/name
  ar.shift(); //removes the mandatory watch directory parameter
  if (a.length > 2) {
    return ar.join(" ");
  } else {
    return args[2] ? args[2] : "";
  }
};

class Handlers {
  static function onChange (source: Object, e: FileSystemEventArgs): void { 
    Console.Write(e.Name + " " + e.ChangeType + " \n");
    var jscp = new Process();
    try {
      jscp.StartInfo.UseShellExecute = false;
      jscp.StartInfo.WorkingDirectory = dir;
      jscp.StartInfo.FileName = "jsc.exe";
      jscp.StartInfo.Arguments = passthroughArgs(args);
      jscp.StartInfo.RedirectStandardOutput = true;
      jscp.Start();
      Console.Write(jscp.StandardOutput.ReadToEnd());
      jscp.WaitForExit();
    } finally {
      jscp.Dispose();
    }
  }
  static function onRename (source: Object, e: RenamedEventArgs): void {
    Console.Write(e.OldName + " " + e.ChangeType + " To " + e.Name + " \n");
  }
  static function onError (source: Object, e: ErrorEventArgs): void {
    Console.Write(e + " \n");
  }  
}

if (args.length == 1) {
  Console.Write("USAGE: " + args[0] + " <Directory> <Options> \n")
  Console.Write("DESCRIPTION: \nA Simple Live Compiler For JScript.NET Development. \nWatches the directory for file changes, and instantly compiles using jsc.exe with the provided options. \n")
  if (inNewWindow) Helpers.Pause(Console);
} else {
  var fileWatcher = new FileSystemWatcher(dir); 
  try {    
    fileWatcher.add_Changed(FileSystemEventHandler(Handlers.onChange));
    fileWatcher.add_Created(FileSystemEventHandler(Handlers.onChange));
    fileWatcher.add_Deleted(FileSystemEventHandler(Handlers.onChange));
    fileWatcher.add_Renamed(RenamedEventHandler(Handlers.onRename));
    fileWatcher.add_Error(ErrorEventHandler(Handlers.onError));
    fileWatcher.Filter = "*.js";
    fileWatcher.IncludeSubdirectories = true;
    fileWatcher.NotifyFilter = NotifyFilters.LastAccess
                                 | NotifyFilters.LastWrite
                                 | NotifyFilters.FileName
                                 | NotifyFilters.DirectoryName;
    fileWatcher.EnableRaisingEvents = true; 
    Console.Write("Watching Directory \"" + dir + "\" For Changes. \nPress q at any time to quit. \n")
    while(Console.ReadKey().Key != 81) {}
  } 
  finally {
    fileWatcher.Dispose();
  }
}