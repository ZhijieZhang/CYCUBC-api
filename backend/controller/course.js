const rp = require('request-promise');
const cheerio = require('cheerio');

let Course = {
	getProfessor(dept, course, section) {
		let options = {
			uri: `https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=5&dept=${dept}&course=${course}&section=${section}`,
			transform(body) {
				return cheerio.load(body);
			}
		}
		let professor;

		return new Promise((resolve, reject) => {
			rp(options)
				.then(($) => {
					console.log($('td').length);
					console.log($('td').find('a').length);
					console.log($('h4').text());
					professor = $('td').find('a').last().text();
					console.log(professor);
					resolve(professor);
				})
		})
	}
};

Course.getProfessor('ECON', '101', '001').then(console.log);

exports.module = Course;