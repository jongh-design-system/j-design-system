/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite"
import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { useMemo, useState } from "storybook/preview-api"

import { Button } from "@/component/button/ui"

import { AnimateText } from "../component/animateText/ui"

const meta = {
  title: "Components/AnimateText",
  component: AnimateText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
AnimateText 컴포넌트는 텍스트나 엘리먼트에 애니메이션 효과를 적용하는 컴포넌트입니다.

### 주요 제약사항

1. **by prop에 따른 children 제약**:
   - \`by="lines"\`: children은 반드시 React 엘리먼트들의 배열이어야 합니다. 각 엘리먼트는 개별 라인으로 처리됩니다.
   
   \`\`\`tsx
   <AnimateText by="lines">
     <div>첫째줄</div>
     <div>둘째줄</div>
   </AnimateText>
   \`\`\`
   
   - \`by="words"\` 또는 \`by="chars"\`: children은 문자열이거나, 문자열을 포함하는 단일 React 엘리먼트여야 합니다.
   
   \`\`\`tsx
   <AnimateText by="words">
     단어 단위로 분리됩니다
   </AnimateText>
   
   // 또는
   <AnimateText by="chars">
     <p>문자 단위로 분리됩니다</p>
   </AnimateText>
   \`\`\`

   ⚠️ **주의사항**: 중첩된 태그는 지원되지 않습니다.
   
   \`\`\`tsx
   // ❌ 동작하지 않는 예시
   <AnimateText by="words">
     <div>
       <span>중첩된</span> 태그는 <b>동작하지 않습니다</b>
     </div>
   </AnimateText>
   
   // ✅ 올바른 사용
   <AnimateText by="words">
     <div>중첩 없이 단순한 텍스트만 사용해야 합니다</div>
   </AnimateText>
   \`\`\`

2. **애니메이션 종류**:
   현재 구현된 애니메이션은 fade 계열로 제한됩니다:
   - fadeUp: 아래에서 위로 (y: 30 → 0)
   - fadeDown: 위에서 아래로 (y: -30 → 0)
   - fadeLeft: 오른쪽에서 왼쪽으로 (x: 30 → 0)
   - fadeRight: 왼쪽에서 오른쪽으로 (x: -30 → 0)
   
   \`\`\`tsx
   // fade 애니메이션 예시
   <AnimateText animation="fadeUp">위로 페이드인</AnimateText>
   <AnimateText animation="fadeLeft">왼쪽으로 페이드인</AnimateText>
   \`\`\`
   
3. **애니메이션 동작 방식**:
   - 모든 애니메이션은 opacity와 transform을 조합하여 사용합니다
   - spring 타입의 트랜지션이 적용되며 bounce 값은 0.4로 고정되어 있습니다
   - exit 애니메이션의 stagger 방향은 정방향으로 고정되어 있습니다 (staggerDirection: 1)

   \`\`\`tsx
   // 타이밍 조절 예시
   <AnimateText
     animation="fadeUp"
     staggerDelay={0.1}  // 각 요소 간 지연 시간
     itemDelay={0.2}     // 전체 시작 지연 시간
     duration={0.5}      // 개별 요소 애니메이션 지속 시간
   >
     애니메이션 타이밍 조절
   </AnimateText>
   \`\`\`

4. **리렌더링과 메모이제이션**:
   컴포넌트는 기본적으로 메모이제이션되어 있지만(\`memo\`), children이 매 렌더링마다 새로 생성되면 불필요한 애니메이션이 재실행될 수 있습니다.
   
   \`\`\`tsx
   // ❌ 매 렌더링마다 애니메이션이 재실행되는 예시
   function ParentComponent() {
     const [count, setCount] = useState(0)
     
     return (
       <div>
         <button onClick={() => setCount(count + 1)}>
           카운트: {count}
         </button>
         <AnimateText by="words">
           {/* 매 렌더링마다 새로운 객체가 생성됨 */}
           <div>이 텍스트는 매번 애니메이션이 재실행됩니다</div>
         </AnimateText>
       </div>
     )
   }
   
   // ✅ children을 메모이제이션하여 불필요한 재실행 방지
   function ParentComponent() {
     const [count, setCount] = useState(0)
     
     const memoizedContent = useMemo(
       () => (
         <AnimateText by="words">
           <div>이 텍스트는 한 번만 애니메이션이 실행됩니다</div>
         </AnimateText>
       ),
       [] // 의존성 배열이 비어있으므로 최초 렌더링시에만 생성
     )
     
     return (
       <div>
         <button onClick={() => setCount(count + 1)}>
           카운트: {count}
         </button>
         {memoizedContent}
       </div>
     )
   }
   \`\`\`

   💡 **Tip**: 동적인 내용이 필요한 경우, 해당 값들을 의존성 배열에 추가하여 필요한 경우에만 애니메이션이 재실행되도록 할 수 있습니다.
   
   \`\`\`tsx
   const memoizedContent = useMemo(
     () => (
       <AnimateText by="words">
         <div>현재 카운트: {count}</div>
       </AnimateText>
     ),
     [count] // count가 변경될 때만 애니메이션 재실행
   )
   \`\`\``,
      },
    },
  },
  argTypes: {
    by: {
      control: "select",
      options: ["words", "chars", "lines"],
      description: "텍스트를 애니메이션화할 단위를 선택합니다.",
      table: {
        type: { summary: "'words' | 'chars' | 'lines'" },
        defaultValue: { summary: "lines" },
      },
    },
    animation: {
      control: "select",
      options: ["fadeUp", "fadeDown", "fadeLeft", "fadeRight"],
      description: "애니메이션 효과의 종류를 선택합니다.",
      table: {
        type: { summary: "'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight'" },
        defaultValue: { summary: "fadeUp" },
      },
    },
    staggerDelay: {
      control: { type: "number" },
      description: "각 애니메이션 요소 간의 지연 시간(초)을 설정합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0.1" },
      },
    },
    itemDelay: {
      control: { type: "number" },
      description: "전체 애니메이션 시작 전 대기 시간(초)을 설정합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    duration: {
      control: { type: "number" },
      description: "각 애니메이션의 지속 시간(초)을 설정합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0.6" },
      },
    },
  },
} satisfies Meta<typeof AnimateText>

