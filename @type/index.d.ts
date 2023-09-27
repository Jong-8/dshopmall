import { Dispatch, SetStateAction } from "react";

declare global {
  interface AppLayoutProps {
    children: React.ReactNode;
  }

  /* components */
  interface HeaderProps {
    title?: string;
    description?: string;
  }

  interface ContentTitleProps {
    title?: string;
  }

  interface SubLayoutProps {
    children: React.ReactNode;
    title?: string;
  }

  interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
    rounded?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>;
    theme?: string;
    name?: string;
  }

  interface InputProps {
    title: string;
    name: string;
    type: InputHTMLAttributes<HTMLInputElement>;
    value: string | number;
    onChange(e: { target: { name: string; value: string | number } }): void;
    readonly?: boolean;
    placeholder?: string;
  }

  interface VerificationProps {
    name: string;
    phone: string;
    onChange(e: { target: { name: string; value: string | number } }): void;
  }

  interface QtyBoxProps {
    qty: number;
    name?: string | undefined;
    onQtyChange(e: { target: { value: string; name: string } }): void;
    onMinusClick(e): void;
    onPlusClick(e): void;
  }

  interface PolicyLayoutProps {
    title: string;
    children: React.ReactNode;
  }

  interface ProductQtyBoxProps {
    item: {
      optionId: number;
      name?: string | undefined;
      qty: number | 1;
      price?: number | undefined;
      stock?: number | undefined;
    };
    qty: number;
    onQtyChange(e): void;
    onMinusClick(e): void;
    onPlusClick(e): void;
    onDeleteClick(): void;
  }

  interface LiveBoxProps {
    info: {
      id: number;
      thumb: string;
      title: string;
      itemId: number;
      itemName: string;
      itemThumb: string;
      itemPrice: number;
      itemSale: string;
      views: number;
    };
    onVideoClick: (id: number) => void;
  }

  interface LivePopupProps {
    id: number;
    onPopupBgClick: () => void;
  }

  interface CartItemsProps {
    cartItems: {
      id: number;
      title: string;
      price: number;
      thumbnailUrl: string;
      selectOption: {
        selectOptionTitle: string;
        selectOptionName: string;
        selectOptionAddPrice: number;
      };
      qty: number;
      stock: number;
    }[];
  }
}
