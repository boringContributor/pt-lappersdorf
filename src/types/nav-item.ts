export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    external?: boolean;
    href?: string;
}
