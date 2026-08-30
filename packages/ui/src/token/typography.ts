import { defineTextStyles, defineTokens } from "@pandacss/dev"

/**
 * font-size 스케일이다. t1~t5는 본문 및 장식적 텍스트 범위, t6~t10은 제목 및
 * 주요 텍스트 범위, t11~t14는 sm 이상에서 사용하는 대형 제목 범위다. 스케일은
 * 시각적 크기만 나타내며 특정 컴포넌트나 콘텐츠 역할을 포함하지 않는다.
 * DEFAULT는 rem 단위로 사용자 폰트 크기 설정에 반응하고, static은 같은 시각 크기를
 * px 단위로 고정하여 폰트 스케일링에 반응하지 않는다.
 */
export const fontSizeTokens = defineTokens.fontSizes({
  t1: {
    DEFAULT: {
      description:
        "본문 및 장식적 텍스트 범위의 11px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "0.6875rem",
    },
    static: {
      description:
        "t1.static은 11px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "11px",
    },
  },
  t2: {
    DEFAULT: {
      description:
        "본문 및 장식적 텍스트 범위의 12px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "0.75rem",
    },
    static: {
      description:
        "t2.static은 12px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "12px",
    },
  },
  t3: {
    DEFAULT: {
      description:
        "본문 및 장식적 텍스트 범위의 13px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "0.8125rem",
    },
    static: {
      description:
        "t3.static은 13px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "13px",
    },
  },
  t4: {
    DEFAULT: {
      description:
        "본문 및 장식적 텍스트 범위의 14px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "0.875rem",
    },
    static: {
      description:
        "t4.static은 14px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "14px",
    },
  },
  t5: {
    DEFAULT: {
      description:
        "본문 및 장식적 텍스트 범위의 16px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1rem",
    },
    static: {
      description:
        "t5.static은 16px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "16px",
    },
  },
  t6: {
    DEFAULT: {
      description:
        "제목 및 주요 텍스트 범위의 18px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1.125rem",
    },
    static: {
      description:
        "t6.static은 18px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "18px",
    },
  },
  t7: {
    DEFAULT: {
      description:
        "제목 및 주요 텍스트 범위의 20px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1.25rem",
    },
    static: {
      description:
        "t7.static은 20px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "20px",
    },
  },
  t8: {
    DEFAULT: {
      description:
        "제목 및 주요 텍스트 범위의 22px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1.375rem",
    },
    static: {
      description:
        "t8.static은 22px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "22px",
    },
  },
  t9: {
    DEFAULT: {
      description:
        "제목 및 주요 텍스트 범위의 24px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1.5rem",
    },
    static: {
      description:
        "t9.static은 24px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "24px",
    },
  },
  t10: {
    DEFAULT: {
      description:
        "제목 및 주요 텍스트 범위의 26px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: "1.625rem",
    },
    static: {
      description:
        "t10.static은 26px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "26px",
    },
  },
  t11: {
    DEFAULT: {
      description:
        "대형 제목 범위의 28px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: "1.75rem",
    },
    static: {
      description:
        "t11.static은 28px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "28px",
    },
  },
  t12: {
    DEFAULT: {
      description:
        "대형 제목 범위의 32px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: "2rem",
    },
    static: {
      description:
        "t12.static은 32px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "32px",
    },
  },
  t13: {
    DEFAULT: {
      description:
        "대형 제목 범위의 40px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: "2.5rem",
    },
    static: {
      description:
        "t13.static은 40px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "40px",
    },
  },
  t14: {
    DEFAULT: {
      description:
        "대형 제목 범위의 48px font-size입니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: "3rem",
    },
    static: {
      description:
        "t14.static은 48px font-size를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "48px",
    },
  },
})

/**
 * font-size 스케일에 대응하는 line-height다. 같은 번호의 font-size와 line-height가
 * 스케일 텍스트 스타일의 기본 조합이다. 시맨틱 텍스트 스타일은 콘텐츠 역할에 필요한
 * 가독성에 따라 서로 다른 단계의 값을 조합할 수 있다. DEFAULT는 rem 단위로 사용자
 * 폰트 크기 설정에 반응하고, static은 px 단위로 고정한다.
 */
