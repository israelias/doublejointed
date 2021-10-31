interface Entity {
  id: string
  name: string
  description?: string
  homepage?: string
  github?: {
    url?: string
  }
  mdn?: { 
    url?: string
   }
}