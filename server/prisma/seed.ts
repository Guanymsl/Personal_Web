import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "guanymsl",
      password: "chad2005",
    },
  });
  const post = await prisma.post.create({
    data: {
      title: "Hello World",
      content: "This is my first post",
      position: 0,
    },
  });
  const post2 = await prisma.post.create({
    data: {
      title: "Hello World2",
      content: "This is my first post",
      position: 1,
    },
  });
  const post3 = await prisma.post.create({
    data: {
      title: "Hello World3",
      content: "This is my first post",
      position: 2,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
