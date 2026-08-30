## ⚡ 주요 기능

### init

```bash
npx @jongh/cli init
```

- 사용자의 `tsconfig.json` 경로 설정에서 base alias를 찾습니다
- 이후 코드가 저장될 components, hooks, utils 경로를 `components.json`에 저장합니다

### add

```bash
npx @jongh/cli add [name]
```

- 원격 Registry에서 항목의 파일을 가져와 `components.json`에 명시된 경로에 저장합니다
- 컴포넌트 코드뿐 아니라 hook, util 파일과 패키지 의존성도 함께 처리합니다

### codemod: radix-ui-import

```bash
npx @jongh/cli radix-ui-import
```

- 최근 변경된 Radix UI의 설치 방식에 맞게 기존 코드를 자동으로 변환합니다
- 기존에 사용하던 import statement 방식에 따라 변경사항이 다를 수 있습니다

**변환 예시:**

```javascript
// before
import * as AccordionPrimitive from "@radix-ui/react-accordion"

// after
import { Accordion as AccordionPrimitive } from "radix-ui"
```
