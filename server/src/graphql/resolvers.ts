import prisma from "../db/prismaClient";

const resolvers = {
  Query: {
    posts: () => {
      return prisma.post.findMany();
    },
  },
  Mutation: {
    logIn: async (_: any, args: { name: string, password: string }) => {
      const user = await prisma.user.findUnique({
        where: { name: args.name, password: args.password },
      });
      if (!user) throw new Error("User not found");
      return user;
    },
    createPost: async (_: any, args: { title: string; content: string }) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
  },
};

export default resolvers;
