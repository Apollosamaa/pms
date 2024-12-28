import { POST, GET, PUT } from "../../../app/api/tasks/route";
import { DELETE } from "../../../app/api/tasks/[id]/route";
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

jest.mock("@/app/utils/connect", () => ({
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

const mockedAuth = auth as unknown as jest.Mock;
const mockedPrismaTaskCreate = prisma.task.create as jest.Mock;
const mockedPrismaTaskFindMany = prisma.task.findMany as jest.Mock;
const mockedPrismaTaskUpdate = prisma.task.update as jest.Mock;
const mockedPrismaTaskDelete = prisma.task.delete as jest.Mock;

//unit testing
describe("/api/tasks", () => {
    describe("POST /api/tasks", () => {
      it("should create a task successfully", async () => {
        mockedAuth.mockResolvedValue({ userId: "user123" });
        mockedPrismaTaskCreate.mockResolvedValue({
          id: "1",
          title: "Test Task",
          description: "This is a test task",
          date: "2024-12-28",
          isCompleted: false,
          isImportant: false,
          userId: "user123",
        });
  
        const req = new Request("http://localhost/api/tasks", {
          method: "POST",
          body: JSON.stringify({
            title: "Test Task",
            description: "This is a test task",
            date: "2024-12-28",
            completed: false,
            important: false,
          }),
        });
  
        const res = await POST(req);
        const json = await res.json();
  
        expect(res).toBeInstanceOf(NextResponse);
        expect(json).toEqual({
          id: "1",
          title: "Test Task",
          description: "This is a test task",
          date: "2024-12-28",
          isCompleted: false,
          isImportant: false,
          userId: "user123",
        });
      });
    });
  
    describe("GET /api/tasks", () => {
      it("should retrieve tasks for a user", async () => {
        mockedAuth.mockResolvedValue({ userId: "user123" });
        mockedPrismaTaskFindMany.mockResolvedValue([
          {
            id: "1",
            title: "Test Task 1",
            description: "This is the first test task",
            date: "2024-12-28",
            isCompleted: false,
            isImportant: true,
            userId: "user123",
          },
          {
            id: "2",
            title: "Test Task 2",
            description: "This is the second test task",
            date: "2024-12-29",
            isCompleted: true,
            isImportant: false,
            userId: "user123",
          },
        ]);
  
        const req = new Request("http://localhost/api/tasks", {
          method: "GET",
        });
  
        const res = await GET(req);
        const json = await res.json();
  
        expect(res).toBeInstanceOf(NextResponse);
        expect(json).toEqual([
          {
            id: "1",
            title: "Test Task 1",
            description: "This is the first test task",
            date: "2024-12-28",
            isCompleted: false,
            isImportant: true,
            userId: "user123",
          },
          {
            id: "2",
            title: "Test Task 2",
            description: "This is the second test task",
            date: "2024-12-29",
            isCompleted: true,
            isImportant: false,
            userId: "user123",
          },
        ]);
      });
    });

    describe("PUT /api/tasks", () => {
        it("should update a task successfully", async () => {
          mockedAuth.mockResolvedValue({ userId: "user123" });
          mockedPrismaTaskUpdate.mockResolvedValue({
            id: "1",
            title: "Test Task",
            description: "This is a test task",
            date: "2024-12-28",
            isCompleted: true,
            isImportant: false,
            userId: "user123",
          });
    
          const req = new Request("http://localhost/api/tasks", {
            method: "PUT",
            body: JSON.stringify({
              id: "1",
              isCompleted: true,
            }),
          });
    
          const res = await PUT(req);
          const json = await res.json();
    
          expect(res).toBeInstanceOf(NextResponse);
          expect(json).toEqual({
            id: "1",
            title: "Test Task",
            description: "This is a test task",
            date: "2024-12-28",
            isCompleted: true,
            isImportant: false,
            userId: "user123",
          });
        });
      });
    
      describe("DELETE /api/tasks/:id", () => {
        it("should delete a task successfully", async () => {
          mockedAuth.mockResolvedValue({ userId: "user123" });
          mockedPrismaTaskDelete.mockResolvedValue({
            id: "1",
            title: "Test Task",
            description: "This is a test task",
            date: "2024-12-28",
            isCompleted: false,
            isImportant: false,
            userId: "user123",
          });
    
          const req = new Request("http://localhost/api/tasks/1", {
            method: "DELETE",
          });
    
          const res = await DELETE(req, { params: { id: "1" } });
          const json = await res.json();
    
          expect(res).toBeInstanceOf(NextResponse);
          expect(json).toEqual({
            id: "1",
            title: "Test Task",
            description: "This is a test task",
            date: "2024-12-28",
            isCompleted: false,
            isImportant: false,
            userId: "user123",
          });
        });
      });
    
  });

