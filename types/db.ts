export type User = {
  id: number
  mail: string
  name: string
  birthday: number
  gender: number
}

export type Token = {
  id: number,
  user_id: number,
  token: string
}
