import dotenv from 'dotenv';
import gulp from 'gulp';
import rename from 'gulp-rename';

dotenv.config();

gulp.task('copyRobotsTxt', () => {
	const fileName = process.env.ROBOTS === 'true' ? 'robots-dev.txt'
		: 'robots-prod.txt';

	return gulp.src(fileName)
		.pipe(rename('robots.txt'))
		.pipe(gulp.dest('public'));
});

export default gulp.series('copyRobotsTxt');
