export interface Lecturer {
  method: string
  headers: Headers
  body: Body[]
}

export interface Headers {
  "Content-Type": string
  Accept: string
}

export interface Body {
  lecturer_uuid: string
  title_before: string
  first_name: string
  middle_name: string
  last_name: string
  title_after: string
  picture_url: string
  location: string
  claim?: string
  bio: string
  price_per_hour: number
  contact: Contact
  tags: Tag[]
}

interface Tag {
  uuid: string
  name: string
}

interface Contact {
  telephone_numbers: string[]
  emails: string[]
}

export interface Calendar {
  year: number
  month: number
  day: number
  hour: number
  lecturer_uuid: string
}