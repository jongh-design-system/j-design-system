import{f as x,w as C,u as w,e as B}from"./index-B02tQNGw.js";import{j as P}from"./jsx-runtime-BYYWji4R.js";import{c as j,R as z,a as H,b as N}from"./index-DRHeyIl5.js";import{r as q}from"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const l=j({base:{display:"inline-flex",alignItems:"center",justifyContent:"center",rounded:"md",textStyle:"sm",fontWeight:"medium",transition:"colors",cursor:"pointer",gap:"2",_focusVisible:{ringWidth:"1",ringColor:"ring",ringOffset:"1"},_disabled:{cursor:"not-allowed",opacity:"50%"}},variants:{variant:{default:{bg:"primary",color:"primary.foreground",_hover:{bg:"primary/90"}},destructive:{bg:"destructive",color:"destructive.foreground",_hover:{bg:"destructive/90"}},outline:{border:"input",bg:"background",_hover:{bg:"accent",color:"accent.foreground"}},secondary:{bg:"secondary",color:"secondary.foreground",_hover:{bga:"secondary/90"}},ghost:{_hover:{bg:"accent",color:"accent.foreground"}},link:{color:"primary",textUnderlineOffset:"4px",_hover:{textDecoration:"underline"}}},size:{default:{h:"10",px:"4",py:"2"},sm:{h:"9",rounded:"md",px:"3"},lg:{h:"11",rounded:"md",px:"8"},icon:{h:"10",w:"10"}}},defaultVariants:{variant:"default",size:"default"}}),c=q.forwardRef(({asChild:e,className:a,...i},n)=>{const E=e?z:"button",[R,S]=l.splitVariantProps(i),V=l.raw(R);return P.jsx(E,{role:"button",ref:n,className:H(N(V),a),...S})});c.displayName="Button";try{c.displayName="Button",c.__docgenInfo={description:"",displayName:"Button",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"default"'},{value:'"outline"'},{value:'"secondary"'},{value:'"destructive"'},{value:'"ghost"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"sm"'},{value:'"lg"'},{value:'"icon"'}]}}}}}catch{}const U={title:"Button",tags:["autodocs"],component:c},t={args:{children:"click",onClick:x()},play:async({args:e,canvasElement:a})=>{const n=C(a).getByRole("button");await w.click(n),await B(e.onClick).toHaveBeenCalled()}},r={args:{children:"click",variant:"secondary"}},o={args:{children:"click",variant:"outline"}},s={args:{disabled:!0,children:"disabled",onClick:x()},play:async({args:e,canvasElement:a})=>{const n=C(a).getByRole("button");await w.click(n),await B(e.onClick).not.toHaveBeenCalled()}};var d,u,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: "click",
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  }
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,v,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: "click",
    variant: "secondary"
  }
}`,...(g=(v=r.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var y,f,b;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: "click",
    variant: "outline"
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,k,_;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "disabled",
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...(_=(k=s.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};const A=["Primary","Secondary","Ghost","Disabled"];export{s as Disabled,o as Ghost,t as Primary,r as Secondary,A as __namedExportsOrder,U as default};
