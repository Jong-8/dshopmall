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
    fontSize?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>;
    theme?: string;
    name?: string;
    onClick?(e: MouseEvent<HTMLButtonElement>): void;
  }

  interface InputProps {
    title: string;
    name: string;
    type: InputHTMLAttributes<HTMLInputElement>;
    value: string | number;
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
    readonly?: boolean;
    required?: boolean;
    placeholder?: string;
    text?: string;
  }

  interface VerificationProps {
    name: string;
    phone: string;
    onVeriChange(userName: string, phone: string, imp_uid: string): void;
  }

  interface QtyBoxProps {
    qty: number;
    name?: string | undefined;
    onQtyChange(e: ChangeEvent<HTMLInputElement>): void;
    onMinusClick(e): void;
    onPlusClick(e): void;
  }

  interface PolicyLayoutProps {
    title: string;
    children: React.ReactNode;
  }

  interface ProductQtyBoxProps {
    item: ShopItemDetailType | undefined;
    option: {
      optionDetailCounter: number;
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
      counter: number;
      itemCounter: number;
      title: string;
      price: number;
      thumbnailUrl: string;
      selectOption: SelectOptionType;
      qty: number;
      seller?: string;
    }[];
  }

  interface PaymentProps {
    id: string;
    label: string;
    defaultChecked: boolean;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
  }

  interface AddrRadioProps {
    id: string;
    label: string;
    defaultChecked: boolean;
  }

  interface Window {
    IMP?: any;
  }

  /* API 타입 */
  type ShopLoginRequest = {
    username: string;
    password: string;
  };

  type ShopCheckUserRequest = {
    username: string;
  };

  type ShopCheckCodeRequest = {
    code: string;
  };

  type ShopSignupRequest = {
    username: string;
    password: string;
    email?: string;
    code?: string;
    marketing: boolean;
    imp_uid: string;
  };

  type ShopUserModifyRequest = {
    password?: string;
    email?: string;
    code?: string;
    marketing?: boolean;
    deliveryInfo?: DeliveryInfoType;
  };

  type ShopCertiRequest = {
    imp_uid: string;
  };

  type ShopForgotRequest = {
    imp_uid: string;
    username: string;
    name: string;
    phone: string;
  };

  type ShopSearchRequest = {
    search: string | string[] | undefined;
  };

  type ShopCartAddRequest = {
    itemCounter: number;
    optionCounter: number;
    optionDetailCounter: number;
    qty: number;
    seller?: string;
  };

  type ShopCartChangeRequest = {
    counter: number;
    qty: number;
  };

  type ShopCartRemoveRequest = {
    counter: number;
  };

  type ShopOrderDetailRequest = {
    merchant_uid: string;
  };

  type ShopOrderDeliveryRequest = {
    deliveryInfo: DeliveryInfoType;
    merchant_uid: string;
  };

  type ShopOrderGuestRequest = {
    name: string;
    merchant_uid: string;
    phone: string;
  };

  type ShopOrderDeliveryGuestRequest = {
    name: string;
    merchant_uid: string;
    phone: string;
    deliveryInfo: DeliveryInfoType;
  };

  type ShopPayPrepareRequest = {
    items: ShopPayItemType[];
    guest_name?: string;
    guest_phone?: string;
    deliveryInfo: DeliveryInfoType;
    point: number;
    refund_holder?: string;
    refund_bank?: string;
    refund_account?: string;
    refund_tel?: string;
  };

  type ShopPayCompleteRequest = {
    imp_uid: string;
    merchant_uid: string;
  };

  type ShopPayCancelRequest = {
    merchant_uid: string;
    guest_name?: string;
    guest_phone?: string;
    reason: string;
  };

  type ShopInfoResponse = {
    company: string;
    ceo: string;
    manager: string;
    companyNumber: string;
    email: string;
    address: string;
    businessNumber: string;
    tel: string;
    operatingTime: string;
    lunchTime: string;
    policy: string;
    privacy: string;
    cancel: string;
    delivery: string;
    returnInfo: string;
  };

  type ShopPortOneCertiResponse = {
    birth: number;
    birthday: string;
    carrier: string;
    certified: string;
    certified_at: number;
    foreigner: string;
    foreigner_v2: string;
    gender: string;
    imp_uid: string;
    merchant_uid: string;
    name: string;
    origin: string;
    pg_provider: string;
    pg_tid: string;
    phone: string;
    unique_in_site: string;
    unique_key: string;
  };

  type ShopOrderDetailResponse = {
    items: ShopOrderDetailItemType[];
    orderInfo: ShopOrderInfoType;
    paymentInfo: ShopPaymentInfoType;
    deliveryInfo: DeliveryInfoType;
  };

  type ShopLoginResponse = {
    token: string;
    user: ShopUserType;
  };

  type ShopCheckUserResponse = {
    status: boolean;
  };

  type ShopCheckCodeResponse = {
    username?: string;
  };

  type ShopSecessionResponse = {
    username?: string;
  };

  type ShopForgotResponse = {
    password: string;
  };

  type ShopMainItemResponse = {
    item: ShopItemType[];
    live: ShopLiveItemType[];
    category: ShopItemCategoryType[];
  };

  type ShopItemDetailResponse = {
    item: ShopItemDetailType;
    selectOptions?: ShopItemSelectOptionType;
  };

  type ShopCartResponse = {
    cartItems: ShopCartType[];
  };

  type ShopOrderResponse = {
    orderItems: ShopOrderType[];
  };

  type ShopPayPrepareResponse = {
    merchant_uid: string;
    name: string;
    amount: number;
    point: number;
    buyer_tel: string;
    buyer_name: string;
    buyer_email?: string;
    buyer_addr: string;
    buyer_postcode: string;
  };

  type ShopItemType = {
    counter: number;
    title: string;
    regularPrice: number;
    price: number;
    category: string;
    thumbnailUrl: string;
    isAvailable: boolean;
  };

  type ShopLiveItemType = {
    counter: number;
    thumb: string;
    title: string;
    video: string;
    itemCounter: number;
    itemName: string;
    itemThumb: string;
    itemPrice: number;
    itemSale: string;
    views: number;
    isAvailable: boolean;
  };

  type ShopItemDetailType = {
    counter: number;
    title: string;
    regularPrice: number;
    price: number;
    category: string;
    thumbnailUrl: string;
    stock: number;
    isSelectOption: boolean;
    images: string[];
    description: string;
  };

  type ShopItemCategoryType = {
    name: string;
    counter: number;
  };

  type ShopItemSelectOptionType = {
    optionCounter: number;
    title: string;
    options: ShopItemSelectOptDetailType[];
  };

  type ShopItemSelectOptDetailType = {
    optionDetailCounter: number;
    title: string;
    price: number;
    stock: number;
  };

  type SelectOptionType = {
    optionCounter: number;
    optionDetailCounter: number;
    optionTitle: string;
    optionDetailTitle: string;
    optionPrice: number;
  };

  type ShopCartType = {
    counter: number;
    itemCounter: number;
    title: string;
    price: number;
    thumbnailUrl: string;
    selectOption: SelectOptionType;
    qty: number;
    seller?: string;
  };

  interface ShopCartType {
    cartItems: [
      {
        counter: number;
        itemCounter: number;
        title: string;
        price: number;
        thumbnailUrl: string;
        selectOption: SelectOptionType;
        qty: number;
        seller?: string;
      }
    ];
  }

  type DeliveryInfoType = {
    name: string;
    zipcode: string;
    address: string;
    detailed: string;
    phone: string;
    requests: string;
  };

  type ShopUserType = {
    username: string;
    role: string;
    name: string;
    phone: string;
    email: string;
    mycode: string;
    code: string;
    profile: string;
    marketing: boolean;
    point: number;
    deliveryInfo: DeliveryInfoType;
  };

  type ShopOrderType = {
    merchant_uid: string;
    date: number;
    name: string;
    price: number;
    point: number;
    state: string;
  };

  type ShopOrderDetailItemType = {
    counter: number;
    name: string;
    thumbnailUrl: string;
    option: string;
    qty: number;
    price: number;
  };

  type ShopOrderInfoType = {
    merchant_uid: string;
    date: number;
    state: string;
    deliveryState: string;
    deliveryLink: string;
  };

  type ShopPaymentInfoType = {
    price: number;
    deliveryCost: number;
    paymentPrice: number;
    point: number;
    payment: string;
    vbank_bank?: string;
    vbank_account?: string;
    vbank_holder?: string;
    vbank_tel?: string;
    refund_bank?: string;
    refund_account?: string;
    refund_holder?: string;
    refund_tel?: string;
  };

  type ShopPayItemType = {
    counter?: number;
    itemCounter: number;
    optionCounter: number;
    optionDetailCounter: number;
    qty: number;
    seller?: string;
  };
}
