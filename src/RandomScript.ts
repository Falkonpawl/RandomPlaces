type TPeople = {
  name: string
  value: number
}

type TReyting = {
  name: string
  rating: number
}

export function RandomScript(PeopleList: string) {
  const PeopleArray = PeopleList.split("\n")
  const Peoples: TPeople[] = []
  // создаем массив объектов с именами и значениями
  PeopleArray.forEach((value) => {
    const arr = value.split(" ")
    if (arr.length === 2) {
      Peoples.push({ name: arr[0], value: Number(arr[1]) })
    } else {
      Peoples.push({
        name: arr.slice(0, arr.length - 1).join(" "),
        value: Number(arr[arr.length - 1]),
      })
    }
  })
  // создаем массив ответов и статистики
  const FreePlaces: number[] = Array(Peoples.length)
    .fill(0)
    .map((_, index) => index + 1)
  console.log(FreePlaces)
  const Answer = Array(Peoples.length)
  const Statystic = Array(Peoples.length).fill(0)
  for (let i = 0; i < Peoples.length; i++) {
    const value = Number(Peoples[i].value) - 1
    Statystic[value] += 1
  }

  // определяем кто получил 100% место
  Statystic.forEach((value, index) => {
    const indexValue = Peoples.findIndex((people) => people.value === index + 1)
    if (value === 1) {
      Answer[index] = Peoples[indexValue].name
      Peoples.splice(indexValue, 1)
      const placeIndex = FreePlaces.indexOf(index + 1)
      if (placeIndex !== -1) {
        FreePlaces.splice(placeIndex, 1)
      }
    }
  })

  if (FreePlaces.length > 0) {
    FreePlaces.forEach((value) => {
      const Rating: TReyting[] = Peoples.map((people) => {
        if (people.value === value) {
          return { name: people.name, rating: 10 }
        }
        if (people.value === value - 1 || people.value === value + 1) {
          return { name: people.name, rating: 5 }
        } else return { name: people.name, rating: 1 }
      })
      const ShuffledRating = shuffleArrayInPlace(Rating)
      const AnswerName = weightedRandom(ShuffledRating)
      Answer[value - 1] = AnswerName
      const indexAnswer = Peoples.findIndex((people) => people.name === AnswerName)
      if (indexAnswer !== -1) {
        Peoples.splice(indexAnswer, 1)
      }
    })
  }
  // создаем строку ответов
  const AnswerString = Answer.reduce((acc, value, index) => {
    return acc + (index + 1) + ") " + value + "\n"
  }, "")
  return AnswerString
}

function shuffleArrayInPlace(array: TReyting[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function weightedRandom(rating: TReyting[]) {
  const totalWeight = rating.reduce((sum, rat) => sum + rat.rating, 0)
  const random = Math.random() * totalWeight

  let weightSum = 0

  for (let i = 0; i < rating.length; i++) {
    weightSum += rating[i].rating
    if (random < weightSum) {
      return rating[i].name
    }
  }
  return rating[rating.length - 1].name
}
