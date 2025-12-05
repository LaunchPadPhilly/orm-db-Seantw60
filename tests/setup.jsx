import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { PrismaClient } from '@prisma/client'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }) => {
    return <a href={href}>{children}</a>
  },
}))

// Patch Prisma Client to validate technologies field
const originalPrismaClient = PrismaClient;
vi.mock('@prisma/client', async () => {
  const actual = await vi.importActual('@prisma/client')
  const PrismaClient = actual.PrismaClient
  
  return {
    ...actual,
    PrismaClient: class extends PrismaClient {
      constructor() {
        super()
        this.$use(async (params, next) => {
          if (params.model === 'Project' && params.action === 'create') {
            if (!Array.isArray(params.args.data.technologies)) {
              throw new Error('Technologies must be provided as an array')
            }
          }
          return next(params)
        })
      }
    }
  }
})

