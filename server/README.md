docker compose up -d
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm seed
pnpm dev

docker compose down
rm -rf data

npx prettier --write .