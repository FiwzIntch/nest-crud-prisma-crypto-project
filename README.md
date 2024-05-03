<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <h2 align="center">Nest CRUD Prisma Crypto Project</h2>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
This project is a playground project utilizing Nest.js, Prisma, and PostgreSQL. It serves as a simple CRUD (Create, Read, Update, Delete) application with additional features related to cryptography.

## ER Diagram
please click [`ER Diagram`](https://github.com/FiwzIntch/crypto-crud-project/blob/main/prisma/ERD.md)

## Swagger API Document And Testing Tool

```bash
# endpoint
$ http://localhost:3000/api
```

### Install PostgreSQL By Docker-compose
```bash
# Run cmd
$ docker-compose up -d

# Create .env By Copy .env.example
```


## Installation

```bash
$ yarn install
```


## Generate DB

```bash
$ yarn db:deploy
```

## Seed DB

```bash
$ yarn db:seed
```

## Running the app

```bash
$ yarn run start
```

## ระบบสามารถตั้ง ซื้อ

```bash
# endpoint
$ http://localhost:3000/purchase (POST)
```


## ระบบสามารถตั้ง ขาย

```bash
# endpoint
$ http://localhost:3000/order (POST)
```

## ระบบบันทึกการโอนเงินและซื้อ-ขาย

```bash
# ต้องกด endpoint trade ก่อน ถึงจะขึ้นบันทึกการซื้อ-ขาย
$ http://localhost:3000/trade (POST)

# endpoint บันทึกการซื้อ-ขาย
$ http://localhost:3000/transaction (GET)
```


## ระบบบันทึกการแลกเปลี่ยน

```bash
# สามารถเรียก endpoint นี้และ ใส่ข้อมูลเพื่อเทส
$ http://localhost:3000/transfer (POST)
```

## Tools Used

- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, designed to make database access easy and intuitive while providing type safety and auto-completion.
- **PostgreSQL**: A powerful, open-source relational database system known for its reliability, robustness, and performance.


## Contributors

- User: [Thapanee Intachot](https://github.com/FiwzIntch)
