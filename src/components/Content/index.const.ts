import { ContactItem, TechStackItem, WorkCardData } from "./types";

export const stackArray: TechStackItem[] = [
  {
    logo: "https://img.icons8.com/color/96/000000/javascript.png",
    title: "JavaScript/TypeScript",
    description: "Современный ES6+ и строгая типизация",
    gist: "https://gist.github.com/AlbetItrum/e65ec1f257f821326e8ac6db4dc504a9",
    content: "import { CalendarProps } from './Calendar.types';\n\nimport clsx from 'clsx';\nimport { calendarClasses, getCalendarUtilityClass } from './Calendar.classes';\n\nimport { unstable_composeClasses as composeClasses } from '@mui/base';\n\nimport { styled, useThemeProps } from '@mui/material/styles';\nimport { capitalize } from '@mui/material/utils';\n\nimport { CalendarButton, CalendarButtonProps } from './CalendarButton';\nimport { useCalendar } from './useCalendar';\n\nimport { useDateAdapterContext } from '../DateAdapter';\n\ntype CalendarOwnerState = {\n  classes?: CalendarProps['classes'];\n  rows: NonNullable<CalendarProps['rows']>;\n};\n\nconst useUtilityClasses = (ownerState: CalendarOwnerState) => {\n  const { classes, rows } = ownerState;\n\n  const slots = {\n    root: ['root', `rows${capitalize(rows)}`],\n  };\n\n  return composeClasses(slots, getCalendarUtilityClass, classes);\n};\n\nconst CalendarRoot = styled('div', {\n  name: 'ESCalendar',\n  slot: 'Root',\n  overridesResolver: (props, styles) => {\n    const {\n      ownerState: { rows },\n    } = props;\n\n    return [styles.root, styles[`rows${capitalize(rows)}`]];\n  },\n})<{ ownerState: CalendarOwnerState }>(() => ({\n  display: 'grid',\n  gridTemplateColumns: 'repeat(7, 1fr)',\n  rowGap: '4px',\n  padding: '12px',\n\n  [`&.${calendarClasses.rowsMax}`]: {\n    gridTemplateRows: 'repeat(6, 1fr)',\n  },\n}));\n\n/** The calendar allows users to pick a date or a range of dates. */\nexport const Calendar = (inProps: CalendarProps) => {\n  const {\n    className,\n    sx,\n    year,\n    month,\n    weekStart = 1,\n    rows = 'max',\n    selection,\n    hover,\n    showPrevMonth,\n    showNextMonth,\n    onSelectionChange,\n    onHover,\n    getButtonDisabled,\n    getButtonTooltipProps,\n    ...props\n  } = useThemeProps({\n    props: inProps,\n    name: 'ESCalendar',\n  });\n\n  const { adapter } = useDateAdapterContext();\n\n  if (adapter === undefined) {\n    throw new Error('No provider for DateAdapterContext.');\n  }\n\n  const { dates, prevDates, nextDates } = useCalendar(year, month, weekStart);\n\n  const ownerState = { rows, ...props };\n  const classes = useUtilityClasses(ownerState);\n\n  const getButtonProps = (year: number, month: number, date: number) => {\n    const current = new Date(year, month, date);\n\n    let position: CalendarButtonProps['position'] = undefined;\n    let selected = false;\n    let hovered = false;\n\n    if (selection && selection[0]) {\n      const start = new Date(selection[0]);\n      const end = selection[1] ? new Date(selection[1]) : null;\n\n      let range = [start, end] as [Date, Date | null];\n      let rangeHover = [start, end || hover] as [Date, Date | null];\n\n      if (range[0] && range[1] && range[0] > range[1]) {\n        range = range.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[0] && rangeHover[1] && rangeHover[0] > rangeHover[1]) {\n        rangeHover = rangeHover.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[1] && adapter.isWithinRange(current, rangeHover as [Date, Date])) {\n        position = 'between';\n      }\n\n      if (adapter.isSameDay(rangeHover[0], current)) {\n        position = 'start';\n      }\n\n      if (rangeHover[1] && adapter.isSameDay(rangeHover[1], current)) {\n        position = 'end';\n      }\n\n      if (\n        adapter.isSameDay(range[0], current) ||\n        (range[0] && range[1] && adapter.isWithinRange(current, range as [Date, Date]))\n      ) {\n        selected = true;\n      }\n\n      if (hover && rangeHover[1] && !adapter.isSameDay(rangeHover[0], rangeHover[1])) {\n        hovered = adapter.isWithinRange(current, rangeHover as [Date, Date]);\n      }\n    }\n\n    const disabled = getButtonDisabled?.(current);\n\n    return {\n      position,\n      disabled,\n      selected,\n      hovered,\n      today: adapter.isSameDay(new Date(), current),\n      onClick: () => !disabled && onSelectionChange?.(current),\n      onHover: () => !disabled && onHover?.(current),\n      TooltipProps: getButtonTooltipProps?.(current),\n    };\n  };\n\n  return (\n    <CalendarRoot className={clsx(classes.root, className)} ownerState={ownerState} sx={sx}>\n      {prevDates.map((date) =>\n        showPrevMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month - 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n      {dates.map((date) => (\n        <CalendarButton key={date} {...getButtonProps(year, month, date)}>\n          {date}\n        </CalendarButton>\n      ))}\n      {nextDates.map((date) =>\n        showNextMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month + 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n    </CalendarRoot>\n  );\n};\n"
  },
  {
    logo: "https://img.icons8.com/office/96/000000/react.png",
    title: "React/Next.js Ecosystem",
    description: "Full-stack разработка с SSR и оптимизацией",
    gist: "https://gist.github.com/AlbetItrum/53512aea9f6c3a439043a92ee513c38a",
    content: "type TRouting = {\n  routes: TRouteProps[];\n};\n\nconst Routing = ({ routes }: TRouting) => {\n  const { roles } = appStore;\n\n  const allowedRouteList = useGetAllowedRoutes(routes, roles);\n\n  return (\n    <Suspense fallback={<Loader text=\"Loading\" />}>\n      <Switch>\n        <Redirect exact from={urls.ROOT} to={urls.HOME} />\n\n        {allowedRouteList.map(({ path, exact, component, isPrivate }) => {\n          if (isPrivate) {\n            return <PrivateRoute key={`${path}`} component={component} exact={exact} path={path} />;\n          }\n\n          return <Route key={`${path}`} component={component} exact={exact} path={path} />;\n        })}\n      </Switch>\n    </Suspense>\n  );\n};\n\nexport default observer(Routing);",
  },
  {
    logo: "https://redux.js.org/img/redux.svg",
    title: "Redux Toolkit + RTK Query",
    description: "Эффективное управление состоянием и кэширование",
    gist: "https://gist.github.com/AlbetItrum/e65ec1f257f821326e8ac6db4dc504a9",
    content: "import { CalendarProps } from './Calendar.types';\n\nimport clsx from 'clsx';\nimport { calendarClasses, getCalendarUtilityClass } from './Calendar.classes';\n\nimport { unstable_composeClasses as composeClasses } from '@mui/base';\n\nimport { styled, useThemeProps } from '@mui/material/styles';\nimport { capitalize } from '@mui/material/utils';\n\nimport { CalendarButton, CalendarButtonProps } from './CalendarButton';\nimport { useCalendar } from './useCalendar';\n\nimport { useDateAdapterContext } from '../DateAdapter';\n\ntype CalendarOwnerState = {\n  classes?: CalendarProps['classes'];\n  rows: NonNullable<CalendarProps['rows']>;\n};\n\nconst useUtilityClasses = (ownerState: CalendarOwnerState) => {\n  const { classes, rows } = ownerState;\n\n  const slots = {\n    root: ['root', `rows${capitalize(rows)}`],\n  };\n\n  return composeClasses(slots, getCalendarUtilityClass, classes);\n};\n\nconst CalendarRoot = styled('div', {\n  name: 'ESCalendar',\n  slot: 'Root',\n  overridesResolver: (props, styles) => {\n    const {\n      ownerState: { rows },\n    } = props;\n\n    return [styles.root, styles[`rows${capitalize(rows)}`]];\n  },\n})<{ ownerState: CalendarOwnerState }>(() => ({\n  display: 'grid',\n  gridTemplateColumns: 'repeat(7, 1fr)',\n  rowGap: '4px',\n  padding: '12px',\n\n  [`&.${calendarClasses.rowsMax}`]: {\n    gridTemplateRows: 'repeat(6, 1fr)',\n  },\n}));\n\n/** The calendar allows users to pick a date or a range of dates. */\nexport const Calendar = (inProps: CalendarProps) => {\n  const {\n    className,\n    sx,\n    year,\n    month,\n    weekStart = 1,\n    rows = 'max',\n    selection,\n    hover,\n    showPrevMonth,\n    showNextMonth,\n    onSelectionChange,\n    onHover,\n    getButtonDisabled,\n    getButtonTooltipProps,\n    ...props\n  } = useThemeProps({\n    props: inProps,\n    name: 'ESCalendar',\n  });\n\n  const { adapter } = useDateAdapterContext();\n\n  if (adapter === undefined) {\n    throw new Error('No provider for DateAdapterContext.');\n  }\n\n  const { dates, prevDates, nextDates } = useCalendar(year, month, weekStart);\n\n  const ownerState = { rows, ...props };\n  const classes = useUtilityClasses(ownerState);\n\n  const getButtonProps = (year: number, month: number, date: number) => {\n    const current = new Date(year, month, date);\n\n    let position: CalendarButtonProps['position'] = undefined;\n    let selected = false;\n    let hovered = false;\n\n    if (selection && selection[0]) {\n      const start = new Date(selection[0]);\n      const end = selection[1] ? new Date(selection[1]) : null;\n\n      let range = [start, end] as [Date, Date | null];\n      let rangeHover = [start, end || hover] as [Date, Date | null];\n\n      if (range[0] && range[1] && range[0] > range[1]) {\n        range = range.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[0] && rangeHover[1] && rangeHover[0] > rangeHover[1]) {\n        rangeHover = rangeHover.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[1] && adapter.isWithinRange(current, rangeHover as [Date, Date])) {\n        position = 'between';\n      }\n\n      if (adapter.isSameDay(rangeHover[0], current)) {\n        position = 'start';\n      }\n\n      if (rangeHover[1] && adapter.isSameDay(rangeHover[1], current)) {\n        position = 'end';\n      }\n\n      if (\n        adapter.isSameDay(range[0], current) ||\n        (range[0] && range[1] && adapter.isWithinRange(current, range as [Date, Date]))\n      ) {\n        selected = true;\n      }\n\n      if (hover && rangeHover[1] && !adapter.isSameDay(rangeHover[0], rangeHover[1])) {\n        hovered = adapter.isWithinRange(current, rangeHover as [Date, Date]);\n      }\n    }\n\n    const disabled = getButtonDisabled?.(current);\n\n    return {\n      position,\n      disabled,\n      selected,\n      hovered,\n      today: adapter.isSameDay(new Date(), current),\n      onClick: () => !disabled && onSelectionChange?.(current),\n      onHover: () => !disabled && onHover?.(current),\n      TooltipProps: getButtonTooltipProps?.(current),\n    };\n  };\n\n  return (\n    <CalendarRoot className={clsx(classes.root, className)} ownerState={ownerState} sx={sx}>\n      {prevDates.map((date) =>\n        showPrevMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month - 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n      {dates.map((date) => (\n        <CalendarButton key={date} {...getButtonProps(year, month, date)}>\n          {date}\n        </CalendarButton>\n      ))}\n      {nextDates.map((date) =>\n        showNextMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month + 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n    </CalendarRoot>\n  );\n};\n"

  },
  {
    logo: "https://img.icons8.com/color/96/000000/css3.png",
    title: "Modern Styling",
    description: "Адаптивный UI с компонентным подходом",
    gist: "https://gist.github.com/AlbetItrum/e65ec1f257f821326e8ac6db4dc504a9",
    content: "type TRouting = {\n  routes: TRouteProps[];\n};\n\nconst Routing = ({ routes }: TRouting) => {\n  const { roles } = appStore;\n\n  const allowedRouteList = useGetAllowedRoutes(routes, roles);\n\n  return (\n    <Suspense fallback={<Loader text=\"Loading\" />}>\n      <Switch>\n        <Redirect exact from={urls.ROOT} to={urls.HOME} />\n\n        {allowedRouteList.map(({ path, exact, component, isPrivate }) => {\n          if (isPrivate) {\n            return <PrivateRoute key={`${path}`} component={component} exact={exact} path={path} />;\n          }\n\n          return <Route key={`${path}`} component={component} exact={exact} path={path} />;\n        })}\n      </Switch>\n    </Suspense>\n  );\n};\n\nexport default observer(Routing);",

  },
  {
    logo: "https://img.icons8.com/color/96/000000/docker.png",
    title: "Development Tools",
    description: "Профессиональная среда разработки и деплоя",
    gist: "https://gist.github.com/AlbetItrum/e65ec1f257f821326e8ac6db4dc504a9",
    content: "import { CalendarProps } from './Calendar.types';\n\nimport clsx from 'clsx';\nimport { calendarClasses, getCalendarUtilityClass } from './Calendar.classes';\n\nimport { unstable_composeClasses as composeClasses } from '@mui/base';\n\nimport { styled, useThemeProps } from '@mui/material/styles';\nimport { capitalize } from '@mui/material/utils';\n\nimport { CalendarButton, CalendarButtonProps } from './CalendarButton';\nimport { useCalendar } from './useCalendar';\n\nimport { useDateAdapterContext } from '../DateAdapter';\n\ntype CalendarOwnerState = {\n  classes?: CalendarProps['classes'];\n  rows: NonNullable<CalendarProps['rows']>;\n};\n\nconst useUtilityClasses = (ownerState: CalendarOwnerState) => {\n  const { classes, rows } = ownerState;\n\n  const slots = {\n    root: ['root', `rows${capitalize(rows)}`],\n  };\n\n  return composeClasses(slots, getCalendarUtilityClass, classes);\n};\n\nconst CalendarRoot = styled('div', {\n  name: 'ESCalendar',\n  slot: 'Root',\n  overridesResolver: (props, styles) => {\n    const {\n      ownerState: { rows },\n    } = props;\n\n    return [styles.root, styles[`rows${capitalize(rows)}`]];\n  },\n})<{ ownerState: CalendarOwnerState }>(() => ({\n  display: 'grid',\n  gridTemplateColumns: 'repeat(7, 1fr)',\n  rowGap: '4px',\n  padding: '12px',\n\n  [`&.${calendarClasses.rowsMax}`]: {\n    gridTemplateRows: 'repeat(6, 1fr)',\n  },\n}));\n\n/** The calendar allows users to pick a date or a range of dates. */\nexport const Calendar = (inProps: CalendarProps) => {\n  const {\n    className,\n    sx,\n    year,\n    month,\n    weekStart = 1,\n    rows = 'max',\n    selection,\n    hover,\n    showPrevMonth,\n    showNextMonth,\n    onSelectionChange,\n    onHover,\n    getButtonDisabled,\n    getButtonTooltipProps,\n    ...props\n  } = useThemeProps({\n    props: inProps,\n    name: 'ESCalendar',\n  });\n\n  const { adapter } = useDateAdapterContext();\n\n  if (adapter === undefined) {\n    throw new Error('No provider for DateAdapterContext.');\n  }\n\n  const { dates, prevDates, nextDates } = useCalendar(year, month, weekStart);\n\n  const ownerState = { rows, ...props };\n  const classes = useUtilityClasses(ownerState);\n\n  const getButtonProps = (year: number, month: number, date: number) => {\n    const current = new Date(year, month, date);\n\n    let position: CalendarButtonProps['position'] = undefined;\n    let selected = false;\n    let hovered = false;\n\n    if (selection && selection[0]) {\n      const start = new Date(selection[0]);\n      const end = selection[1] ? new Date(selection[1]) : null;\n\n      let range = [start, end] as [Date, Date | null];\n      let rangeHover = [start, end || hover] as [Date, Date | null];\n\n      if (range[0] && range[1] && range[0] > range[1]) {\n        range = range.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[0] && rangeHover[1] && rangeHover[0] > rangeHover[1]) {\n        rangeHover = rangeHover.reverse() as [Date, Date];\n      }\n\n      if (rangeHover[1] && adapter.isWithinRange(current, rangeHover as [Date, Date])) {\n        position = 'between';\n      }\n\n      if (adapter.isSameDay(rangeHover[0], current)) {\n        position = 'start';\n      }\n\n      if (rangeHover[1] && adapter.isSameDay(rangeHover[1], current)) {\n        position = 'end';\n      }\n\n      if (\n        adapter.isSameDay(range[0], current) ||\n        (range[0] && range[1] && adapter.isWithinRange(current, range as [Date, Date]))\n      ) {\n        selected = true;\n      }\n\n      if (hover && rangeHover[1] && !adapter.isSameDay(rangeHover[0], rangeHover[1])) {\n        hovered = adapter.isWithinRange(current, rangeHover as [Date, Date]);\n      }\n    }\n\n    const disabled = getButtonDisabled?.(current);\n\n    return {\n      position,\n      disabled,\n      selected,\n      hovered,\n      today: adapter.isSameDay(new Date(), current),\n      onClick: () => !disabled && onSelectionChange?.(current),\n      onHover: () => !disabled && onHover?.(current),\n      TooltipProps: getButtonTooltipProps?.(current),\n    };\n  };\n\n  return (\n    <CalendarRoot className={clsx(classes.root, className)} ownerState={ownerState} sx={sx}>\n      {prevDates.map((date) =>\n        showPrevMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month - 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n      {dates.map((date) => (\n        <CalendarButton key={date} {...getButtonProps(year, month, date)}>\n          {date}\n        </CalendarButton>\n      ))}\n      {nextDates.map((date) =>\n        showNextMonth ? (\n          <CalendarButton key={date} inactive {...getButtonProps(year, month + 1, date)}>\n            {date}\n          </CalendarButton>\n        ) : (\n          <span key={date} />\n        )\n      )}\n    </CalendarRoot>\n  );\n};\n"
  },
  {
    logo: "https://img.icons8.com/color/96/000000/postgreesql.png",
    title: "Database Management",
    description: "Реляционные и NoSQL решения",
    gist: "https://gist.github.com/AlbetItrum/e65ec1f257f821326e8ac6db4dc504a9",
    content: "type TRouting = {\n  routes: TRouteProps[];\n};\n\nconst Routing = ({ routes }: TRouting) => {\n  const { roles } = appStore;\n\n  const allowedRouteList = useGetAllowedRoutes(routes, roles);\n\n  return (\n    <Suspense fallback={<Loader text=\"Loading\" />}>\n      <Switch>\n        <Redirect exact from={urls.ROOT} to={urls.HOME} />\n\n        {allowedRouteList.map(({ path, exact, component, isPrivate }) => {\n          if (isPrivate) {\n            return <PrivateRoute key={`${path}`} component={component} exact={exact} path={path} />;\n          }\n\n          return <Route key={`${path}`} component={component} exact={exact} path={path} />;\n        })}\n      </Switch>\n    </Suspense>\n  );\n};\n\nexport default observer(Routing);",
  }
];

