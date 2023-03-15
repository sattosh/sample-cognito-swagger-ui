# Sample Swagger UI with AWS Cognito

# Overview

Swagger UIにAWS Cognitoで認証(Password)をかけたサンプルReact App

構成としてはAWSのリソースはAWS CDKを使用し定義。フロントエンドはReact。


# Usage

パッケージをインストール

```sh
yarn
```

AWS環境をデプロイ

```sh
yarn workspace cdk run deploy
```

AWSのマネージドコンソールにログインし、AWS Cognitoのサービスを選択肢、作成されたUserPoolにアカウントを作成

frontend/.envにAWS Cognitoの情報を記載

ローカルサーバで確認する場合は以下のコマンドを実行

```sh
yarn workspace frontend run start
```


