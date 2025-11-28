export interface AddressUiData {
  id: string
  user_id: string
  street: string
  city: string
  zip_code: string
  country: string
  is_primary: boolean
  created_at?: Date
  updated_at?: Date
}

export interface AddressApiData {
  id: string
  user_id: string
  street: string
  city: string
  zip_code: string
  country: string
  is_primary: boolean
  created_at?: Date
  updated_at?: Date
}
