export interface CategoryNav {
  name: string;
  href: string;
}

export interface INavConfig {
  name: string;
  dropdown?: boolean;
  href?: string;
  items?: CategoryNav[];
}