export default meta

type Story = StoryObj<typeof meta>

const Text = ({ children }: { children: ReactNode }) => {
  return <h1 style={{ fontSize: "100px" }}>{children}</h1>
}

export const Primary: Story = {
  args: {
    by: "words",
    animation: "fadeUp",
    staggerDelay: 0.1,
    duration: 0.6,
    children: "안녕하세요 AnimateText 컴포넌트입니다",
  },
}

export const CharacterAnimation: Story = {
  args: {
    by: "chars",
    animation: "fadeLeft",
    staggerDelay: 0.05,
    duration: 0.4,
    children: "Character by Character",
  },
}

export const LineByLineAnimation: Story = {
  render: () => (
    <AnimateText by="lines" animation="fadeUp" staggerDelay={0.2}>
      <div>첫 번째 줄입니다</div>
      <div>두 번째 줄이에요</div>
      <div>세 번째 줄까지!</div>
    </AnimateText>
  ),
}

export const WordByWordAnimation: Story = {
  args: {
    by: "words",
    animation: "fadeUp",
    staggerDelay: 0.1,
    duration: 0.4,
    children: "각 단어가 개별적으로 애니메이션됩니다",
  },
}

export const WordsWithLongSentence: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", padding: "20px" }}>
      <AnimateText by="words" animation="fadeLeft" staggerDelay={0.1}>
        긴 문장에서 각 단어들이 순차적으로 나타나는 것을 보여주는 예시입니다.
        단어 단위로 분리되어 애니메이션이 적용되며, 자연스러운 읽기 흐름을
        만들어냅니다.
      </AnimateText>
    </div>
  ),
}

export const WordsWithDifferentAnimations: Story = {
  render: () => {
    const [count, setCount] = useState(0)

    return (
      <div>
        <Button onClick={() => setCount(count + 1)}>retry</Button>
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          initial="hidden"
          animate="show"
          key={count}
          variants={{
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.1,
              },
            },
            hidden: {
              opacity: 0,
              color: "red",
            },
          }}
          custom={0}
        >
          <AnimateText
            by="words"
            animation="fadeUp"
            staggerDelay={0.1}
            initial={false}
            animate={false}
          >
            위로 올라오는 단어들
          </AnimateText>
          <AnimateText
            by="words"
            animation="fadeDown"
            staggerDelay={0.1}
            initial={false}
            animate={false}
          >
            아래로 내려오는 단어들
          </AnimateText>
          <AnimateText
            by="chars"
            animation="fadeLeft"
            staggerDelay={0.1}
            initial={false}
            animate={false}
          >
            왼쪽으로 나타나는 단어들
          </AnimateText>
          <AnimateText
            by="words"
            animation="fadeRight"
            staggerDelay={0.1}
            initial={false}
            animate={false}
          >
            오른쪽으로 나타나는 단어들
          </AnimateText>
        </motion.div>
      </div>
    )
  },
}

export const WordsWithSpaces: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AnimateText by="words" animation="fadeUp" staggerDelay={0.15}>
        단어 사이에 여러 공백이 있어도 보존됩니다
      </AnimateText>
      <AnimateText by="words" animation="fadeLeft" staggerDelay={0.15}>
        탭이나 스페이스가 모두 잘 동작합니다
      </AnimateText>
    </div>
  ),
}

export const WithMemo: Story = {
  render: () => {
    const [count, setCount] = useState(0)

    const memoizedContent = useMemo(
      () => (
        <AnimateText
          by="lines"
          staggerDelay={0.5}
          duration={0.5}
          animation="fadeRight"
        >
          <div>안녕하세요</div>
          <Text>메모이제이션된 컨텐츠입니다</Text>
          <Text>리렌더링되어도 애니메이션이 재실행되지 않습니다</Text>
        </AnimateText>
      ),
      [],
    )

    return (
      <div>
        <Button onClick={() => setCount(count + 1)}>
          카운트 증가 (현재: {count})
        </Button>
        {memoizedContent}
      </div>
    )
  },
}

export const EdgeCaseWithLongText: Story = {
  render: () => (
    <div
      style={{ maxWidth: "300px", border: "1px dashed #ccc", padding: "16px" }}
    >
      <AnimateText by="words" animation="fadeUp" staggerDelay={0.1}>
        이것은 매우 긴 텍스트를 포함하는 케이스입니다. 각 단어별로 애니메이션이
        적용되며, 컨테이너의 너비가 제한된 상황에서도 올바르게 작동하는지
        테스트합니다.
      </AnimateText>
    </div>
  ),
}
