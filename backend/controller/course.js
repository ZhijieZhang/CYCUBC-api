const rp = require('request-promise');
const cheerio = require('cheerio');

let Course = {
	init(dept, course, section, year=2017, session='W') {
		this.dept = dept;
		this.course = course;
		this.section = section;
		this.year = year;
		this.session = session;
	},

	getProfessor() {
		let options = {
			uri: `https://courses.students.ubc.ca/cs/main?sessyr=${this.year}&sesscd=${this.session}&pname=subjarea&tname=subjareas&req=5&dept=${this.dept}&course=${this.course}&section=${this.section}`,
			transform(body) {
				return cheerio.load(body);
			}
		}

		return new Promise((resolve, reject) => {
			rp(options)
				.then(($) => {
					let profList = $('td').find('a').slice(1);

					if (profList.length >= 1) {
						let professor = profList.map(function() {
							return $(this).text();
						}).get();
						resolve(professor);
					}
					resolve('TBA');
				})
		})
	}
};

module.exports = Course;