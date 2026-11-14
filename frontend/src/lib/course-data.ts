export interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "reading" | "quiz" | "assignment"
  completed: boolean
}

export interface CourseSection {
  id: string
  title: string
  lessons: Lesson[]
}

export const courseData: CourseSection[] = [
  {
    id: "change-simplification",
    title: "Change Simplification",
    lessons: [
      { id: "1", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "video", completed: true },
      { id: "2", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "3", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "quiz", completed: false },
      { id: "4", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "assignment", completed: false },
      { id: "5", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
    ],
  },
  {
    id: "practice-quiz",
    title: "PRACTICE QUIZ",
    lessons: [
      { id: "6", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "video", completed: false },
      { id: "7", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "8", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "quiz", completed: false },
      { id: "9", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "10", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "video", completed: false },
      { id: "11", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "12", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "quiz", completed: false },
      { id: "13", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "14", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "video", completed: false },
      { id: "15", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
      { id: "16", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "quiz", completed: false },
      { id: "17", title: "Lesson 01 : Introduction about XD", duration: "30 mins", type: "reading", completed: false },
    ],
  },
]

export interface CoinReward {
  id: string
  title: string
  subtitle: string
  description: string
}

export const coinRewards: CoinReward[] = [
  {
    id: "1",
    title: "O6 Super Coins on the way",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adi",
    description: "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodL",
  },
  {
    id: "2",
    title: "O6 Super Coins on the way",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adi",
    description: "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodL",
  },
  {
    id: "3",
    title: "O6 Super Coins on the way",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adi",
    description: "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipicsing elit, sed do eiusmodL",
  },
]
