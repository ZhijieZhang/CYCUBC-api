const Course = require('../controller/course');

describe('Tests for Course object', () => {
	let course;

	beforeEach(() => {
		course = Object.create(Course);
	})

	test('should return correct professor name, CPSC 110 101 2017 W', async () => {
		course.init('CPSC', 110, 101);
		const profName = await course.getProfessor();

		expect.assertions(2);
		expect(profName).toContain('KICZALES, GREGOR');
		expect(profName).toHaveLength(1);
	})

	test('should return correct professor name, CPSC 310 101 2017 W', async () => {
		course.init('CPSC', 310, 101);
		const profName = await course.getProfessor();

		expect.assertions(2);
		expect(profName).toContain('BANIASSAD, ELISA');
		expect(profName).toHaveLength(1);
	})

	test('should return all the professor names, CPSC 418 101 2017 W', async () => {
		course.init('CPSC', 418, 101);
		const profName = await course.getProfessor();

		expect.assertions(3);
		expect(profName).toContain('GREENSTREET, MARK');
		expect(profName).toContain('MITCHELL, IAN');
		expect(profName).toHaveLength(2);
	})

	test('should return TBA when professor is not available', async () => {
		course.init('CPSC', 110, 911);
		const profName = await course.getProfessor();

		expect.assertions(1);
		expect(profName).toBe('TBA');
	})
})