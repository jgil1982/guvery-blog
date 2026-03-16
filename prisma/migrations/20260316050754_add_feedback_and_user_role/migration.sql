-- AlterEnum
-- Add USER value to UserRole enum.
-- This must be committed in its own transaction before it can be used.
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'USER';
