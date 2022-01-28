import { browser } from "$app/env";
//import TurtleDB from "turtledb";

var db;

if (browser) {
    const TurtleDB = (await import("turtledb")).default;
    db = new TurtleDB("example");
}

export var mydb = db;