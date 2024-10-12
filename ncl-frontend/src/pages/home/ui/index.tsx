import cls from "./example.module.scss"

export const Home = () => {
  return (
    <div>
      <button className={cls.red}>
        TEXT
        <span className={cls.notRed}>some text</span>
      </button>
      <div className={cls.notRed}>some text</div>
    </div>
  )
}