export const myWorkData = {
  title: 'My Work',
  frames: [
    'Deployed scalable, responsive web and hybrid mobile apps that served hundreds of thousands of clients.',
    'Focused on high-performing applications with intuitive and dynamic interactions. I also have a passion for data analytics and visualization.',
  ],
  videoUrl: 'https://www.pexels.com/download/video/2278095/',
};

export const workCardsData: WorkCardData[] = [
  {
    title: 'Ореол Жизни',
    description: 'A personal portfolio showcasing my web development projects with a focus on UX.',
    stack: ['React', 'TypeScript', 'Next.js', 'Redux', 'React Hook Form', 'FSD', 'GitHub Actions', 'React Testing Library','SCSS'],
    images: [
      {
        src: './images/halolife5.png',
        description: 'Автономная некоммерческая организация по оказанию всесторонней помощи пациентам с онкологическим диагнозом и их близким - Ореол Жизни'
      },
      {
        src: './images/halolife3.png', 
        description: 'Виджет отображения постов. Telegram Интеграция с Telegram API для встраивания контента. Компонент показа телеграм-ленты в реальном времени'
      },
      {
        src: './images/img10',
        description: 'Адаптивная версия для мобильных устройств'
      }
    ],  },
  {
    title: 'ProCharity',
    description: '— поиск интеллектуальных волонтеров для благотворительных организаций.',
    stack: ['React', 'TypeScript', 'Redux', 'SCSS','Storybook','Docker','MongoDB', 'GitHub Actions'],
    images: [
      {
        src: './images/pro5.png',
        description: 'ProCharity — это возможность для профессионалов своего дела помочь некоммерческим организациям в вопросах, которые требуют специальных знаний и опыта.'
      },
      {
        src: './images/pro2.png',
        description: 'Гибкая система управления доступом. Разделение функционала по типам пользователей. Безопасная авторизация с персональным интерфейсом.'
      },
      {
        src: './images/pro3.png',
        description: 'Динамическая форма с полями разных типов. Интеграция загрузки фото и документов. Система валидации и предобработки файлов.'
      },
      {
        src: './images/pro4.png',
        description: 'Система компонентов для визуального контента. Адаптивные баннеры с градиентными overlay. Карточки с hover-эффектами и микроанимациями.'
      },
      {
        src: './images/pro6.png',
        description: 'Интерактивные компоненты с микровзаимодействиями. Сложные состояния: loading, disabled, success. Плавные переходы между состояниями интерфейса.'
      }
    ],  },
  {
    title: 'TechGadget',
    description: 'Интернет-магазин электроники.',
    stack: ['React', 'TypeScript', 'MUI', 'Styled Components', 'ESLint', 'Prettier'],
    images: [
      {
        src: './images/tg1.png',
        description: 'Продуктовые карточки с детальной информацией и галереей. Интеграция системы корзины и быстрого заказа. Визуальная витрина с grid/layout представлением.'
      },
      {
        src: './images/tg2.png',
        description: 'Интерактивная корзина товаров с полным управлением. Быстрый переход к товарам и оформлению заказа. Динамическое обновление суммы и количества позиций.'
      },
      {
        src: './images/tg3.png',
        description: 'Комплексная карточка товара с полным набором взаимодействий. Интерактивный слайдер фотографий и детальная информация. Система рейтингов, отзывов и управления предпочтениями.'
      },
      {
        src: './images/tg4.png',
        description: 'Чистые формы входа и регистрации без лишних элементов. Быстрое восстановление доступа в несколько кликов. Упрощенный процесс верификации пользователей.'
      },
      {
        src: './images/tg5.png',
        description: 'Система управления персональными предпочтениями. Добавление товаров в избранное и создание коллекций. Публикация и модерация пользовательских отзывов.'
      }
    ],  },
];

export const contactsData: ContactItem[] = [
  { type: 'phone', action: '+1234567890' },
  { type: 'email', action: 'email@example.com' },
  { type: 'telegram', action: 'https://t.me/username' },
  { type: 'github', action: 'https://github.com/username' },
];