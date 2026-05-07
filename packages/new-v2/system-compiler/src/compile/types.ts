export interface CompileFile {
  path: string
  contentType: "text/css"
  content: string
}

export interface CompileResult {
  files: CompileFile[]
}
