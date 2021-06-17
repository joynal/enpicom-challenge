import { useSetRecoilState } from 'recoil'
import { dnaRecord } from '../recoil/atoms'

let baseUrl = import.meta.env.VITE_BASE_URL

export const getDnaRecords = () => {
  const setDnaRecord = useSetRecoilState(dnaRecord)

  const fetchDnaRecord = async (filterData = null) => {
    let url = `${baseUrl}/search?`

    if (filterData) {
      url += new URLSearchParams(filterData)
    }

    const response = await fetch(url)
    const data = await response.json()

    setDnaRecord(data)
  }

  const filterDna = (filter) => {
    fetchDnaRecord(filter)
  }

  return { filterDna, fetchDnaRecord }
}

export const createDnaRecord = async (record) => {
  const response = await fetch(`${baseUrl}/create`, {
    method: 'post',
    body: JSON.stringify(record),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const data = await response.json()

  return { status: response.status, data };
}
