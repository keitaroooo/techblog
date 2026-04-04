# techblog
技術ブログ

## Links

- Repo: https://github.com/keitaroooo/techblog
- URL: https://techblog.keitaroooo.com

## Structure

- App: `node/app/`（Next.js）

## 技術スタック
- React
- Next.js
- TypeScript
- remark(react-markdown)
- MDX(about page)
- Vercel

## Local Preview

```sh
cd node/app
npm install
npm run dev
```

## Deploy

### Vercel

- Vercel に GitHub リポジトリを接続してデプロイ
- プロジェクトの Root Directory は `node/app` を指定
- `main` への push で自動デプロイ

### Cloudflare（DNS / Proxy）

- `techblog.keitaroooo.com` の DNS レコードは、[**keitaro-yamaguchi**](https://github.com/keitaroooo/keitaro-yamaguchi) リポジトリで一元管理しています。

## Infrastructure (IaC)

Vercel プロジェクトとカスタムドメインの設定を Terraform で管理します。

### Vercel Project Management

1.  **Bitwarden Token Loading**:
    `keitaro-yamaguchi/infra/作業ログ.md` を参照し、`load_vercel_tokens` 関数を使って Vercel API トークンを環境変数にロードします。
    ```fish
    # keitaro-yamaguchi の作業ログに従い、Bitwarden からトークンをロード
    # 例:
    # bw unlock --raw # 必要に応じて実行
    # export BW_SESSION=$(bw unlock --raw)
    # export TF_VAR_vercel_api_token=$(bw get password "Vercel API Token")
    # load_vercel_tokens # fish shell の場合
    ```
2.  **Terraform Setup**:
    `techblog` リポジトリの `infra/terraform/vercel/` ディレクトリに移動し、Terraform を初期化します。
    ```bash
    cd infra/terraform/vercel
    terraform init
    ```
3.  **Plan & Apply**:
    Vercel プロジェクトとドメインの設定内容を確認し、適用します。
    ```bash
    terraform plan
    terraform apply
    ```

- **Vercel Project Configuration**: `techblog/infra/terraform/vercel/main.tf` で Vercel プロジェクトとドメインを設定します。
- **DNS Configuration**: `techblog.keitaroooo.com` の DNS 設定は、`keitaro-yamaguchi` リポジトリの [`infra/terraform/cloudflare/main.tf`](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/infra/terraform/cloudflare/main.tf) で管理されています。

