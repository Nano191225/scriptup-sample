import * as v from "valibot";

export function sum(a: number, b: number): number {
    v.parse(v.number(), a);
    v.parse(v.number(), b);
    return a + b;
}