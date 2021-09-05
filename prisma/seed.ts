import { PrismaClient } from "@prisma/client";
import { links } from "../data/links";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@myself.com",
      role: "ADMIN",
    },
  });

  await prisma.link.createMany({
    data: links,
  });
}

main()
  .then(() => {
    console.log("Seeding successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding the database: \n", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
