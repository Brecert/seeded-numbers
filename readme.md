# seeded-numbers

## Usage
```js
import { seededNumbers } from 'seeded-numbers';

let numbers = seededNumbers(0xB733);
assert(numbers.next().value === 2121607608);
assert(numbers.next().value === 1429965843);

let values = seededNumbers(11113);
assert(values.next().value === 3358610980);
assert(values.next().value === 2581454588);
```