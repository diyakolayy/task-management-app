const chai = require('chai');
const supertest = require('supertest');
const app = require('../server');

const expect = chai.expect;
const request = supertest(app);

describe('Backend API', () => {
    beforeEach(() => {
        // Reset tasks before each test
        app.locals.tasks = [];
    });

    it('should add a new task', async() => {
        const res = await request
            .post('/api/tasks')
            .send({ task: 'Test task' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body.task).to.equal('Test task');
    });

    it('should return all tasks', async() => {
        const res = await request.get('/api/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should delete a task', async() => {
        // First, add a task
        const postRes = await request
            .post('/api/tasks')
            .send({ task: 'Task to delete' });
        const taskId = postRes.body.id;

        // Then, delete it
        const deleteRes = await request.delete(`/api/tasks/${taskId}`);
        expect(deleteRes.status).to.equal(204);

        // Verify task is gone
        const getRes = await request.get('/api/tasks');
        expect(getRes.body).to.not.include.deep.members([{ id: taskId, task: 'Task to delete' }]);
    });
});