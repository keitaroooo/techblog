---
title: 'Vercelでサブドメインを設定'
date: '2021-03-14'
---

# 概要

Vercelの[公式サイト](https://vercel.com/docs/custom-domains)通りに設定したもののうまくいかず，苦労したので備忘録として残します．

今回設定したサブドメインは[techblog.keitaroooo.com](https://techblog.keitaroooo.com)です．

# DNS設定

DNSサーバーはIPアドレスとドメイン名を結びつけるもので，以下に示すDNSレコードを設定する必要があります．

- Aレコード
  - IPv4でホスト名とIPアドレスの関連付けを定義するレコード
- AAAレコード
  - IPv6でホスト名とIPアドレスの関連付けを定義するレコード
- CNAMEレコード
  - 正規ホスト名に対する別名を定義するレコード
  - 特定のホスト名を別のドメイン名に転送する時などに利用
  - ドメイン名が`keitaroooo.com`であるとき，ホスト名：`techblog`，VALUE：`cname.vercel-dns.com`と入力し，`techblog.keitaroooo.com`にアクセスすると`cname.vercel-dns.com`に転送される

# 独自ドメイン設定方法

Vercelに独自ドメインを設定する方法は以下のように分けられます.

- 独自ドメインを取得したサービス（例えばお名前ドットコム）のDNSサーバーを使用する
  - Apexドメイン（サブドメインを含まない，ドメインの最も短い表記）の場合はAレコードを設定
  - サブドメインの場合はCNAMEレコードを設定
- VercelのDNSサーバーを使用する
  - 独自ドメインを取得したサービスのネームサーバーにVercelのDNSサーバーを指定

    ```
    ns1.vercel-dns.com
    ns2.vercel-dns.com
    ```
  - Apexドメインの場合はVercelのDNSサーバーでAレコードを設定する
  - サブドメインの場合はVercelのDNSサーバーでCNAMEレコードを設定する

あまり覚えていないのですが，1つ目の方法ではうまくいかなかった（恐らく理解不足でうまく設定できなかった）ので，2つ目の方法を採用しました．

その結果は，設定したドメインにアクセスしてもお名前ドットコムのページが出てくる状態でうまくいきませんでした．

原因として，以下が思いつきました．
- VercelのDNSサーバーに接続できていない
- 反映に時間がかかっている
- VercelのDNSサーバーの設定が不十分

1つ目の原因に関してはお名前ドットコム側のネームサーバーの設定も問題なく，Vercel側でもValid Configurationとなっていたため，大丈夫そうでした．

2つ目の原因に関しては1日ほど放置しても状況が変わらなかったため，除外しました．

以上から3つ目が原因だと考えられ，設定するドメインとしてサブドメインを設定していたのを，Apexドメインで設定し直してみました．すると，そのドメインでサイトが表示されました．
その後，再度サブドメインを設定すると，うまくいきました．

# 結論

以上より，VercelのDNSサーバーを用いてサブドメインを設定する場合は，DNSサーバーを使用するために，サブドメインの前にApexドメインを登録する必要があるっぽいです．

それか偶然，同じタイミングで変更が反映されただけで時間が解決しれくれるかもしれません．

正直VercelやDNSサーバーに関してまだまだ理解不足なので，もう少し調べたいです．

# 参考

[お名前ドットコム](https://help.onamae.com/answer/7883)