## ⚡ 주요 기능

### init

```bash
npx @jongh/cli init
```

- primary / secondary / grey color를 입력받아, 컴포넌트 스타일의 기반이 될 preset을 생성합니다
- 사용자의 경로 설정 파일을 분석하여 이후 코드가 저장될 장소를 components.json이라는 파일에 저장합니다

### add

```bash
npx @jongh/cli add [component-name]
```

- 원격 Registry에서 컴포넌트 코드를 가져와 components.json에 명시된 경로에 저장합니다
- ui 코드 뿐 아니라 hook,util 등의 코드도 같이 저장될 수 있습니다

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
