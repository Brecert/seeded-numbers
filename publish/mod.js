// constants
const MUL = 6364136223846793005n;
const ALT = 9843272141302948723n;
// wrap value to specified size
const clamp64 = (n) => BigInt.asUintN(64, n);
const clamp32 = (n) => BigInt.asUintN(32, n);
/**
 * Generate seeded psuedorandom numbers in sequence.
 *
 * Based on [PCG32](https://www.pcg-random.org)
 * @param seed seed to use for generating the psuedorandom sequence
 */
export function* seededNumbers(seed) {
    let rng = BigInt(seed);
    let value = 0n;
    let added = (rng << 1n) | 1n;
    const next = () => {
        let old = value;
        value = clamp64(old * MUL + added);
        let xorshifted = clamp32(((old >> 18n) ^ old) >> 27n);
        let rotation = clamp32(old >> 59n);
        let result = clamp32((xorshifted >> rotation) | (xorshifted << (-rotation & 31n)));
        return Number(result);
    };
    next();
    value = value + rng + ALT;
    next();
    while (true) {
        yield next();
    }
}
