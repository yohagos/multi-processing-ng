export interface CryptoModel {
  id: string
  initial: string
  name: string
  current_value: number
  previous_value: number
  percent: number
  created_at: Date
  is_initial: boolean
}
