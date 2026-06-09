/*
  Warnings:

  - You are about to drop the column `descricao` on the `apresentacao` table. All the data in the column will be lost.
  - Added the required column `texto_completo` to the `Apresentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto_negrito` to the `Apresentacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apresentacao` DROP COLUMN `descricao`,
    ADD COLUMN `texto_completo` TEXT NOT NULL,
    ADD COLUMN `texto_negrito` TEXT NOT NULL;
