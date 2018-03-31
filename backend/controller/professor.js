const rp = require('request-promise');
const fs = require('mz/fs');
// http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=4080&callback=noCB&q=*%3A*+AND+schoolid_s%3A1413&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+autosuggest&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp&rows=5000&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s&fq=

let Professor = {
	async getAll() {
		let ratings = await fs.readFile('./resources/ratings.txt', 'utf-8');
		let avgs = await fs.readFile('./resources/averages.txt', 'utf-8');

		ratings = JSON.parse(ratings.trim());
		avgs = JSON.parse(avgs.trim());

		ratings = ratings.docs.map(prof => {
			return {
				firstName: prof.teacherfirstname_t,
				lastName: prof.teacherlastname_t,
				rating: prof.averageratingscore_rf,
				rmp: `http://www.ratemyprofessors.com/ShowRatings.jsp?tid=${prof.pk_id}`
			}
		});

		return {ratings, avgs};
	},

	getProfessorRating(fullName, data) {
		let [lastName, firstName] = fullName.toLowerCase().split(', ');	
		let profList = data.filter((prof) => {
			return prof.lastName.toLowerCase() === lastName;
		})

		if (profList.length > 1) { // Profs have the same last name
			profList = profList.filter((prof) => {
				return prof.firstName.toLowerCase().includes(firstName)
						|| firstName.includes(prof.firstName.toLowerCase());
			})
		}

		return profList.length === 0 ? null : profList[0];
	},

	/*
	 *	Return the averages of courses a professor has taught.
	 */
	getProfessorAvg(fullName, data) {
		return data[fullName];
	}
}

module.exports = Professor;