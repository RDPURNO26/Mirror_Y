/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: corevalues
 * Interface for CoreValues
 */
export interface CoreValues {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  valueName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: creativesubjects
 * Interface for CreativeSubjects
 */
export interface CreativeSubjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  subjectName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  heroImage?: string;
  /** @wixFieldType text */
  famousQuote?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  learningTimeline?: string;
}


/**
 * Collection ID: galleryitems
 * Interface for GalleryItems
 */
export interface GalleryItems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
}


/**
 * Collection ID: performanceservices
 * Interface for PerformanceServices
 */
export interface PerformanceServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  promotionalImage?: string;
  /** @wixFieldType url */
  bookingFormUrl?: string;
}


/**
 * Collection ID: studenttestimonials
 * Interface for StudentTestimonials
 */
export interface StudentTestimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  studentName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  studentPhoto?: string;
  /** @wixFieldType text */
  courseStudied?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: subjectstyles
 * Interface for SubjectStyles
 */
export interface SubjectStyles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  styleName?: string;
  /** @wixFieldType text */
  shortSummary?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  styleImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  enrollmentFormUrl?: string;
}


/**
 * Collection ID: teachers
 * Interface for Teachers
 */
export interface Teachers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  teacherName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  specialization?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType text */
  experienceAndAchievements?: string;
}
