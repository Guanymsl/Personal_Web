import prisma from "../db/prismaClient";

const resolvers = {
  Query: {
    posts: () => {
      return prisma.post.findMany({
        orderBy: { position: "desc" },
      });
    },
  },
  Mutation: {
    logIn: async (_: any, args: { name: string, password: string }) => {
      const user = await prisma.user.findUnique({
        where: { name: args.name, password: args.password },
      });
      if (!user) throw new Error("User not found!");
      return user;
    },
    createPost: async (_: any, args: { title: string; content: string }) => {
      const last = await prisma.post.findFirst({
        orderBy: { position: "desc" },
        select: { position: true },
      });
      const nextPos = (last?.position ?? -1) + 1;

      const post = await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          position: nextPos,
        },
      });
      return post;
    },
    deletePost: async (_: any, args: { id: number }) => {
      const post = await prisma.post.delete({
        where: { id: args.id },
      });
      return post.id;
    },
    reorderPosts: async (_: any, args: { order: number[] }) => {
      await prisma.$transaction(
        args.order.map((id, index) =>
          prisma.post.update({
            where: { id },
            data: { position: index },
          })
        )
      );

      return prisma.post.findMany({
        where: { id: { in: args.order } },
        orderBy: { position: "desc" },
      });
    },
  },
};

export default resolvers;
