Coupon Redemption System
This project is a solution for a coupon redemption system designed to integrate into an existing checkout cart for an eCommerce platform. The system allows users to apply coupon codes for discounts during checkout, tracks their usage, and assigns gift cards (as coupon codes) after purchases.

Technologies Used
Framework: Next.js for building the API and frontend.
Database: PostgreSQL for storing coupon and user data.
ORM: TypeORM for database interactions and object-relational mapping.
Architecture: Domain-Driven Design (DDD) for a scalable and maintainable backend structure.
Features
Coupon Redemption:
Users can apply coupon codes to receive a discount during checkout. Once a coupon is redeemed, it is marked as used and cannot be reused.

Gift Card Assignment:
After a successful purchase, the system generates or assigns a new coupon (gift card) for the user.

Coupon Validation:
The system validates coupon codes based on availability, and specific business rules.

User and Coupon Management:
Each user can hold a maximum number of coupons. This is configurable at the user level.

Concurrency Handling:
The system ensures that multiple users cannot redeem the same coupon code at the same time.

Scalability:
Designed to handle high volumes of concurrent transactions by isolating domain logic and maintaining efficient database queries through TypeORM.

Solution Design
Backend (API)
The API follows a Domain-Driven Design (DDD) approach. This architecture helps decouple the business logic into distinct layers, which makes the system more modular, maintainable, and scalable.

Domain Layer:
Handles the core business logic related to coupon redemption, assignment, and validation.

Application Layer:
Manages the interactions between the domain and infrastructure, ensuring a clean separation of concerns.

Infrastructure Layer:
Integrates the domain with the database (PostgreSQL) using TypeORM. It is also responsible for handling database migrations and data persistence.

Frontend (Mock Checkout Page)
For simplicity, the frontend consists of a minimal checkout interface where users can:

Input a coupon code.
Complete the checkout process.
See the assigned gift card (new coupon) after a successful purchase.
Database
The database is powered by PostgreSQL and stores information about:

Users: Basic user data and the coupons assigned to them.
Coupons: Coupon code, discount percentage, usage status.

API Endpoints
PATCH /api/coupon/:idCoupon - Redeems a coupon by code.
POST /api/coupon/user/:idUser - Assigns a gift card (coupon) to a user after a purchase.
POST /api/user - Create a new user.
GET /api/coupon/user/:idUser: - Get all coupons by user.

Key Design Decisions
Random Gift Card Generation:
The system generates random gift card codes upon successful purchase.

Concurrency & Transactions:
To prevent race conditions and ensure data integrity, the system uses database-level transactions when redeeming and assigning coupons.

Coupon Limits:
The system enforces a maximum number of coupons per user and coupon book, ensuring scalability even under heavy usage.