export const lineHeightTokens = defineTokens.lineHeights({
  t1: {
    DEFAULT: {
      description:
        "fontSizes.t1에 대응하는 15px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "0.9375rem",
    },
    static: {
      description:
        "lineHeights.t1.static은 15px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "15px",
    },
  },
  t2: {
    DEFAULT: {
      description:
        "fontSizes.t2에 대응하는 16px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1rem",
    },
    static: {
      description:
        "lineHeights.t2.static은 16px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "16px",
    },
  },
  t3: {
    DEFAULT: {
      description:
        "fontSizes.t3에 대응하는 18px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.125rem",
    },
    static: {
      description:
        "lineHeights.t3.static은 18px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "18px",
    },
  },
  t4: {
    DEFAULT: {
      description:
        "fontSizes.t4에 대응하는 19px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.1875rem",
    },
    static: {
      description:
        "lineHeights.t4.static은 19px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "19px",
    },
  },
  t5: {
    DEFAULT: {
      description:
        "fontSizes.t5에 대응하는 22px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.375rem",
    },
    static: {
      description:
        "lineHeights.t5.static은 22px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "22px",
    },
  },
  t6: {
    DEFAULT: {
      description:
        "fontSizes.t6에 대응하는 24px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.5rem",
    },
    static: {
      description:
        "lineHeights.t6.static은 24px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "24px",
    },
  },
  t7: {
    DEFAULT: {
      description:
        "fontSizes.t7에 대응하는 27px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.6875rem",
    },
    static: {
      description:
        "lineHeights.t7.static은 27px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "27px",
    },
  },
  t8: {
    DEFAULT: {
      description:
        "fontSizes.t8에 대응하는 30px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "1.875rem",
    },
    static: {
      description:
        "lineHeights.t8.static은 30px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "30px",
    },
  },
  t9: {
    DEFAULT: {
      description:
        "fontSizes.t9에 대응하는 32px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "2rem",
    },
    static: {
      description:
        "lineHeights.t9.static은 32px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "32px",
    },
  },
  t10: {
    DEFAULT: {
      description:
        "fontSizes.t10에 대응하는 35px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다.",
      value: "2.1875rem",
    },
    static: {
      description:
        "lineHeights.t10.static은 35px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
      value: "35px",
    },
  },
  t11: {
    DEFAULT: {
      description:
        "fontSizes.t11에 대응하는 38px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다. sm 이상에서 사용합니다.",
      value: "2.375rem",
    },
    static: {
      description:
        "lineHeights.t11.static은 38px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "38px",
    },
  },
  t12: {
    DEFAULT: {
      description:
        "fontSizes.t12에 대응하는 42px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다. sm 이상에서 사용합니다.",
      value: "2.625rem",
    },
    static: {
      description:
        "lineHeights.t12.static은 42px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "42px",
    },
  },
  t13: {
    DEFAULT: {
      description:
        "fontSizes.t13에 대응하는 52px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다. sm 이상에서 사용합니다.",
      value: "3.25rem",
    },
    static: {
      description:
        "lineHeights.t13.static은 52px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "52px",
    },
  },
  t14: {
    DEFAULT: {
      description:
        "fontSizes.t14에 대응하는 60px line-height입니다. rem 단위로 사용자 폰트 크기 설정에 반응합니다. sm 이상에서 사용합니다.",
      value: "3.75rem",
    },
    static: {
      description:
        "lineHeights.t14.static은 60px line-height를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
      value: "60px",
    },
  },
})

/**
 * font-weight의 굵기 대비 단계다. regular(400), medium(500), bold(700)를 제공한다.
 * 굵기는 시각적 강조 수준만 나타내며 특정 컴포넌트나 콘텐츠 역할을 포함하지 않는다.
 */
export const fontWeightTokens = defineTokens.fontWeights({
  regular: {
    description:
      "400 font-weight입니다. 기본 굵기이며 별도의 강조를 추가하지 않습니다.",
    value: 400,
  },
  medium: {
    description:
      "500 font-weight입니다. regular보다 한 단계 높은 굵기 대비를 만듭니다.",
    value: 500,
  },
  bold: {
    description:
      "700 font-weight입니다. 세 단계 중 가장 높은 굵기 대비를 만듭니다.",
    value: 700,
  },
})

/**
 * 시맨틱 텍스트 스타일은 콘텐츠 역할을 이름으로 나타낸다. 스케일 텍스트 스타일은
 * t5.regular처럼 font-size, line-height, font-weight의 조합만 나타내며 특정
 * 컴포넌트나 콘텐츠 역할을 포함하지 않는다. static 스케일 텍스트 스타일은 같은
 * 조합을 px 단위로 고정하여 사용자 폰트 크기 설정에 반응하지 않는다.
 */
