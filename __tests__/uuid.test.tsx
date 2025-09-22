import { v4 as uuidv4 } from 'uuid';

describe('UUID functionality', () => {
    it('should generate a valid UUID v4', () => {
        const uuid = uuidv4();

        // Check if it's a string
        expect(typeof uuid).toBe('string');

        // Check if it matches UUID v4 format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(uuid).toMatch(uuidRegex);

        // Check that multiple calls generate different UUIDs
        const uuid2 = uuidv4();
        expect(uuid).not.toBe(uuid2);
    });
});
