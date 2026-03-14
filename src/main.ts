import { world } from "@minecraft/server";
import { sum } from "./utils";
import { sha256 } from "@noble/hashes/sha2.js";
import { TextEncoder } from "text-encoding";
import "scriptup-sample-pkg";

world.afterEvents.worldLoad.subscribe(() => {
    console.log("Hello world!");
});

world.beforeEvents.chatSend.subscribe((event) => {
    const { sender, message } = event;

    if (message === "hp") {
        world.sendMessage(`${sender.name}'s health: ${sender.health ?? "N/A"}`);
    } else if (message.startsWith("sum")) {
        const args = message.split(" ").slice(1);
        const a = parseInt(args[0]);
        const b = parseInt(args[1]);
        world.sendMessage(`${sender.name}'s sum: ${sum(a, b)}`);
    } else {
        const encode = new TextEncoder().encode(message);
        const hash = sha256(encode);
        const hexHash = Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
        world.sendMessage(`${sender.name}'s message hash: ${hexHash}`);
    }
});
