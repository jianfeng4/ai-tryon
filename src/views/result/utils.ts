import { ScrollDirection } from "react-easy-infinite-scroll-hook"
import { v4 as uuidv4 } from "uuid"

export const createItems = (length = 100): string[] => [
  "https://scpic.chinaz.net/files/default/imgs/2024-10-07/e90a115518617aa6.jpg",
  "https://scpic.chinaz.net/files/default/imgs/2024-09-24/a27bdb9bed0273f1.jpg",
  "https://scpic.chinaz.net/files/default/imgs/2024-09-08/1b2abb3f7901ca2f.jpg",
  "https://scpic.chinaz.net/files/default/imgs/2024-08-30/7e11fc1d66c8daa4.jpg"
]

export const loadMore = async (length = 50): Promise<string[]> =>
  new Promise((res) => setTimeout(() => res(createItems(length)), 100))

export const createNext =
  ({
    setLoading,
    setData,
    offset,
    reverse
  }: {
    setData: (v: React.SetStateAction<string[]>) => void
    setLoading: (v: React.SetStateAction<boolean>) => void
    offset: number
    reverse?: boolean
  }) =>
  async (direction: ScrollDirection) => {
    try {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 3000))
      const rows = [
        "https://scpic.chinaz.net/files/default/imgs/2024-06-24/3c185c3a16f15342_s.png",
        "https://scpic.chinaz.net/files/default/imgs/2023-09-28/da985eac6be9430f_s.jpg",
        "https://scpic.chinaz.net/files/default/imgs/2023-09-21/c99a1ae956947de6_s.jpg",
        "https://scpic.chinaz.net/files/default/imgs/2023-09-27/338dc4476046c32c_s.jpg"
      ]

      setData((prev) =>
        direction === "up" || direction === "left"
          ? reverse
            ? [...prev, ...rows]
            : [...rows, ...prev]
          : reverse
            ? [...rows, ...prev]
            : [...prev, ...rows]
      )
    } finally {
      setLoading(false)
    }
  }

interface Row {
  key: string
  cells: string[]
}

export const createGridItems = (rows = 100, columns = 100): Row[] =>
  Array.from({ length: rows }).map(() => ({
    key: uuidv4(),
    cells: Array.from({ length: columns }).map(() => uuidv4())
  }))

export const loadMoreGridItems = async (
  rows = 20,
  columns = 20
): Promise<Row[]> =>
  new Promise((res) =>
    setTimeout(() => res(createGridItems(rows, columns)), 100)
  )

export const createNextGrid =
  ({
    data,
    setLoading,
    setData,
    offset
  }: {
    data: Row[]
    setData: (v: React.SetStateAction<Row[]>) => void
    setLoading: (v: React.SetStateAction<boolean>) => void
    offset: number
  }) =>
  async (direction: ScrollDirection) => {
    try {
      setLoading(true)
      if (direction === "up" || direction === "down") {
        const rows = await loadMoreGridItems(offset, data[0].cells.length)

        setData((prev) =>
          direction === "up" ? [...rows, ...prev] : [...prev, ...rows]
        )
      } else {
        const rowColumns = await loadMoreGridItems(data.length, offset)

        setData((prev) =>
          prev.map((row, idx) => ({
            key: row.key,
            cells:
              direction === "left"
                ? [...rowColumns[idx].cells, ...row.cells]
                : [...row.cells, ...rowColumns[idx].cells]
          }))
        )
      }
    } finally {
      setLoading(false)
    }
  }

export const getSourceUrl = (
  componentName: string,
  directory: string = "common"
) =>
  `https://github.com/vdmrgv/react-easy-infinite-scroll-hook/blob/main/example/src/pages/${directory}/${componentName}.tsx`
