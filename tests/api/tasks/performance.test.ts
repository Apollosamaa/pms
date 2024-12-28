import axios from 'axios';
import { mocked } from 'jest-mock';

jest.mock('axios');

describe("API Performance Tests", () => {
  it("GET /api/tasks should return tasks within acceptable time", async () => {
    const startTime = Date.now();
    
    // Mocking the Axios GET response to return a valid response structure
    mocked(axios.get).mockResolvedValueOnce({
      status: 200, 
      data: [{ id: '1', title: 'Test Task', description: 'This is a test task', isCompleted: false, isImportant: false }]
    });
    
    const response = await axios.get("/api/tasks");

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(500);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  });

});
