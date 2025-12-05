import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add middleware to validate technologies field
prisma.$use(async (params, next) => {
  if (params.model === 'Project' && params.action === 'create') {
    // Check if technologies is provided and is an array
    if (!Array.isArray(params.args.data.technologies)) {
      throw new Error('Technologies must be provided as an array');
    }
  }
  return next(params);
});

export default prisma;
