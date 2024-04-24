import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    uniqueIndex,
    integer
} from 'drizzle-orm/pg-core'

import { relations, type InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: varchar("email", {length: 256}).notNull(),
    password: varchar("password", {length:256}).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull()
},
(users) => {
    return {
        uniqueIdx: uniqueIndex("users_idx").on(users.email),
    }
}
)

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: integer('authorId').references(() => users.id).notNull()
},
(posts) => {
    return {
        uniqueIdx: uniqueIndex("post_idx").on(posts.id),
    }
}
)

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    body: text("body").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: integer('author_id').references(() => users.id).notNull(),
    postId: integer('postId').references(() => posts.id).notNull()
},
(comments) => {
    return {
        uniqueIdx: uniqueIndex("comment_idx").on(comments.id),
    }
}
)

// Creating Relations
export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
    comments: many(comments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
      fields: [posts.authorId],
      references: [users.id],
    }),
    comments: many(comments)
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
      fields: [comments.authorId],
      references: [posts.id],
    }),
  }));
// Creating new content

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type Post = InferSelectModel<typeof posts>
export type NewPost = InferInsertModel<typeof posts>

export type Comment = InferSelectModel<typeof comments>
export type NewComment = InferInsertModel<typeof comments>