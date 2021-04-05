import { ObjDiff } from "./objectDiff";
import { cloneDeep as _cloneDeep } from 'lodash'
import { diffTypes } from "./objectDiff";

const Harley = {
    breed: 'Labrador',
    age: 8,
    colour: 'black'
}

const David = {
    name: 'David',
    gender: 'm',
    foods: {
        favourite: 'cheese',
        hates: 'chips'
    },
    games: {
        ps4: {
            new: 'God of War'
        }
    }
}

describe('Object Diff', () => {

    it('creates an update diff with a simple object', () => {
        const update = {
            breed: 'Labrador',
            age: 9,
            colour: 'black'
        }
        const expected = { age: 9 };
        expect(ObjDiff(_cloneDeep(Harley), update)).toEqual(expected)
    });

    it('creates a history diff with a simple object', () => {
        const update = {
            breed: 'Labrador',
            age: 9,
            colour: 'black'
        }
        const expected = { age: 8 };
        expect(ObjDiff(_cloneDeep(Harley), update, diffTypes.HISTORY)).toEqual(expected)
    });

    it('creates an update diff with a nested object', () => {
        const update = {
            foods: {
                favourite: 'chilli',
                hates: 'chips'
            }
        }

        const expected = {
            foods: {
                favourite: 'chilli'
            }
        }
        expect(ObjDiff(_cloneDeep(David), update)).toEqual(expected)
    });

    it('creates a history diff with a nested object', () => {
        const update = {
            foods: {
                favourite: 'chilli',
                hates: 'chips'
            }
        }
        const expected = {
            foods: {
                favourite: 'cheese'
            }
        }
        expect(ObjDiff(_cloneDeep(David), update, diffTypes.HISTORY)).toEqual(expected)
    });

    it('returns the original object if nothing is replaced (history mode)', () => {
        const update = {
            job: {
                title: 'Software Engineer',
            }
        }
        expect(ObjDiff(_cloneDeep(David), update, diffTypes.HISTORY)).toEqual(David)
    });
})
