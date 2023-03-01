export type addressType = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
};

export type contactType = {
    id: number;
    name: string;
    email: string;
    address: addressType;
};

export type postType = {
    _id?: number;
    title: string;
    text: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type socialsType = {
    id: number;
    icon: string;
    path: string;
};