export const textStyleTokens = defineTextStyles({
  screen: {
    title: {
      description:
        "한 화면을 대표하는 제목 역할입니다. 26px font-size, 35px line-height, bold(700)를 사용합니다.",
      value: {
        fontSize: "{fontSizes.t10}",
        lineHeight: "{lineHeights.t10}",
        fontWeight: "{fontWeights.bold}",
      },
    },
  },
  article: {
    body: {
      description:
        "여러 문장으로 이어지는 콘텐츠 본문 역할입니다. 16px font-size에 한 단계 넓은 24px line-height와 regular(400)를 사용합니다.",
      value: {
        fontSize: "{fontSizes.t5}",
        lineHeight: "{lineHeights.t6}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    note: {
      description:
        "본문을 보충하는 주석, 참고 사항, 상세 정보 역할입니다. 14px font-size에 한 단계 넓은 22px line-height와 regular(400)를 사용하며, 독립적인 본문 역할은 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t4}",
        lineHeight: "{lineHeights.t5}",
        fontWeight: "{fontWeights.regular}",
      },
    },
  },
  t1: {
    regular: {
      description:
        "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t1}",
        lineHeight: "{lineHeights.t1}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t1}",
        lineHeight: "{lineHeights.t1}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t1}",
        lineHeight: "{lineHeights.t1}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t1.static}",
          lineHeight: "{lineHeights.t1.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t1.static}",
          lineHeight: "{lineHeights.t1.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "본문 및 장식적 텍스트 범위의 11px font-size, 15px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t1.static}",
          lineHeight: "{lineHeights.t1.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t2: {
    regular: {
      description:
        "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t2}",
        lineHeight: "{lineHeights.t2}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t2}",
        lineHeight: "{lineHeights.t2}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t2}",
        lineHeight: "{lineHeights.t2}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t2.static}",
          lineHeight: "{lineHeights.t2.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t2.static}",
          lineHeight: "{lineHeights.t2.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "본문 및 장식적 텍스트 범위의 12px font-size, 16px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t2.static}",
          lineHeight: "{lineHeights.t2.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t3: {
    regular: {
      description:
        "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t3}",
        lineHeight: "{lineHeights.t3}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t3}",
        lineHeight: "{lineHeights.t3}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t3}",
        lineHeight: "{lineHeights.t3}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t3.static}",
          lineHeight: "{lineHeights.t3.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t3.static}",
          lineHeight: "{lineHeights.t3.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "본문 및 장식적 텍스트 범위의 13px font-size, 18px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t3.static}",
          lineHeight: "{lineHeights.t3.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t4: {
    regular: {
      description:
        "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t4}",
        lineHeight: "{lineHeights.t4}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t4}",
        lineHeight: "{lineHeights.t4}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t4}",
        lineHeight: "{lineHeights.t4}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t4.static}",
          lineHeight: "{lineHeights.t4.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t4.static}",
          lineHeight: "{lineHeights.t4.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "본문 및 장식적 텍스트 범위의 14px font-size, 19px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t4.static}",
          lineHeight: "{lineHeights.t4.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t5: {
    regular: {
      description:
        "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t5}",
        lineHeight: "{lineHeights.t5}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t5}",
        lineHeight: "{lineHeights.t5}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t5}",
        lineHeight: "{lineHeights.t5}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t5.static}",
          lineHeight: "{lineHeights.t5.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t5.static}",
          lineHeight: "{lineHeights.t5.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "본문 및 장식적 텍스트 범위의 16px font-size, 22px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t5.static}",
          lineHeight: "{lineHeights.t5.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t6: {
    regular: {
      description:
        "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t6}",
        lineHeight: "{lineHeights.t6}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t6}",
        lineHeight: "{lineHeights.t6}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t6}",
        lineHeight: "{lineHeights.t6}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t6.static}",
          lineHeight: "{lineHeights.t6.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t6.static}",
          lineHeight: "{lineHeights.t6.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "제목 및 주요 텍스트 범위의 18px font-size, 24px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t6.static}",
          lineHeight: "{lineHeights.t6.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t7: {
    regular: {
      description:
        "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t7}",
        lineHeight: "{lineHeights.t7}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t7}",
        lineHeight: "{lineHeights.t7}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t7}",
        lineHeight: "{lineHeights.t7}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t7.static}",
          lineHeight: "{lineHeights.t7.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t7.static}",
          lineHeight: "{lineHeights.t7.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "제목 및 주요 텍스트 범위의 20px font-size, 27px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t7.static}",
          lineHeight: "{lineHeights.t7.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t8: {
    regular: {
      description:
        "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t8}",
        lineHeight: "{lineHeights.t8}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t8}",
        lineHeight: "{lineHeights.t8}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t8}",
        lineHeight: "{lineHeights.t8}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t8.static}",
          lineHeight: "{lineHeights.t8.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t8.static}",
          lineHeight: "{lineHeights.t8.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "제목 및 주요 텍스트 범위의 22px font-size, 30px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t8.static}",
          lineHeight: "{lineHeights.t8.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t9: {
    regular: {
      description:
        "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t9}",
        lineHeight: "{lineHeights.t9}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t9}",
        lineHeight: "{lineHeights.t9}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t9}",
        lineHeight: "{lineHeights.t9}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t9.static}",
          lineHeight: "{lineHeights.t9.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t9.static}",
          lineHeight: "{lineHeights.t9.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "제목 및 주요 텍스트 범위의 24px font-size, 32px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t9.static}",
          lineHeight: "{lineHeights.t9.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t10: {
    regular: {
      description:
        "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t10}",
        lineHeight: "{lineHeights.t10}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t10}",
        lineHeight: "{lineHeights.t10}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다.",
      value: {
        fontSize: "{fontSizes.t10}",
        lineHeight: "{lineHeights.t10}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t10.static}",
          lineHeight: "{lineHeights.t10.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t10.static}",
          lineHeight: "{lineHeights.t10.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "제목 및 주요 텍스트 범위의 26px font-size, 35px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t10.static}",
          lineHeight: "{lineHeights.t10.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t11: {
    regular: {
      description:
        "대형 제목 범위의 28px font-size, 38px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t11}",
        lineHeight: "{lineHeights.t11}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "대형 제목 범위의 28px font-size, 38px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t11}",
        lineHeight: "{lineHeights.t11}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "대형 제목 범위의 28px font-size, 38px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t11}",
        lineHeight: "{lineHeights.t11}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "대형 제목 범위의 28px font-size, 38px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t11.static}",
          lineHeight: "{lineHeights.t11.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "대형 제목 범위의 28px font-size, 38px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t11.static}",
          lineHeight: "{lineHeights.t11.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "대형 제목 범위의 28px font-size, 38px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t11.static}",
          lineHeight: "{lineHeights.t11.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t12: {
    regular: {
      description:
        "대형 제목 범위의 32px font-size, 42px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t12}",
        lineHeight: "{lineHeights.t12}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "대형 제목 범위의 32px font-size, 42px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t12}",
        lineHeight: "{lineHeights.t12}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "대형 제목 범위의 32px font-size, 42px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t12}",
        lineHeight: "{lineHeights.t12}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "대형 제목 범위의 32px font-size, 42px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t12.static}",
          lineHeight: "{lineHeights.t12.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "대형 제목 범위의 32px font-size, 42px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t12.static}",
          lineHeight: "{lineHeights.t12.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "대형 제목 범위의 32px font-size, 42px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t12.static}",
          lineHeight: "{lineHeights.t12.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t13: {
    regular: {
      description:
        "대형 제목 범위의 40px font-size, 52px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t13}",
        lineHeight: "{lineHeights.t13}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "대형 제목 범위의 40px font-size, 52px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t13}",
        lineHeight: "{lineHeights.t13}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "대형 제목 범위의 40px font-size, 52px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t13}",
        lineHeight: "{lineHeights.t13}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "대형 제목 범위의 40px font-size, 52px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t13.static}",
          lineHeight: "{lineHeights.t13.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "대형 제목 범위의 40px font-size, 52px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t13.static}",
          lineHeight: "{lineHeights.t13.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "대형 제목 범위의 40px font-size, 52px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t13.static}",
          lineHeight: "{lineHeights.t13.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
  t14: {
    regular: {
      description:
        "대형 제목 범위의 48px font-size, 60px line-height, regular(400)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t14}",
        lineHeight: "{lineHeights.t14}",
        fontWeight: "{fontWeights.regular}",
      },
    },
    medium: {
      description:
        "대형 제목 범위의 48px font-size, 60px line-height, medium(500)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t14}",
        lineHeight: "{lineHeights.t14}",
        fontWeight: "{fontWeights.medium}",
      },
    },
    bold: {
      description:
        "대형 제목 범위의 48px font-size, 60px line-height, bold(700)를 조합합니다. rem 단위로 사용자 폰트 크기 설정에 반응하며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 사용합니다.",
      value: {
        fontSize: "{fontSizes.t14}",
        lineHeight: "{lineHeights.t14}",
        fontWeight: "{fontWeights.bold}",
      },
    },
    static: {
      regular: {
        description:
          "대형 제목 범위의 48px font-size, 60px line-height, regular(400)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t14.static}",
          lineHeight: "{lineHeights.t14.static}",
          fontWeight: "{fontWeights.regular}",
        },
      },
      medium: {
        description:
          "대형 제목 범위의 48px font-size, 60px line-height, medium(500)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t14.static}",
          lineHeight: "{lineHeights.t14.static}",
          fontWeight: "{fontWeights.medium}",
        },
      },
      bold: {
        description:
          "대형 제목 범위의 48px font-size, 60px line-height, bold(700)를 px 단위로 고정합니다. 사용자 폰트 크기 설정에 반응하지 않으며, 특정 콘텐츠 역할을 포함하지 않습니다. sm 이상에서 고정 크기가 필요한 경우에 사용합니다.",
        value: {
          fontSize: "{fontSizes.t14.static}",
          lineHeight: "{lineHeights.t14.static}",
          fontWeight: "{fontWeights.bold}",
        },
      },
    },
  },
})
