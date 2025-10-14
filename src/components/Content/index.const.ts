import { ContactItem, TechStackItem, WorkCardData } from "./types";

export const stackArray: TechStackItem[] = [
  {
    logo: "https://img.icons8.com/color/96/000000/javascript.png",
    title: "JavaScript/TypeScript",
    description: `Современный ES6+ и строгая типизация:
    \n- деструктуризация, спред-операторы, стрелочные функции
    \n- async/await, промисы, модульная система
    \n- классы, наследование, статические методы`,
    gist: "https://gist.github.com/Andrey68Vyazovov/17c0ff4a408a344663536360459e01d2",
    content: "import clsx from 'clsx';\nimport styles from './Text.module.scss';\nimport React from 'react';\nimport { TextVariants } from '@/components/Core/Typography/Text/TextVariants.tsx';\n\nexport type TextTag = keyof React.JSX.IntrinsicElements;\n\nexport type TextProps = {\n\tclassName?: string;\n\tchildren?: React.ReactNode;\n\tvariant?: TextVariants | keyof typeof TextVariants;\n\tTag?: TextTag;\n};\n\nexport function Text({\n\tclassName,\n\tchildren,\n\tvariant = TextVariants.normal,\n\tTag = 'span',\n}: TextProps) {\n\treturn (\n\t\t<Tag\n\t\t\tclassName={clsx(styles.container, className, styles[variant])}\n\t\t\tdata-testid=\"Text\"\n\t\t>\n\t\t\t{children}\n\t\t</Tag>\n\t);\n}\n",
  },
  {
    logo: "https://img.icons8.com/office/96/000000/react.png",
    title: "React/Next.js Ecosystem",
    description: `Full-stack разработка с SSR и оптимизацией:
    \n- React 18 с хуками и состояниями
    \n- WebSocket для реального времени
    \n- TypeScript для типобезопасности
    \n- Next.js Image для оптимизации`,
    gist: "https://gist.github.com/Andrey68Vyazovov/4f729d77d15a7149d345032845c03b09",
    content: "import { GetServerSideProps } from 'next';\nimport { useState, useEffect } from 'react';\nimport dynamic from 'next/dynamic';\n\ninterface User { id: number; name: string; avatar: string; }\n\nconst UserStats = dynamic(() => import('./UserStats'), { \n  loading: () => <div>Loading stats...</div>,\n  ssr: false \n});\n\nexport const getServerSideProps: GetServerSideProps = async (ctx) => {\n  const user = await fetch(`https://api.example.com/users/${ctx.params?.id}`, {\n    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' }\n  }).then(res => res.json());\n\n  return { props: { user } };\n};\n\nexport default function OptimizedProfile({ user }: { user: User }) {\n  const [realTimeData, setRealTimeData] = useState(user);\n\n  useEffect(() => {\n    const ws = new WebSocket(`wss://api.example.com/users/${user.id}/live`);\n    ws.onmessage = (event) => setRealTimeData(JSON.parse(event.data));\n    return () => ws.close();\n  }, [user.id]);\n\n  return (\n    <div>\n      <Image \n        src={user.avatar} \n        alt={user.name}\n        width={150} \n        height={150}\n        priority\n        placeholder=\"blur\"\n        blurDataURL=\"data:image/jpeg;base64,...\"\n      />\n      <h1>{realTimeData.name}</h1>\n      <UserStats userId={user.id} />\n    </div>\n  );\n}",  },
  {
    logo: "https://redux.js.org/img/redux.svg",
    title: "Redux Toolkit + TypeScript",
    description: `Эффективное управление состоянием и API взаимодействие:
    \n- Redux Toolkit с типизированными асинхронными действиями
    \n- Безопасное API взаимодействие с авторизацией
    \n- Трансформация данных между клиентом и сервером`,
    gist: "https://gist.github.com/Andrey68Vyazovov/a980970f262b46dd82bab94c0e61bd98",
    content: "import { createAsyncThunk } from '@reduxjs/toolkit';\nimport { ApiError, Product, BackendProductsResponse, BackendProductResponse } from './types';\nimport { mapBackendProductToFrontend, mapFrontendProductToBackend } from '../utils/productMappers';\nimport apiClient from '~utils/apiClient';\n\nexport const getAllProductsFromBackend = createAsyncThunk<\n  Product[],\n  void,\n  { rejectValue: ApiError }\n>('products/fetchFromBackend', async (_, { rejectWithValue }) => {\n  try {\n    const response = await apiClient.get<BackendProductsResponse>('/products');\n\n    if (response.data.success) {\n      return response.data.products.map(mapBackendProductToFrontend);\n    }\n    \n    return rejectWithValue({ message: 'Failed to fetch products' });\n  } catch (error) {\n    return rejectWithValue({\n      message: error instanceof Error ? error.message : 'Fetch error'\n    });\n  }\n});\n\nexport const createProductInBackend = createAsyncThunk<\n  Product,\n  Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,\n  { rejectValue: ApiError }\n>('products/createInBackend', async (productData, { rejectWithValue }) => {\n  try {\n    const accessKey = localStorage.getItem('storeAuth_accessKey');\n    if (!accessKey) throw new Error('Not authenticated');\n\n    const response = await apiClient.post<BackendProductResponse>(\n      '/products', \n      mapFrontendProductToBackend(productData), \n      { headers: { 'X-Store-Access-Key': accessKey } }\n    );\n\n    if (response.data.success) {\n      return mapBackendProductToFrontend(response.data.product);\n    }\n    \n    throw new Error('Failed to create product');\n  } catch (error) {\n    return rejectWithValue({\n      message: error instanceof Error ? error.message : 'Creation error'\n    });\n  }\n});",
  },
  {
    logo: "https://img.icons8.com/color/96/000000/css3.png",
    title: "Modern Styling",
    description: `Адаптивный UI с компонентным подходом:
    \n- CSS Modules/SCSS/Styled components
    \n- Адаптивный дизайн  
    \n- CSS Grid и Flexbox
    \n- Анимации и переходы для улучшения UX`,
    gist: "https://gist.github.com/Andrey68Vyazovov/44643858db456bbc6eeb8eafd39ae0a3",
    content: "import { Paper } from '@mui/material';\nimport { styled } from '@mui/material/styles';\n\nexport const CheckoutLayoutRoot = styled('main')(({ theme }) => ({\n  width: 'auto',\n  marginLeft: theme.spacing(2),\n  marginRight: theme.spacing(2),\n\n  [theme.breakpoints.up(600 + parseInt(theme.spacing(7)) * 2)]: {\n    width: 600,\n    marginLeft: 'auto',\n    marginRight: 'auto',\n  },\n}));\n\nexport const CheckoutLayoutPaper = styled(Paper)(({ theme }) => ({\n  marginTop: theme.spacing(3),\n  marginBottom: theme.spacing(3),\n  padding: theme.spacing(2),\n\n  [theme.breakpoints.up(600 + parseInt(theme.spacing(3)) * 2)]: {\n    marginTop: theme.spacing(6),\n    marginBottom: theme.spacing(6),\n    padding: theme.spacing(3),\n  },\n}));\n",
  },
  {
    logo: "https://img.icons8.com/color/96/000000/docker.png",
    title: "Development Tools",
    description: `Профессиональная среда разработки и деплоя:
    \n- Storybook
    \n- Postman
    \n- Docker для контейнеризации и развертывания приложений
    \n- GitHub Actions для CI/CD пайплайнов`,
    gist: "https://gist.github.com/Andrey68Vyazovov/652076bf6cb884367ef69afa58dbab30",
    content: "import type { Meta, StoryObj } from '@storybook/react';\nimport { expect, fn, within } from '@storybook/test';\n\nimport { Button } from './Button';\nimport { ButtonType, ButtonVariant } from '@/components/Common/Button/types';\n\nconst meta = {\n\ttitle: 'Common/Actions/Button',\n\tcomponent: Button,\n\tparameters: {\n\t\tlayout: 'centered',\n\t},\n\ttags: ['autodocs'],\n\targTypes: {\n\t\tvariant: {\n\t\t\tcontrol: { type: 'select' },\n\t\t\toptions: Object.values(ButtonVariant),\n\t\t},\n\t\ttype: {\n\t\t\tcontrol: { type: 'radio' },\n\t\t\toptions: Object.values(ButtonType),\n\t\t},\n\t},\n\targs: {\n\t\tchildren: 'Button Label',\n\t\tonClick: fn(),\n\t},\n} satisfies Meta<typeof Button>;\n\nexport default meta;\ntype Story = StoryObj<typeof meta>;\n\nexport const Default: Story = {\n\targs: {},\n\tplay: async ({ canvasElement }) => {\n\t\tconst canvas = within(canvasElement);\n\t\tconst element = canvas.getByTestId('Button');\n\t\tawait expect(element).toBeInTheDocument();\n\t},\n};\n\nconst Variants = Object.values(ButtonVariant);\n\nexport const Styles: Story = {\n\trender: (props) => (\n\t\t<div\n\t\t\tstyle={{\n\t\t\t\tdisplay: 'grid',\n\t\t\t\tgridTemplateColumns: `repeat(${Variants.length}, 1fr)`,\n\t\t\t\tgap: '2rem',\n\t\t\t}}\n\t\t>\n\t\t\t{Variants.map((variant) => (\n\t\t\t\t<Button {...props} key={variant} variant={variant} />\n\t\t\t))}\n\t\t\t{Variants.map((variant) => (\n\t\t\t\t<Button {...props} key={variant} variant={variant} disabled={true} />\n\t\t\t))}\n\t\t\t{Variants.map((variant) => (\n\t\t\t\t<Button {...props} key={variant} variant={variant} waiting={true} />\n\t\t\t))}\n\t\t</div>\n\t),\n};\n",
  },
  {
    logo: "https://img.icons8.com/color/96/000000/postgreesql.png",
    title: "Database Management",
    description: `Работа с базами данных:
    \n- Реляционные БД (PostgreSQL, MySQL) - схемы, связи, запросы
    \n- NoSQL решения (MongoDB) - документная модель, агрегации  
    \n- Проектирование структуры данных под разные задачи`,
    gist: "https://gist.github.com/Andrey68Vyazovov/69f41f73405ea61644f3fe39820b0c01",
    content: "import mongoose from 'mongoose';\n\nconst productSchema = new mongoose.Schema({\n  title: { \n    type: String, \n    required: [true, 'Product title is required'],\n    trim: true,\n    maxlength: [100, 'Title cannot exceed 100 characters']\n  },\n  price: { \n    type: Number, \n    required: true,\n    min: [0, 'Price cannot be negative'],\n    set: v => Math.round(v * 100) / 100\n  },\n  \n  description: { \n    type: String, \n    maxlength: 500 \n  },\n  category: { \n    type: String,\n    index: true\n  },\n  \n  image: { \n    type: String,\n    validate: {\n      validator: function(v) {\n        return /^https?:\\/\\/.+\\..+/.test(v);\n      },\n      message: 'Invalid image URL format'\n    }\n  },\n  \n  discountPercentage: {\n    type: Number,\n    default: 0,\n    min: 0,\n    max: [100, 'Discount cannot exceed 100%']\n  },\n  rating: { \n    type: Number, \n    default: 0,\n    min: 0,\n    max: 5,\n    set: v => Math.round(v * 10) / 10\n  },\n  \n  tags: [{\n    type: String,\n    lowercase: true\n  }],\n  \n  metadata: {\n    featured: { type: Boolean, default: false },\n    stock: { type: Number, default: 0, min: 0 },\n    supplier: String\n  }\n}, {\n  timestamps: { \n    createdAt: 'createdAt', \n    updatedAt: 'updatedAt' \n  },\n  toJSON: { \n    virtuals: true,\n    transform: function(doc, ret) {\n      ret.id = ret._id;\n      delete ret._id;\n      delete ret.__v;\n      return ret;\n    }\n  }\n});\n\nproductSchema.virtual('finalPrice').get(function() {\n  return this.price * (1 - this.discountPercentage / 100);\n});\n\nproductSchema.pre('save', function(next) {\n  if (this.isModified('price') || this.isModified('discountPercentage')) {\n    this.metadata.lastPriceUpdate = new Date();\n  }\n  next();\n});\n\nproductSchema.statics.findByCategory = function(category) {\n  return this.find({ category: new RegExp(category, 'i') });\n};\n\nproductSchema.methods.applyDiscount = function(percentage) {\n  this.discountPercentage = Math.min(100, percentage);\n  return this.save();\n};\n\nproductSchema.index({ category: 1, price: -1 });\nproductSchema.index({ 'metadata.featured': 1, rating: -1 });\n\nconst Product = mongoose.model('Product', productSchema);\n\nexport default Product;",  }
];

