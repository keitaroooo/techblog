---
title: '複数のホスティングサービスでサブドメインを設定'
date: '2021-08-17'
---

# 概要

[前回の記事](https://techblog.keitaroooo.com/posts/vercel-custom-sub-domain)ではVercelにホスティングした技術ブログのドメインとして[keitaroooo.com](keitaroooo.com)のサブドメインである[techblog.keitaroooo.com](https:techblog.keitaroooo.com)を設定しましたが，今回，新しく雑記ブログを開設したので，Netlifyでホスティングして[keitaroooo.com](keitaroooo.com)のサブドメインとして[blog.keitaroooo.com](https://blog.keitaroooo.com)を設定してみました．

# 方法

今回行いたいことは次の通りです．

VercelとNetlifyという異なるホスティングサービスを用いて公開されている2つのサイトそれぞれにサブドメインを設定したい．

そして，それを達成する方法として以下を考えました．

- お名前ドットコムのDNSサーバーを用いる
- CloudflareのDNSサーバーを用いる
- VercelのDNSサーバーを用いる


結論から述べると上の2つの方法ではうまくいかず1番下の方法を採用しました．また，作業前の環境としては[前回の記事](https://techblog.keitaroooo.com/posts/vercel-custom-sub-domain)の通りに設定した状態です．

## お名前ドットコムのDNSサーバーを用いる

「ネームサーバーの設定」から「ドメインのDNS設定」に入り，「DNSレコード設定を利用する」からVercelとNetlifyで指定された通りにCNAMEレコードを設定しました．

その結果，Vercelの方はうまくいったのですが，Netlifyの方はVercelの404画面が表示されました．

CNAMEレコードの設定しかしていないため，[blog.keitaroooo.com](https://blog.keitaroooo.com)にアクセスしたときにVercelの画面が表示されるのは不可解ではあったのですが，この方法は諦めて，次の方法を試すことにしました．

ただ，後で，VercelのDNSサーバーが無理やり使用されていることが原因かもしれないと気づき，もう少し考えて原因を突き止めるべきでした．

## CloudflareのDNSサーバーを用いる

Cloudflareに登録して，[keitaroooo.com](keitaroooo.com)を登録し，指定されたネームサーバーをお名前ドットコムのネームサーバーに設定しました．そしてCloudflareのDNSレコード設定でVercelとNetlifyで指定されたCNAMEレコードを追加しました．

その結果，この方法でも，Vercelの方は表示され，Netlifyの方はVercelの404画面が表示されました．

そこで，VercelのDNSサーバーが無理やり使用されていることが原因と考え，Vercelで設定しているドメインを削除し，再びされぞれのドメインにアクセスすると，Vercelの方はアクセスできず，Netlifyの方はうまく表示されました．従って，Vercelでサブドメインを設定したときに，VercelのDNS設定が優先的に使用されてしまうことが原因というふうに考えました．また，お名前ドットコムのネームサーバーをどのように設定してもVercelのDNSサーバーには影響を与えなかったので，VercelのDNSサーバーは独立しているっぽいです．それか変更がうまく反映されていなかったのかもしれないです．

解決方法として，VercelのDNSサーバーは使用せず，技術ブログとサブドメインを紐づけるだけにすることが考えられるのですが，サブドメインを紐づけると，自動的にVercelのDNSサーバーが使用され，DNSレコードもデフォルトでいくつか追加されてしまうみたいで，無理でした．アカウントを削除したり，色々試したのですが方法は分かりませんでした．もしかしたら時間が解決してくれるかもしれません．

原因解明に少しは近づいたかもしれないですが，どうしてもうまくいかなかったので，3つ目のVercelのDNSサーバーを使用する方法を試しました．

## VercelのDNSサーバーを用いる

[前回の記事](https://techblog.keitaroooo.com/posts/vercel-custom-sub-domain)と同じ状態にした上で，VercelのDNSレコード設定で，Netlifyで指定されたCNAMEレコードを追加しました．

その結果，VercelとNetlify共にうまく表示されました．

# 結論
複数のホスティングサービスでサブドメインを設定する際，Vercelを用いている場合は，VercelのDNSサーバーを用いる方法がおすすめです．

正直，VercelもDNSサーバーもまだまだ理解できていないので，今後修正を加える必要がありそうです．
