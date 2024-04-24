//post.service.ts
import db from "../db";
import { eq } from 'drizzle-orm';
import { NewPost, posts } from "../schemas/schema.model"
import { verifyToken } from "./auth.service";

export const createPost = async (data: {
  title: string;
  body: string;
  authorId: number;
}) => {
  const newPost: NewPost = await data
  //Create the recipe
  const createdPost = await db.insert(posts).values({
    ...newPost
  }).returning({
      title: posts.title,
      body: posts.body,
      authorId: posts.authorId,
  });

  return createdPost;
};

export const getAllRecipes = async () => {
  //Get all recipes
  const post = await db.select().from(posts)

  return post;
};

export const getRecipeById = async (id: number) => {
  //Get recipe by id and include the user
  const allPosts = await db.select().from(posts).where(eq(posts.id, id))
  // findUnique({
  //   where: {
  //     id,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  return allPosts;
};