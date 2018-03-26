import fs from 'fs-extra';
import path from 'path';

const robots = fs.readFileSync(path.join(process.cwd(), 'config/robots.txt'));

export default function handleRobots(app) {
    app.get('/robots.txt', (req, res) => {
        res.type('text/plain');
        res.send(robots);
    });
}
