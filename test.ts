import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { seededNumbers } from "./mod.ts";

Deno.test("[seededNumbers] random enough", () => {
  const unique = new Set();
  for (let a = 0; a < 100; a++) {
    let numbers = seededNumbers(a);
    for (let b = 0; b < 100; b++) {
      let value = numbers.next().value;
      assert(
        !unique.has(value),
        `loop:[${a}:${b}] number already used: ${value}`
      );
      unique.add(value);
    }
  }
});

Deno.test("[seededNumbers] example", () => {
  let numbers = seededNumbers(0xb7ee);
  assert(numbers.next().value === 2121607608);
  assert(numbers.next().value === 1429965843);

  let values = seededNumbers(11113);
  assert(values.next().value === 3358610980);
  assert(values.next().value === 2581454588);
});
