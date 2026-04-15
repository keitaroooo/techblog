provider "vercel" {
  api_token = var.vercel_api_token

  # team = var.team
  # team は空文字を渡すより、使う時だけ有効化する運用が安全
}

resource "vercel_project" "techblog" {
  name           = var.project_name
  framework      = "nextjs"
  root_directory = "node/app"
  node_version   = "22.x"

  git_repository = {
    type = "github"
    repo = "keitaroooo/techblog"
  }
}

resource "vercel_project_domain" "techblog" {
  project_id = vercel_project.techblog.id
  domain     = var.domain
}
