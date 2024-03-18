## Description

Crypto CRUD Project

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