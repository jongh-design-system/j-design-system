import { defineSemanticTokens, defineThemeVariant } from "@pandacss/dev"

import { colorTokens } from "./raw"

const palette = Object.fromEntries(
  Object.entries(colorTokens.palette.light).map(([color, steps]) => [
    color,
    Object.fromEntries(
      Object.keys(steps).map((step) => [
        step,
        {
          value: {
            base: `{colors.palette.light.${color}.${step}}`,
            _dark: `{colors.palette.dark.${color}.${step}}`,
          },
        },
      ]),
    ),
  ]),
)

const semanticColorTokensByScheme = defineSemanticTokens.colors({
  scheme: {
    carrot: {
      fg: {
        brand: {
          DEFAULT: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다.",
            value: {
              base: "{colors.palette.light.carrot.600}",
              _dark: "{colors.palette.dark.carrot.700}",
            },
          },
          contrast: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. (contrast)",
            value: {
              base: "{colors.palette.light.carrot.700}",
              _dark: "{colors.palette.dark.carrot.700}",
            },
          },
        },
        critical: {
          DEFAULT: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          contrast: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.red.900}",
              _dark: "{colors.palette.dark.red.900}",
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.500}",
            _dark: "{colors.palette.dark.gray.500}",
          },
        },
        informative: {
          DEFAULT: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다.",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          contrast: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.blue.900}",
              _dark: "{colors.palette.dark.blue.900}",
            },
          },
        },
        neutral: {
          DEFAULT: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다.",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          inverted: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          muted: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (muted)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (subtle)",
            value: {
              base: "{colors.palette.light.gray.700}",
              _dark: "{colors.palette.dark.gray.700}",
            },
          },
        },
        placeholder: {
          value: {
            base: "{colors.palette.light.gray.600}",
            _dark: "{colors.palette.dark.gray.600}",
          },
        },
        positive: {
          DEFAULT: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          contrast: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.green.900}",
              _dark: "{colors.palette.dark.green.900}",
            },
          },
        },
        warning: {
          DEFAULT: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          contrast: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.yellow.900}",
              _dark: "{colors.palette.dark.yellow.900}",
            },
          },
        },
      },
      bg: {
        brand: {
          solid: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
              value: {
                base: "{colors.palette.light.carrot.600}",
                _dark: "{colors.palette.dark.carrot.700}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.carrot.700}",
                _dark: "{colors.palette.dark.carrot.800}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
              value: {
                base: "{colors.palette.light.carrot.100}",
                _dark: "{colors.palette.dark.carrot.100}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.carrot.200}",
                _dark: "{colors.palette.dark.carrot.200}",
              },
            },
          },
        },
        critical: {
          solid: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.red.700}",
                _dark: "{colors.palette.dark.red.600}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.red.800}",
                _dark: "{colors.palette.dark.red.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.red.100}",
                _dark: "{colors.palette.dark.red.100}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.red.200}",
                _dark: "{colors.palette.dark.red.200}",
              },
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.200}",
            _dark: "{colors.palette.dark.gray.300}",
          },
        },
        informative: {
          solid: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.blue.700}",
                _dark: "{colors.palette.dark.blue.600}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.blue.800}",
                _dark: "{colors.palette.dark.blue.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.blue.100}",
                _dark: "{colors.palette.dark.blue.100}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.blue.200}",
                _dark: "{colors.palette.dark.blue.200}",
              },
            },
          },
        },
        layer: {
          DEFAULT: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다.",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          basement: {
            description:
              "가장 낮은 0단계의 '대지'입니다. 화면 가장 깊은 곳에 위치하는 전체 배경색입니다.",
            value: {
              base: "{colors.palette.light.gray.200}",
              _dark: "{colors.palette.dark.gray.00}",
            },
          },
          pressed: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다. (pressed)",
            value: {
              base: "{colors.palette.light.gray.100}",
              _dark: "{colors.palette.dark.gray.300}",
            },
          },
          floating: {
            DEFAULT: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다.",
              value: {
                base: "{colors.palette.light.gray.00}",
                _dark: "{colors.palette.dark.gray.200}",
              },
            },
            pressed: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다. (pressed)",
              value: {
                base: "{colors.palette.light.gray.100}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
          },
        },
        magic: {
          weak: {
            value: {
              base: "#f9f2ee",
              _dark: "#201f1f",
            },
          },
        },
        neutral: {
          inverted: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
              value: {
                base: "{colors.palette.light.gray.900}",
                _dark: "{colors.palette.dark.gray.1000}",
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted-pressed)",
              value: {
                base: "{colors.palette.light.gray.800}",
                _dark: "{colors.palette.dark.gray.800}",
              },
            },
          },
          solid: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
              value: {
                base: "{colors.palette.light.gray.1000}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            muted: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted)",
                value: {
                  base: "{colors.palette.light.gray.800}",
                  _dark: "{colors.palette.dark.gray.400}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted-pressed)",
                value: {
                  base: "{colors.palette.light.gray.900}",
                  _dark: "{colors.palette.dark.gray.500}",
                },
              },
            },
          },
          weak: {
            DEFAULT: {
              description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak)",
              value: {
                base: "{colors.palette.light.gray.200}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            alpha: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.200}",
                  _dark: "{colors.palette.static.white.alpha.200}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha-pressed) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.300}",
                  _dark: "{colors.palette.static.white.alpha.300}",
                },
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.gray.300}",
                _dark: "{colors.palette.dark.gray.400}",
              },
            },
          },
        },
        overlay: {
          DEFAULT: {
            value: {
              base: "{colors.palette.static.black.alpha.700}",
              _dark: "{colors.palette.static.black.alpha.700}",
            },
          },
          muted: {
            value: {
              base: "{colors.palette.static.black.alpha.500}",
              _dark: "{colors.palette.static.black.alpha.500}",
            },
          },
        },
        positive: {
          solid: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.green.700}",
                _dark: "{colors.palette.dark.green.500}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.green.800}",
                _dark: "{colors.palette.dark.green.600}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.green.100}",
                _dark: "{colors.palette.dark.green.100}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.green.200}",
                _dark: "{colors.palette.dark.green.200}",
              },
            },
          },
        },
        transparent: {
          DEFAULT: {
            value: {
              base: "#00000000",
              _dark: "#ffffff00",
            },
          },
          pressed: {
            value: {
              base: "{colors.palette.static.black.alpha.100}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          selected: {
            DEFAULT: {
              value: {
                base: "{colors.palette.static.black.alpha.200}",
                _dark: "{colors.palette.static.white.alpha.100}",
              },
            },
            pressed: {
              value: {
                base: "{colors.palette.static.black.alpha.300}",
                _dark: "{colors.palette.static.white.alpha.200}",
              },
            },
          },
        },
        warning: {
          solid: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.yellow.300}",
                _dark: "{colors.palette.dark.yellow.800}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.yellow.400}",
                _dark: "{colors.palette.dark.yellow.900}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.yellow.100}",
                _dark: "{colors.palette.dark.yellow.100}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.yellow.200}",
                _dark: "{colors.palette.dark.yellow.200}",
              },
            },
          },
        },
      },
      stroke: {
        brand: {
          solid: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
            value: {
              base: "{colors.palette.light.carrot.700}",
              _dark: "{colors.palette.dark.carrot.700}",
            },
          },
          weak: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
            value: {
              base: "{colors.palette.light.carrot.300}",
              _dark: "{colors.palette.dark.carrot.300}",
            },
          },
        },
        critical: {
          solid: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          weak: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.red.300}",
              _dark: "{colors.palette.dark.red.300}",
            },
          },
        },
        focus: {
          ring: {
            value: {
              base: "{colors.palette.light.blue.600}",
              _dark: "{colors.palette.dark.blue.600}",
            },
          },
        },
        informative: {
          solid: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          weak: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.blue.300}",
              _dark: "{colors.palette.dark.blue.300}",
            },
          },
        },
        neutral: {
          contrast: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (contrast)",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          muted: {
            description:
              "의미 단위가 바뀌는 경계를 나누는 선입니다. 섹션과 섹션 사이, 콘텐츠와 액션 영역 사이, 헤더와 본문 경계처럼 한 화면에 한두 번만 등장하는 구분에 사용됩니다. (muted)",
            value: {
              base: "{colors.palette.static.black.alpha.300}",
              _dark: "{colors.palette.static.white.alpha.100}",
            },
          },
          solid: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description:
              "반복되는 동일한 성격의 항목 사이를 나누는 선입니다. 리스트 아이템, 테이블 row, 설정 메뉴 항목처럼 한 화면에 여러 번 등장하는 구분에 사용됩니다. (subtle)",
            value: {
              base: "{colors.palette.static.black.alpha.200}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          weak: {
            description:
              "요소의 외곽을 그려 형태를 만드는 선입니다. 카드, 인풋 필드, 아웃라인 버튼처럼 선 자체가 요소의 경계를 정의할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.gray.400}",
              _dark: "{colors.palette.dark.gray.400}",
            },
          },
        },
        positive: {
          solid: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          weak: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.green.300}",
              _dark: "{colors.palette.dark.green.300}",
            },
          },
        },
        warning: {
          solid: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          weak: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.yellow.300}",
              _dark: "{colors.palette.dark.yellow.300}",
            },
          },
        },
      },
    },
    blue: {
      fg: {
        brand: {
          DEFAULT: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다.",
            value: {
              base: "{colors.palette.light.blue.600}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          contrast: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. (contrast)",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
        },
        critical: {
          DEFAULT: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          contrast: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.red.900}",
              _dark: "{colors.palette.dark.red.900}",
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.500}",
            _dark: "{colors.palette.dark.gray.500}",
          },
        },
        informative: {
          DEFAULT: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다.",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          contrast: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.blue.900}",
              _dark: "{colors.palette.dark.blue.900}",
            },
          },
        },
        neutral: {
          DEFAULT: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다.",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          inverted: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          muted: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (muted)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (subtle)",
            value: {
              base: "{colors.palette.light.gray.700}",
              _dark: "{colors.palette.dark.gray.700}",
            },
          },
        },
        placeholder: {
          value: {
            base: "{colors.palette.light.gray.600}",
            _dark: "{colors.palette.dark.gray.600}",
          },
        },
        positive: {
          DEFAULT: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          contrast: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.green.900}",
              _dark: "{colors.palette.dark.green.900}",
            },
          },
        },
        warning: {
          DEFAULT: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          contrast: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.yellow.900}",
              _dark: "{colors.palette.dark.yellow.900}",
            },
          },
        },
      },
      bg: {
        brand: {
          solid: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
              value: {
                base: "{colors.palette.light.blue.600}",
                _dark: "{colors.palette.dark.blue.700}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.blue.700}",
                _dark: "{colors.palette.dark.blue.800}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
              value: {
                base: "{colors.palette.light.blue.100}",
                _dark: "{colors.palette.dark.blue.100}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.blue.200}",
                _dark: "{colors.palette.dark.blue.200}",
              },
            },
          },
        },
        critical: {
          solid: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.red.700}",
                _dark: "{colors.palette.dark.red.600}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.red.800}",
                _dark: "{colors.palette.dark.red.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.red.100}",
                _dark: "{colors.palette.dark.red.100}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.red.200}",
                _dark: "{colors.palette.dark.red.200}",
              },
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.200}",
            _dark: "{colors.palette.dark.gray.300}",
          },
        },
        informative: {
          solid: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.blue.700}",
                _dark: "{colors.palette.dark.blue.600}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.blue.800}",
                _dark: "{colors.palette.dark.blue.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.blue.100}",
                _dark: "{colors.palette.dark.blue.100}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.blue.200}",
                _dark: "{colors.palette.dark.blue.200}",
              },
            },
          },
        },
        layer: {
          DEFAULT: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다.",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          basement: {
            description:
              "가장 낮은 0단계의 '대지'입니다. 화면 가장 깊은 곳에 위치하는 전체 배경색입니다.",
            value: {
              base: "{colors.palette.light.gray.200}",
              _dark: "{colors.palette.dark.gray.00}",
            },
          },
          pressed: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다. (pressed)",
            value: {
              base: "{colors.palette.light.gray.100}",
              _dark: "{colors.palette.dark.gray.300}",
            },
          },
          floating: {
            DEFAULT: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다.",
              value: {
                base: "{colors.palette.light.gray.00}",
                _dark: "{colors.palette.dark.gray.200}",
              },
            },
            pressed: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다. (pressed)",
              value: {
                base: "{colors.palette.light.gray.100}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
          },
        },
        magic: {
          weak: {
            value: {
              base: "#f9f2ee",
              _dark: "#201f1f",
            },
          },
        },
        neutral: {
          inverted: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
              value: {
                base: "{colors.palette.light.gray.900}",
                _dark: "{colors.palette.dark.gray.1000}",
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted-pressed)",
              value: {
                base: "{colors.palette.light.gray.800}",
                _dark: "{colors.palette.dark.gray.800}",
              },
            },
          },
          solid: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
              value: {
                base: "{colors.palette.light.gray.1000}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            muted: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted)",
                value: {
                  base: "{colors.palette.light.gray.800}",
                  _dark: "{colors.palette.dark.gray.400}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted-pressed)",
                value: {
                  base: "{colors.palette.light.gray.900}",
                  _dark: "{colors.palette.dark.gray.500}",
                },
              },
            },
          },
          weak: {
            DEFAULT: {
              description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak)",
              value: {
                base: "{colors.palette.light.gray.200}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            alpha: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.200}",
                  _dark: "{colors.palette.static.white.alpha.200}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha-pressed) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.300}",
                  _dark: "{colors.palette.static.white.alpha.300}",
                },
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.gray.300}",
                _dark: "{colors.palette.dark.gray.400}",
              },
            },
          },
        },
        overlay: {
          DEFAULT: {
            value: {
              base: "{colors.palette.static.black.alpha.700}",
              _dark: "{colors.palette.static.black.alpha.700}",
            },
          },
          muted: {
            value: {
              base: "{colors.palette.static.black.alpha.500}",
              _dark: "{colors.palette.static.black.alpha.500}",
            },
          },
        },
        positive: {
          solid: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.green.700}",
                _dark: "{colors.palette.dark.green.500}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.green.800}",
                _dark: "{colors.palette.dark.green.600}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.green.100}",
                _dark: "{colors.palette.dark.green.100}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.green.200}",
                _dark: "{colors.palette.dark.green.200}",
              },
            },
          },
        },
        transparent: {
          DEFAULT: {
            value: {
              base: "#00000000",
              _dark: "#ffffff00",
            },
          },
          pressed: {
            value: {
              base: "{colors.palette.static.black.alpha.100}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          selected: {
            DEFAULT: {
              value: {
                base: "{colors.palette.static.black.alpha.200}",
                _dark: "{colors.palette.static.white.alpha.100}",
              },
            },
            pressed: {
              value: {
                base: "{colors.palette.static.black.alpha.300}",
                _dark: "{colors.palette.static.white.alpha.200}",
              },
            },
          },
        },
        warning: {
          solid: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.yellow.300}",
                _dark: "{colors.palette.dark.yellow.800}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.yellow.400}",
                _dark: "{colors.palette.dark.yellow.900}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.yellow.100}",
                _dark: "{colors.palette.dark.yellow.100}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.yellow.200}",
                _dark: "{colors.palette.dark.yellow.200}",
              },
            },
          },
        },
      },
      stroke: {
        brand: {
          solid: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          weak: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
            value: {
              base: "{colors.palette.light.blue.300}",
              _dark: "{colors.palette.dark.blue.300}",
            },
          },
        },
        critical: {
          solid: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          weak: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.red.300}",
              _dark: "{colors.palette.dark.red.300}",
            },
          },
        },
        focus: {
          ring: {
            value: {
              base: "{colors.palette.light.blue.600}",
              _dark: "{colors.palette.dark.blue.600}",
            },
          },
        },
        informative: {
          solid: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          weak: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.blue.300}",
              _dark: "{colors.palette.dark.blue.300}",
            },
          },
        },
        neutral: {
          contrast: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (contrast)",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          muted: {
            description:
              "의미 단위가 바뀌는 경계를 나누는 선입니다. 섹션과 섹션 사이, 콘텐츠와 액션 영역 사이, 헤더와 본문 경계처럼 한 화면에 한두 번만 등장하는 구분에 사용됩니다. (muted)",
            value: {
              base: "{colors.palette.static.black.alpha.300}",
              _dark: "{colors.palette.static.white.alpha.100}",
            },
          },
          solid: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description:
              "반복되는 동일한 성격의 항목 사이를 나누는 선입니다. 리스트 아이템, 테이블 row, 설정 메뉴 항목처럼 한 화면에 여러 번 등장하는 구분에 사용됩니다. (subtle)",
            value: {
              base: "{colors.palette.static.black.alpha.200}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          weak: {
            description:
              "요소의 외곽을 그려 형태를 만드는 선입니다. 카드, 인풋 필드, 아웃라인 버튼처럼 선 자체가 요소의 경계를 정의할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.gray.400}",
              _dark: "{colors.palette.dark.gray.400}",
            },
          },
        },
        positive: {
          solid: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          weak: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.green.300}",
              _dark: "{colors.palette.dark.green.300}",
            },
          },
        },
        warning: {
          solid: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          weak: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.yellow.300}",
              _dark: "{colors.palette.dark.yellow.300}",
            },
          },
        },
      },
    },
    purple: {
      fg: {
        brand: {
          DEFAULT: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다.",
            value: {
              base: "{colors.palette.light.purple.600}",
              _dark: "{colors.palette.dark.purple.700}",
            },
          },
          contrast: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. (contrast)",
            value: {
              base: "{colors.palette.light.purple.700}",
              _dark: "{colors.palette.dark.purple.700}",
            },
          },
        },
        critical: {
          DEFAULT: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          contrast: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.red.900}",
              _dark: "{colors.palette.dark.red.900}",
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.500}",
            _dark: "{colors.palette.dark.gray.500}",
          },
        },
        informative: {
          DEFAULT: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다.",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          contrast: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.blue.900}",
              _dark: "{colors.palette.dark.blue.900}",
            },
          },
        },
        neutral: {
          DEFAULT: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다.",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          inverted: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          muted: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (muted)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (subtle)",
            value: {
              base: "{colors.palette.light.gray.700}",
              _dark: "{colors.palette.dark.gray.700}",
            },
          },
        },
        placeholder: {
          value: {
            base: "{colors.palette.light.gray.600}",
            _dark: "{colors.palette.dark.gray.600}",
          },
        },
        positive: {
          DEFAULT: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          contrast: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.green.900}",
              _dark: "{colors.palette.dark.green.900}",
            },
          },
        },
        warning: {
          DEFAULT: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다.",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          contrast: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (contrast)",
            value: {
              base: "{colors.palette.light.yellow.900}",
              _dark: "{colors.palette.dark.yellow.900}",
            },
          },
        },
      },
      bg: {
        brand: {
          solid: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
              value: {
                base: "{colors.palette.light.purple.600}",
                _dark: "{colors.palette.dark.purple.700}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.purple.700}",
                _dark: "{colors.palette.dark.purple.800}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
              value: {
                base: "{colors.palette.light.purple.100}",
                _dark: "{colors.palette.dark.purple.100}",
              },
            },
            pressed: {
              description:
                "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.purple.200}",
                _dark: "{colors.palette.dark.purple.200}",
              },
            },
          },
        },
        critical: {
          solid: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.red.700}",
                _dark: "{colors.palette.dark.red.600}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.red.800}",
                _dark: "{colors.palette.dark.red.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.red.100}",
                _dark: "{colors.palette.dark.red.100}",
              },
            },
            pressed: {
              description:
                "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.red.200}",
                _dark: "{colors.palette.dark.red.200}",
              },
            },
          },
        },
        disabled: {
          value: {
            base: "{colors.palette.light.gray.200}",
            _dark: "{colors.palette.dark.gray.300}",
          },
        },
        informative: {
          solid: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.blue.700}",
                _dark: "{colors.palette.dark.blue.600}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.blue.800}",
                _dark: "{colors.palette.dark.blue.700}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.blue.100}",
                _dark: "{colors.palette.dark.blue.100}",
              },
            },
            pressed: {
              description:
                "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.blue.200}",
                _dark: "{colors.palette.dark.blue.200}",
              },
            },
          },
        },
        layer: {
          DEFAULT: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다.",
            value: {
              base: "{colors.palette.light.gray.00}",
              _dark: "{colors.palette.dark.gray.100}",
            },
          },
          basement: {
            description:
              "가장 낮은 0단계의 '대지'입니다. 화면 가장 깊은 곳에 위치하는 전체 배경색입니다.",
            value: {
              base: "{colors.palette.light.gray.200}",
              _dark: "{colors.palette.dark.gray.00}",
            },
          },
          pressed: {
            description:
              "basement 바로 위에 놓이는 기본 표면입니다. 대부분의 스크린 콘텐츠(List, TextField 등)가 이 레이어 위에서 표현됩니다. (pressed)",
            value: {
              base: "{colors.palette.light.gray.100}",
              _dark: "{colors.palette.dark.gray.300}",
            },
          },
          floating: {
            DEFAULT: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다.",
              value: {
                base: "{colors.palette.light.gray.00}",
                _dark: "{colors.palette.dark.gray.200}",
              },
            },
            pressed: {
              description:
                "화면의 모든 콘텐츠 위를 덮으며(floating) 나타나는 임시 레이어입니다. 사용자의 상호작용을 필요로 하는 모달(Modal)성 요소들이 여기에 속합니다. (pressed)",
              value: {
                base: "{colors.palette.light.gray.100}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
          },
        },
        magic: {
          weak: {
            value: {
              base: "#f9f2ee",
              _dark: "#201f1f",
            },
          },
        },
        neutral: {
          inverted: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted)",
              value: {
                base: "{colors.palette.light.gray.900}",
                _dark: "{colors.palette.dark.gray.1000}",
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (inverted-pressed)",
              value: {
                base: "{colors.palette.light.gray.800}",
                _dark: "{colors.palette.dark.gray.800}",
              },
            },
          },
          solid: {
            DEFAULT: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
              value: {
                base: "{colors.palette.light.gray.1000}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            muted: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted)",
                value: {
                  base: "{colors.palette.light.gray.800}",
                  _dark: "{colors.palette.dark.gray.400}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid-muted-pressed)",
                value: {
                  base: "{colors.palette.light.gray.900}",
                  _dark: "{colors.palette.dark.gray.500}",
                },
              },
            },
          },
          weak: {
            DEFAULT: {
              description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak)",
              value: {
                base: "{colors.palette.light.gray.200}",
                _dark: "{colors.palette.dark.gray.300}",
              },
            },
            alpha: {
              DEFAULT: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.200}",
                  _dark: "{colors.palette.static.white.alpha.200}",
                },
              },
              pressed: {
                description:
                  "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-alpha-pressed) `$color.layer.basement` 위에서 컴포넌트의 가시성을 보장하기 위해 사용됩니다.",
                value: {
                  base: "{colors.palette.static.black.alpha.300}",
                  _dark: "{colors.palette.static.white.alpha.300}",
                },
              },
            },
            pressed: {
              description:
                "일반적인 콘텐츠에 사용되는 기본 색상입니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.gray.300}",
                _dark: "{colors.palette.dark.gray.400}",
              },
            },
          },
        },
        overlay: {
          DEFAULT: {
            value: {
              base: "{colors.palette.static.black.alpha.700}",
              _dark: "{colors.palette.static.black.alpha.700}",
            },
          },
          muted: {
            value: {
              base: "{colors.palette.static.black.alpha.500}",
              _dark: "{colors.palette.static.black.alpha.500}",
            },
          },
        },
        positive: {
          solid: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.green.700}",
                _dark: "{colors.palette.dark.green.500}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.green.800}",
                _dark: "{colors.palette.dark.green.600}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.green.100}",
                _dark: "{colors.palette.dark.green.100}",
              },
            },
            pressed: {
              description:
                "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.green.200}",
                _dark: "{colors.palette.dark.green.200}",
              },
            },
          },
        },
        transparent: {
          DEFAULT: {
            value: {
              base: "#00000000",
              _dark: "#ffffff00",
            },
          },
          pressed: {
            value: {
              base: "{colors.palette.static.black.alpha.100}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          selected: {
            DEFAULT: {
              value: {
                base: "{colors.palette.static.black.alpha.200}",
                _dark: "{colors.palette.static.white.alpha.100}",
              },
            },
            pressed: {
              value: {
                base: "{colors.palette.static.black.alpha.300}",
                _dark: "{colors.palette.static.white.alpha.200}",
              },
            },
          },
        },
        warning: {
          solid: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
              value: {
                base: "{colors.palette.light.yellow.300}",
                _dark: "{colors.palette.dark.yellow.800}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid-pressed)",
              value: {
                base: "{colors.palette.light.yellow.400}",
                _dark: "{colors.palette.dark.yellow.900}",
              },
            },
          },
          weak: {
            DEFAULT: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
              value: {
                base: "{colors.palette.light.yellow.100}",
                _dark: "{colors.palette.dark.yellow.100}",
              },
            },
            pressed: {
              description:
                "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak-pressed)",
              value: {
                base: "{colors.palette.light.yellow.200}",
                _dark: "{colors.palette.dark.yellow.200}",
              },
            },
          },
        },
      },
      stroke: {
        brand: {
          solid: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (solid)",
            value: {
              base: "{colors.palette.light.purple.700}",
              _dark: "{colors.palette.dark.purple.700}",
            },
          },
          weak: {
            description:
              "브랜드와 관련된 요소들이 즉각적으로 인식될 수 있도록 돕습니다. 화면에서 가장 중요한 액션을 강조하는데 사용할 수 있습니다. (weak)",
            value: {
              base: "{colors.palette.light.purple.300}",
              _dark: "{colors.palette.dark.purple.300}",
            },
          },
        },
        critical: {
          solid: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.red.700}",
              _dark: "{colors.palette.dark.red.700}",
            },
          },
          weak: {
            description:
              "오류, 경고 또는 중요한 문제를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.red.300}",
              _dark: "{colors.palette.dark.red.300}",
            },
          },
        },
        focus: {
          ring: {
            value: {
              base: "{colors.palette.light.blue.600}",
              _dark: "{colors.palette.dark.blue.600}",
            },
          },
        },
        informative: {
          solid: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.blue.700}",
              _dark: "{colors.palette.dark.blue.700}",
            },
          },
          weak: {
            description:
              "사용자에게 유용한 정보를 제공하거나 상태를 설명할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.blue.300}",
              _dark: "{colors.palette.dark.blue.300}",
            },
          },
        },
        neutral: {
          contrast: {
            description:
              "일반적인 콘텐츠에 사용되는 기본 색상입니다. (contrast)",
            value: {
              base: "{colors.palette.light.gray.1000}",
              _dark: "{colors.palette.dark.gray.1000}",
            },
          },
          muted: {
            description:
              "의미 단위가 바뀌는 경계를 나누는 선입니다. 섹션과 섹션 사이, 콘텐츠와 액션 영역 사이, 헤더와 본문 경계처럼 한 화면에 한두 번만 등장하는 구분에 사용됩니다. (muted)",
            value: {
              base: "{colors.palette.static.black.alpha.300}",
              _dark: "{colors.palette.static.white.alpha.100}",
            },
          },
          solid: {
            description: "일반적인 콘텐츠에 사용되는 기본 색상입니다. (solid)",
            value: {
              base: "{colors.palette.light.gray.800}",
              _dark: "{colors.palette.dark.gray.800}",
            },
          },
          subtle: {
            description:
              "반복되는 동일한 성격의 항목 사이를 나누는 선입니다. 리스트 아이템, 테이블 row, 설정 메뉴 항목처럼 한 화면에 여러 번 등장하는 구분에 사용됩니다. (subtle)",
            value: {
              base: "{colors.palette.static.black.alpha.200}",
              _dark: "{colors.palette.static.white.alpha.50}",
            },
          },
          weak: {
            description:
              "요소의 외곽을 그려 형태를 만드는 선입니다. 카드, 인풋 필드, 아웃라인 버튼처럼 선 자체가 요소의 경계를 정의할 때 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.gray.400}",
              _dark: "{colors.palette.dark.gray.400}",
            },
          },
        },
        positive: {
          solid: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.green.700}",
              _dark: "{colors.palette.dark.green.700}",
            },
          },
          weak: {
            description:
              "성공적인 작업, 확인, 또는 긍정적인 상태를 나타내는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.green.300}",
              _dark: "{colors.palette.dark.green.300}",
            },
          },
        },
        warning: {
          solid: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (solid)",
            value: {
              base: "{colors.palette.light.yellow.700}",
              _dark: "{colors.palette.dark.yellow.700}",
            },
          },
          weak: {
            description:
              "사용자의 주의가 필요한 경고 메시지나 안내 사항을 전달하는 데 사용됩니다. (weak)",
            value: {
              base: "{colors.palette.light.yellow.300}",
              _dark: "{colors.palette.dark.yellow.300}",
            },
          },
        },
      },
    },
  },
})

export const semanticColorTokens = defineSemanticTokens.colors({
  ...palette,
  ...semanticColorTokensByScheme.scheme.carrot,
})

export const colorThemes = {
  blue: defineThemeVariant({
    semanticTokens: {
      colors: semanticColorTokensByScheme.scheme.blue,
    },
  }),
  purple: defineThemeVariant({
    semanticTokens: {
      colors: semanticColorTokensByScheme.scheme.purple,
    },
  }),
}
