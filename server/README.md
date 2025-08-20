docker compose up
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm seed
pnpm dev