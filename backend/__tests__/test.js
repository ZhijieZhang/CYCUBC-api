const Professor = require('../controller/professor');
const Course = require('../controller/course');

describe('Tests for Professor object', () => {
	let data;

	beforeAll(() => {
		return Professor.getAll().then((_data) => {
			data = _data;
		});
	})

	test('should return correct professor information, Alan Hu', () => {
		let professor = Professor.getProfessor('HU, ALAN', data);

		expect(professor).toEqual({
			firstName: 'Alan',
			lastName: 'Hu',
			rating: 3.3,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=12471'
		});
	})

	test('should return correct professor information, Wai-ching Alfred, Kong', () => {
		let professor = Professor.getProfessor('KONG, WAI-CHING ALFRED', data);

		expect(professor).toEqual({
			firstName: 'Wai-Ching',
			lastName: 'Kong',
			rating: 2.8,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1602411'
		});
	})

	test('should return correct professor information, YU, HOI YIN EUGENIA', () => {
		let professor = Professor.getProfessor('YU, HOI YIN EUGENIA', data);

		expect(professor).toEqual({
			firstName: 'Hoi Yin Eugenia',
			lastName: 'Yu',
			rating: 4.2,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=206192'
		});
	})	
})

describe('Tests for Course object', () => {
	let course;

	beforeEach(() => {
		course = Object.create(Course);
	})

	test('should return correct professor name, CPSC 110 101 2017 W', async () => {
		course.init('CPSC', 110, 101);
		const profName = await course.getProfessorName();

		expect.assertions(2);
		expect(profName).toContain('KICZALES, GREGOR');
		expect(profName).toHaveLength(1);
	})

	test('should return correct professor name, CPSC 310 101 2017 W', async () => {
		course.init('CPSC', 310, 101);
		const profName = await course.getProfessorName();

		expect.assertions(2);
		expect(profName).toContain('BANIASSAD, ELISA');
		expect(profName).toHaveLength(1);
	})

	test('should return all the professor names, CPSC 418 101 2017 W', async () => {
		course.init('CPSC', 418, 101);
		const profName = await course.getProfessorName();

		expect.assertions(3);
		expect(profName).toContain('GREENSTREET, MARK');
		expect(profName).toContain('MITCHELL, IAN');
		expect(profName).toHaveLength(2);
	})

	test('should return TBA when professor is not available', async () => {
		course.init('CPSC', 110, 911);
		const profName = await course.getProfessorName();

		expect.assertions(1);
		expect(profName).toBe('TBA');
	})
})

describe('Tests for Course and Professor', () => {
	let course;
	let data;

	beforeAll(() => {
		return Professor.getAll().then((_data) => {
			data = _data;
		});
	})

	beforeEach(() => {
		course = Object.create(Course);
	})

	test('should return correct professor information, CPSC 110 101 2017 W', async () => {
		course.init('CPSC', 110, 101);
		const profName = await course.getProfessorName();
		const profInfo = profName.map((_profName) => {
			return Professor.getProfessor(_profName, data);
		})

		expect.assertions(1);
		expect(profInfo[0]).toEqual({
			firstName: 'Gregor',
			lastName: 'Kiczales',
			rating: 3.3,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=38077'
		});
	})

	test('should return correct professor information, STAT 200 202 2017 W', async () => {
		course.init('STAT', 200, 202);
		const profName = await course.getProfessorName();
		const profInfo = profName.map((_profName) => {
			return Professor.getProfessor(_profName, data);
		})

		expect.assertions(3);
		expect(profInfo).toHaveLength(4);
		expect(profInfo[0]).toBeNull();
		expect(profInfo[2]).toEqual({
			firstName: 'Hoi Yin Eugenia',
			lastName: 'Yu',
			rating: 4.2,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=206192'
		});
	})

	test('should return correct professor information, CPSC 418 101 2017 W', async () => {
		course.init('CPSC', 418, 101);
		const profName = await course.getProfessorName();
		const profInfo = profName.map((_profName) => {
			return Professor.getProfessor(_profName, data);
		})

		expect.assertions(3);
		expect(profInfo).toHaveLength(2);
		expect(profInfo[0]).toEqual({
			firstName: 'Mark',
			lastName: 'Greenstreet',
			rating: 3.46,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=74942'			
		});
		expect(profInfo[1]).toEqual({
			firstName: 'Ian',
			lastName: 'Mitchell',
			rating: 3.92,
			rmp: 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=638768'
		});
	})	
})

