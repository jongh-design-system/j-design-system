# Layout 정책

이 문서는 `Box`, `Center`, `Grid`, `HStack`, `VStack`에 공통으로 적용되는 공개 API와 스타일 생성 원칙을 정의한다.

## 역할

- Layout 컴포넌트는 배치만 담당하며 상태, 동작, 접근성 의미를 자체적으로 추가하지 않는다.
- 렌더링할 요소를 바꿔야 할 때는 `asChild`로 기존 요소를 합성한다. 별도의 polymorphic `as` 타입을 유지하지 않아도 요소의 의미와 props를 호출자가 소유할 수 있기 때문이다.
- 컴포넌트별 prop은 해당 배치 개념을 표현하는 축약 API로만 추가한다. 예를 들어 `Grid`의 숫자 `columns`는 `repeat()` 표현으로 변환하지만 임의의 개수 상한은 두지 않는다.

## 타입과 값

- 스타일 값 타입의 기준은 Panda CSS가 생성한 타입이다. 토큰과 연결된 값은 `UtilityValues`, 일반 CSS 값은 `Properties`, recipe variant는 생성된 recipe 타입에서 파생한다.
- 생성 타입과 같은 의미의 문자열 union이나 값 목록을 소스에 다시 작성하지 않는다. 수동 타입은 `full`, 숫자형 grid track처럼 컴포넌트가 별도 의미를 부여하는 경우에만 둔다.
- spacing 속성의 숫자 문자열은 spacing token 이름으로 해석하고, `px`, `rem`, `%`, `calc()` 같은 CSS 값은 그대로 전달한다.
- `width`와 `height`는 spacing token 체계에 포함하지 않는다. 크기는 CSS dimension을 직접 받고 `full`만 `100%` 축약값으로 제공한다.
- color는 공개 color token을 사용하며 내부 palette 경로는 노출하지 않는다. 테마 구조가 바뀌어도 Layout 사용처가 palette 구현에 의존하지 않게 하기 위해서다.

## 반응형

- 공개 형식은 값 하나 또는 `{ base, sm, md, lg, xl }`이다. breakpoint key는 고정하고 기준값은 `breakpoints` 한 곳에서 관리한다.
- `ResponsiveLayoutStyleValue`는 이 공개 형식만 표현한다. Panda의 `ConditionalValue`는 `_md` 형식과 상태 condition, 배열까지 포함해 Layout API보다 범위가 넓으므로 직접 노출하지 않는다. 각 속성의 값 타입은 계속 Panda 생성 타입에서 가져온다.
- breakpoint 활성 상태는 상속 가능한 `--breakpoint-active`로 전달한다. 소비자는 key를 바꾸지 않고 자신의 CSS에서 이 값을 설정해 전체 페이지나 특정 scope의 breakpoint 기준을 교체할 수 있다.

## 스타일 생성과 override

- 배포 CSS에는 Layout recipe와 breakpoint별 CSS 변수 선택 규칙을 미리 생성한다. 컴포넌트는 실행 시 prop 값을 CSS 변수에 넣기만 하므로 소비자 프로젝트를 Panda가 정적 분석하지 않아도 동작한다.
- Layout prop 조합을 `staticCss`로 모두 생성하지 않는다. 임의 CSS 값과 소비자 코드의 반응형 조합을 빌드 시점에 전부 알 수 없고, 가능한 조합을 미리 만들면 CSS가 불필요하게 증가하기 때문이다.
- 계산된 Layout 변수 뒤에 사용자의 `style`을 적용한다. 명시적으로 전달한 inline style이 최종 override가 되도록 하기 위해서다.
