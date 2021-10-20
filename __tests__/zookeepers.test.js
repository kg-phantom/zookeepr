const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test("filters by query", () => {
    const startingKeepers = [
        {
            id: "1",
            name: "Jesse",
            age: 22,
            favoriteAnimal: "bear",

        },
        {
            id: "2",
            name: "Alice",
            age: 25,
            favoriteAnimal: "dolphin",
        }
    ];

    const updatedKeepers = filterByQuery({ age: 25 }, startingKeepers);

    expect(updatedKeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingKeepers = [
        {
            id: "1",
            name: "Jesse",
            age: 22,
            favoriteAnimal: "bear",

        },
        {
            id: "2",
            name: "Alice",
            age: 25,
            favoriteAnimal: "dolphin",
        }
    ];

    const result = findById("1", startingKeepers);

    expect(result.name).toBe("Jesse");
});

test("creates new zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Jesse", id: "laksnf23nlk"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Jesse");
    expect(zookeeper.id).toBe("laksnf23nlk");
});

test("validates new zookeeper", () => {
    const validKeeper = {
        id: "1",
        name: "Jesse",
        age: 22,
        favoriteAnimal: "bear"
    };

    const invalidKeeper = {
        id: "2",
        name: "Alice",
        favoriteAnimal: "dolphin"
    };

    const result = validateZookeeper(validKeeper);
    const result2 = validateZookeeper(invalidKeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
