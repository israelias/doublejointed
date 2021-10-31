interface Page {
  // site-wide id
  id: string;
  // the page's path
  path: string;
  titleId?: string;
  pageName?: string;
  // the page's children pages
  children?: Array<Page>;
  // the page's blocks
  blocks?: Array<Block>;
  // a template from which to inherit its properties (not used)
  pageTemplate?: string;
  defaultVariables?: Array<string>;
  //  whether to show the page title or not
  showTitle?: boolean;
  // page variables (compiled during sitemap generation)
  variables?: Array<string>;
  // for error pages not to be included in map
  is_hidden?: boolean;
  // index of page in array of pages auto gen GraphQL
  pageIndex?: number;
  // defaults to "default"
  defaultBlockType?: string
  // next page in map
  next?: PagePreview
  previous?: PagePreview
  i18nNamespace?: string;
  host?: string;
  currentPath?: string
  basePath?: string
  block?: Block
}

interface PagePreview { 
  id: string;
  path: string;
  showTitle?: boolean
  titleId?: string;
  pageIndex: number
  defaultBlockType: string;
}