## 소개
shadcn에서 영감을 받아, pandacss 기반의 컴포넌트 코드를 CLI를 통해 제공하는 CLI 라이브러리입니다

## 명령어

### init
```
npx @jongh/cli init
```

- 컴포넌트 스타일에 필요한 pandacss preset 파일을 생성하고, 경로 설정을 분석하여 components.json 이라는 파일을 생성합니다



### add 
```
npx @jongh/cli add [component name]
```

- 컴포넌트 코드 등 필요한 코드를 registry에서 불러온 뒤, init에서 생성된 components.json의 경로 설정을 기반으로 파일을 생성합니다




## 이 밖의 기능
- codemod 기능을 개발중입니다

### radix-ui-import
```
npx @jongh/cli radix-ui-import
```

- 최근 추가된 radix-ui [설치방법](https://www.radix-ui.com/primitives/docs/overview/introduction#incremental-adoption)에 대응하여 코드를 변환하는 CLI입니다

before
```
import * as AccordionPrimitive from '@radix-ui/react-accordion'
```

after
```
import {Accordion as AccordionPrimitive} from 'radix-ui'
```
