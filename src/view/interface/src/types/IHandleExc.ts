import { ChangeEventHandler } from 'react'

export interface IHandleExc {
  onChange: ChangeEventHandler<HTMLInputElement>
  exc: { ip: string }
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