export const myWorkData = {
  title: 'My Work',
  frames: [
    'Я Frontend-разработчик с 4-летним опытом создания сложных отзывчивых SPA и SSR-приложений на стеке React / Next.js / TypeScript. С фокусом на производительность и пользовательский опыт.',
    'Понимаю и могу настроить весь процесс — от создания интерфейсов до оптимизации (бандла, рендеринга, кеширования). Работаю с метриками Core Web Vitals, чтобы напрямую влиять на удобство, конверсию и лояльность.',
  ],
  videoUrl: 'https://www.pexels.com/download/video/2278095/',
};

export const workCardsData: WorkCardData[] = [
  {
    title: 'Ореол Жизни',
    stack: ['React', 'TypeScript', 'Next.js', 'Redux', 'React Hook Form', 'FSD', 'GitHub Actions', 'React Testing Library','SCSS'],
    images: [
      {
        src: './images/halolife5.png',
        title_description: 'описание проекта',
        description: ' Ореол Жизни - это автономная некоммерческая организация по оказанию всесторонней помощи пациентам с онкологическим диагнозом и их близким. Сайт предоставляет информацию о том, куда пациент может обратиться за поддержкой.'
      },
      {
        src: './images/halolife6.png', 
        title_description: 'мои достижения в проекте',
        description: 'Создал библиотеку из 20+ компонентов для форм, ускорив разработку на 15% и обеспечив единообразие UI.'
      },
      {
        src: './images/halolife7.png',
        title_description: 'мои достижения в проекте',
        description: 'Внедрил многоэтапную регистрацию, что повысило финальную конверсию на 18%.'
      },
      {
        src: './images/halolife8.png',
        title_description: 'мои достижения в проекте',
        description: 'Инкапсулировал логику в кастомные хуки (useForm, useValidation), сократив код компонентов на ~40% для улучшения тестируемости.'
      },
      {
        src: './images/halolife9.png',
        title_description: 'мои достижения в проекте',
        description: 'Внедрил строгую типизацию для API-слоя (TypeScript Generics), что полностью исключило ошибки, связанные с несоответствием ожидаемых и получаемых с бэкенда данных.'
      }
    ],  },
  {
    title: 'ProCharity',
    stack: ['React', 'TypeScript', 'Redux', 'SCSS','Storybook','Docker','MongoDB', 'GitHub Actions'],
    images: [
      {
        src: './images/pro1.png',
        title_description: 'описание проекта',
        description: 'ProCharity — это возможность для профессионалов своего дела помочь некоммерческим организациям в вопросах, которые требуют специальных знаний и опыта.'
      },
      {
        src: './images/pro2.png',
        title_description: 'мои достижения в проекте',
        description: 'Реализовал гибкую систему управления доступом: разделил функционал по типам пользователей и создал UI для флоу авторизации с персональным интерфейсом.'
      },
      {
        src: './images/pro3.png',
        title_description: 'мои достижения в проекте',
        description: 'Разработал компоненти динамической формы с полями разных типов. Провел интеграцию загрузки фото и документов. Внедрил систему валидации и предобработки файлов.'
      },
      {
        src: './images/pro4.png',
        title_description: 'мои достижения в проекте',
        description: 'Работал над системой компонентов для визуального контента: адаптивные баннеры с градиентными overlay, карточки с hover-эффектами и микроанимациями.'
      },
      {
        src: './images/pro6.png',
        title_description: 'мои достижения в проекте',
        description: 'Создал интерактивные компоненты с микровзаимодействиями. Кастомный Button со сложными состояниями: loading, disabled, success. Плавные переходы между состояниями интерфейса.'
      }
    ],  },
  {
    title: 'TechGadget',
    stack: ['React', 'TypeScript', 'MUI', 'Styled Components', 'ESLint', 'Prettier'],
    images: [
      {
        src: './images/tg1.png',
        title_description: 'описание проекта',
        description: 'Современное веб-приложение для электронной коммерции, предоставляющее полный набор функций как для конечных пользователей, так и для администраторов системы.'
      },
      {
        src: './images/tg2.png',
        title_description: 'мои достижения в проекте',
        description: 'Реализовал интерактивную корзину товаров с полным управлением. Быстрый переход к товарам и оформлению заказа. Динамическое обновление суммы и количества позиций.'
      },
      {
        src: './images/tg3.png',
        title_description: 'мои достижения в проекте',
        description: 'Работал над карточкой товара с полным набором взаимодействий. Интерактивный слайдер фотографий и детальная информация. Система рейтингов, отзывов и управления предпочтениями.'
      },
      {
        src: './images/tg4.png',
        title_description: 'мои достижения в проекте',
        description: 'Создал чистые формы входа и регистрации без лишних элементов. Быстрое восстановление доступа в несколько кликов. Упрощенный процесс верификации пользователей.'
      },
      {
        src: './images/tg5.png',
        title_description: 'мои достижения в проекте',
        description: 'Создал систему управления персональными предпочтениями. Добавление товаров в избранное и создание коллекций. Публикация и модерация пользовательских отзывов.'
      }
    ],  },
];

export const contactsTitle =`По вопросам сотрудничества 
                            и проектов обращайтесь 
                            в Telegram — это самый 
                            быстрый способ связаться 
                            со мной. Отвечаю 
                            в течение дня, остальные 
                            способы связи — 
                            по договоренности.`;

export const contactsData: ContactItem[] = [
  { type: 'email', action: 'andrej.vyazovov@yandex.ru' },
  { type: 'phone', action: '+7(953)125-63-00' },
  { type: 'telegram', action: 'https://t.me/vavrao68' },
  { type: 'github', action: 'https://github.com/Andrey68Vyazovov' },
];