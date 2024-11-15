import { serial, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mock_interview', {
	int: serial('id').primaryKey(),
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()

    
});

