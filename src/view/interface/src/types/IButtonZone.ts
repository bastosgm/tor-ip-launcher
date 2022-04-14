export interface IButtonZone {
  setList: React.Dispatch<React.SetStateAction<string[]>>,
  setFilteredList: React.Dispatch<React.SetStateAction<string[]>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
}
