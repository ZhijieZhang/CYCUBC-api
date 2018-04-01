const express = require('express');
const Professor = require('./controller/professor');
const Course = require('./controller/course');

const app = express();

app.get('/course/:dept-:course-:section-:year-:session', (req, res, next) => {
	let {dept, course, section, year, session} = req.params;
	let courseI = Object.create(Course);

	courseI.init(dept, course, section, year, session);
	Promise.all([courseI.getProfessorName(), Professor.getAll()])
		.then(([profNames, data]) => {
			if (profNames === 'TBA') {
				res.send('TBA');
			} else {
				let response = profNames.map(profName => {
					return {
						name: profName,
						rating: Professor.getProfessorRating(profName, data.ratings),
						avg: Professor.getProfessorAvg(profName, data.avgs)
					}
				});
				res.send(response);
			}
		});
})

app.listen(3000, () => console.log('Server started!'));