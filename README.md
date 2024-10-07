This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, modify data-source.ts and put your own variables for you own database
you will modify:

```bash
username,
password,
database,
host
```

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Endpoints services:

- **Description**: Redeems a coupon by code
- **URL**: `/coupon/:idCoupon`
- **Method**: `PATCH`
- **URL Params**:

  - `idCoupon` - The ID of the coupon to be redeemed.

- **Description**: Assigns a gift card (coupon) to a user after a purchase.
- **URL**: `/api/coupon/user/:idUser`
- **Method**: `POST`
- **URL Params**:

  - `idUser` - The ID of the user.

- **Description**: Create a new user.
- **URL**: `/api/user`
- **Method**: `POST`
- **URL Params**:

  - `idCoupon` - The ID of the coupon to be redeemed.

- **Description**: Get all coupons by user.
- **URL**: `/api/coupon/user/:idUser`
- **Method**: `GET`
- **URL Params**:
  - `idUser` - The ID of the user.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
