//comments.service.ts
import db from "../db";
import { eq } from 'drizzle-orm';
import { NewComment, comments } from "../schemas/schema.model"

export const createComment = async (data: {
  body: string;
  postId: number;
  authorId: number;
}) => {
  try {
    const newPost: NewComment = await data
    //Create the comment for the recipe with the given id
    const comment = await await db.insert(comments).values(newPost).returning({
        body:comments.body,
        authorId: comments.authorId,
        postId: comments.postId,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt
    });
    return comment
  } catch (error: any) {
    throw error;
  }
};

export const getAllCommentsForRecipe = async (postId: number) => {
  //Get all comments for the recipe with the given id
  const allComments = await db.select().from(comments).where(eq(comments.postId, postId))
  // .findMany({
  //   where: {
  //     postId,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  return allComments;
};
