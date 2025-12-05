/**
 * Component Form Tests - Validation Tests
 * These tests focus on form validation logic that can be tested without rendering components
 */
import { describe, it, expect, beforeEach } from 'vitest'

/**
 * Validation Helper Functions for ProjectForm
 */
const validateProjectForm = (formData) => {
  const errors = {}

  // Title validation
  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Title is required'
  }

  // Description validation
  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Description is required'
  }

  // Technologies validation
  if (!formData.technologies || formData.technologies.length === 0) {
    errors.technologies = 'At least one technology is required'
  }

  // URL validation (optional fields)
  if (formData.imageUrl && formData.imageUrl.trim() !== '') {
    if (!isValidUrl(formData.imageUrl)) {
      errors.imageUrl = 'Please enter a valid URL'
    }
  }

  if (formData.projectUrl && formData.projectUrl.trim() !== '') {
    if (!isValidUrl(formData.projectUrl)) {
      errors.projectUrl = 'Please enter a valid URL'
    }
  }

  if (formData.githubUrl && formData.githubUrl.trim() !== '') {
    if (!isValidUrl(formData.githubUrl)) {
      errors.githubUrl = 'Please enter a valid URL'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Technology Input Helper Functions
 */
const addTechnology = (technologies, newTech) => {
  // Check for duplicates
  if (technologies.includes(newTech)) {
    return { technologies, isDuplicate: true }
  }

  return {
    technologies: [...technologies, newTech],
    isDuplicate: false
  }
}

const removeTechnology = (technologies, techToRemove) => {
  return technologies.filter(tech => tech !== techToRemove)
}

describe('ProjectForm Validation', () => {
  it('should require title field', () => {
    const formData = {
      title: '',
      description: 'Test',
      technologies: ['React']
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.title).toBe('Title is required')
  })

  it('should require description field', () => {
    const formData = {
      title: 'Test Project',
      description: '',
      technologies: ['React']
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.description).toBe('Description is required')
  })

  it('should require at least one technology', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: []
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.technologies).toBe('At least one technology is required')
  })

  it('should validate URL format for imageUrl', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React'],
      imageUrl: 'not-a-url',
      projectUrl: '',
      githubUrl: ''
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.imageUrl).toBe('Please enter a valid URL')
  })

  it('should validate URL format for projectUrl', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React'],
      imageUrl: '',
      projectUrl: 'invalid-url',
      githubUrl: ''
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.projectUrl).toBe('Please enter a valid URL')
  })

  it('should validate URL format for githubUrl', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React'],
      imageUrl: '',
      projectUrl: '',
      githubUrl: 'not-a-url'
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(false)
    expect(result.errors.githubUrl).toBe('Please enter a valid URL')
  })

  it('should accept valid URLs', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React'],
      imageUrl: 'https://example.com/image.jpg',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project'
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(true)
    expect(Object.keys(result.errors).length).toBe(0)
  })

  it('should pass with minimal required fields', () => {
    const formData = {
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React'],
      imageUrl: '',
      projectUrl: '',
      githubUrl: ''
    }

    const result = validateProjectForm(formData)
    expect(result.isValid).toBe(true)
    expect(Object.keys(result.errors).length).toBe(0)
  })
})

describe('TechnologyInput Validation', () => {
  it('should add a new technology', () => {
    const technologies = ['React']
    const result = addTechnology(technologies, 'Next.js')

    expect(result.isDuplicate).toBe(false)
    expect(result.technologies).toEqual(['React', 'Next.js'])
  })

  it('should prevent duplicate technologies', () => {
    const technologies = ['React', 'Next.js']
    const result = addTechnology(technologies, 'React')

    expect(result.isDuplicate).toBe(true)
    expect(result.technologies).toEqual(['React', 'Next.js'])
  })

  it('should remove a technology', () => {
    const technologies = ['React', 'Next.js', 'TypeScript']
    const result = removeTechnology(technologies, 'Next.js')

    expect(result).toEqual(['React', 'TypeScript'])
  })

  it('should handle removing from single technology', () => {
    const technologies = ['React']
    const result = removeTechnology(technologies, 'React')

    expect(result).toEqual([])
  })

  it('should handle removing non-existent technology', () => {
    const technologies = ['React', 'Next.js']
    const result = removeTechnology(technologies, 'Vue.js')

    expect(result).toEqual(['React', 'Next.js'])
  })
})