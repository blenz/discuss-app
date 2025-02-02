import { Comment as _Comment, Post as _Post, Topic as _Topic, PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export type Post = _Post
export type Comment = _Comment
export type Topic = _Topic
