import prisma from "../db/prismaClient";

interface PostArgs {
  id: number | string;
}

interface SignUpArgs {
  email: string;
  name?: string;
}

interface CreatePostArgs {
  title: string;
  content?: string;
}

const resolvers = {
  Query: {
    posts: () =>
      prisma.post.findMany({ include: { author: true } }),
    post: (_: unknown, args: PostArgs) =>
      prisma.post.findUnique({
        where: { id: Number(args.id) },
        include: { author: true },
      }),
    me: () => prisma.user.findFirst(),
  },
  Mutation: {
    signUp: (_: unknown, args: SignUpArgs) =>
      prisma.user.create({
        data: { email: args.email, name: args.name ?? null },
      }),
    createPost: async (_: unknown, args: CreatePostArgs) => {
      const author = await prisma.user.findFirst();
      if (!author) throw new Error("No user yet. Call signUp first.");
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content ?? null,
          authorId: author.id,
        },
        include: { author: true },
      });
    },
  },
};

export default resolvers;
