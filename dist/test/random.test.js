"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("../random");
describe('Should support negative random numbers', () => {
    test('test with -1', () => expect((0, random_1.random)(-1)).toBe((0, random_1.random)(-1)));
    test('test with -2', () => expect((0, random_1.random)(-2)).toBe((0, random_1.random)(-2)));
    test('different seeds should be different randoms', () => expect((0, random_1.random)(-2)).not.toBe((0, random_1.random)(-1)));
});
test('Random should be deterministic', () => {
    expect((0, random_1.random)(1)).toBe((0, random_1.random)(1));
    expect((0, random_1.random)(2)).toBe((0, random_1.random)(2));
    expect((0, random_1.random)(2)).not.toBe((0, random_1.random)(1));
    expect((0, random_1.random)(null)).not.toBe((0, random_1.random)(null));
});
describe('Random should be uniform', () => {
    const ITEM_COUNT = 100000;
    const mapped = new Array(ITEM_COUNT).fill(true).map((a, i) => {
        return (0, random_1.random)(i);
    });
    const average = mapped.reduce((a, b) => a + b, 0) / mapped.length;
    test('test if average is around 0.5', () => {
        expect(average).toBeLessThan(0.51);
        expect(average).toBeGreaterThan(0.49);
    });
    const tenPercentSections = [];
    const stepInterval = 0.1;
    let currentStep = 0;
    while (currentStep < 0.999999) {
        const items = mapped.filter((m) => m >= currentStep && m <= currentStep + stepInterval);
        tenPercentSections.push(items);
        currentStep += stepInterval;
    }
    const ACCURACY = 0.005;
    tenPercentSections.forEach((entries, index) => test(`section ${index} should contain around ${ITEM_COUNT * stepInterval} entries`, () => {
        expect(entries.length).toBeLessThan(ITEM_COUNT * (stepInterval + ACCURACY));
        expect(entries.length).toBeGreaterThan(ITEM_COUNT * (stepInterval - ACCURACY));
    }));
    test('test for average distance', () => {
        const distances = mapped
            .map((a, i) => {
            if (i === 0) {
                return null;
            }
            return Math.abs(mapped[i] - mapped[i - 1]);
        })
            .filter((f) => f !== null);
        const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
        expect(averageDistance).toBeGreaterThan(0.3);
    });
});
test('Random string should be uniform', () => {
    const alphabet = 'abcdefghijlkmnopqrstuvwxyz0123456789';
    const array = new Array(alphabet.length)
        .fill(true)
        .map((_, i) => (0, random_1.random)(alphabet[i]));
    const average = array.reduce((a, b) => a + b, 0) / array.length;
    expect(average).toBeLessThan(0.55);
    expect(average).toBeGreaterThan(0.45);
});
