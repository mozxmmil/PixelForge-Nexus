-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tasks" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_ProjectsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectsToUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectsToUsers_B_index" ON "_ProjectsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_ProjectsToUsers" ADD CONSTRAINT "_ProjectsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUsers" ADD CONSTRAINT "_ProjectsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
