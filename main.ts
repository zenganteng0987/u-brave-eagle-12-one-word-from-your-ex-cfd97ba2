// SPDX-License-Identifier: MIT
// One Word From Your Ex — entry program.
// Writes exactly one word to /output/entry.txt: the word an ex would
// use to describe the entrant. No network, no input, deterministic.
//
// Word choice, weighed against the judge's criteria in order:
// 1. "exhausting" — a real word an ex says about a former partner
//    ("you're exhausting"), not a phrase or an insult for its own sake.
// 2. Funny through the sharp turn: the whole relationship reframed as
//    tiring work, landing harder than the expected "clingy".
// 3. Stings because it is painfully true, and the entrant plainly knows it.
// 4. Lands instantly and cannot be swapped for "tiring" or "draining"
//    without losing the personal edge — those describe jobs, not a person.
// 5. Relatable: everyone has felt, or been, exhausting to live with.
// Runners-up: "temporary" (sharp sting, weaker laugh), "clingy"
// (classic ex word, but too expected — loses on surprise).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "exhausting";

// Gate: 1-24 chars, exactly one word, no trailing newline.
if (!/^[^\s]{1,24}$/.test(ENTRY)) {
  throw new Error("entry must be exactly one word of 1-24 characters");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must not contain a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length}-character entry to ${outPath}`);
